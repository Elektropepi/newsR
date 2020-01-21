import Newsie, {Command, Options as NewsieOptions} from 'newsie';
import {Group, GroupInterface} from "../group/Group";
import {TlsOptions} from "tls";

interface ResponseHandler {
  callback: Function
  resolve: Function
  reject: Function
}

class WsConnection {
  private readonly _socket: WebSocket;
  private readonly _host: string;
  private readonly _port: number;
  private _queue: ResponseHandler[];
  private onCloseCallback: any;

  // todo: type tlsOptions: TlsOptions
  constructor(host: string, port: number, tlsPort: boolean, tlsOptions: any) {
    // todo: not sure if this should be here or in .connect()
    if(!process.env.REACT_APP_WS_TO_NNTP_URL) {
      throw Error("WS_TO_NNTP_URL is not defined!");
    }
    this._socket = new WebSocket(process.env.REACT_APP_WS_TO_NNTP_URL);
    this._host = host;
    this._port = port;
    this._queue = [];
  }

  public connect = async (): Promise<WebSocket> => {
    return new Promise((resolve) => {
      this._socket.addEventListener('open', () => {
        this.write(`NNTPCONNECT ${this._host} ${this._port}`);
        this._addSocketHandlers();
        //return this._tlsPort ? this.upgradeTls() : Promise.resolve(this._socket);
        resolve(this._socket);
      });
    });
  };

  public disconnect = () => {
    // Close connection
    this._socket.close();
    //this._socket.removeAllListeners();
    //this._socket.unref();
    //if (this._tlsPromiseReject) {
    //    this._tlsPromiseReject();
    //}

    // Empty the queue
    this._queue.forEach(h => h.reject(new Error('Disconnected from server')));
    this._queue = [];
  };

  public write = (str: string): void => {
    this._socket.send(str);
  };

  public addCallback = (callback: Function, resolve: Function, reject: Function) => {
    this._queue.push({callback, resolve, reject})
  };

  public setOnCloseCallback(callback: any) {
    this.onCloseCallback = callback;
  };

  private _addSocketHandlers = (): void => {
    this._socket.onmessage = (event) => {
      const responseHandler = this._queue[0];
      let response = responseHandler.callback(event.data);
      this._queue.shift();
      responseHandler.resolve(response);
    };
    this._socket.onerror = err => {
      this._queue.forEach(h => h.reject(err));
      this.disconnect();
      throw err;
    };
    this._socket.onclose = () => {
      console.error('WS: Connection closed');
      this._queue.forEach(h => h.reject(new Error('Connection closed')));
      //this._socket.removeEventListener()
      this.onCloseCallback();
    };
  };

}

class WsNewsie extends Newsie {
  public _wsConnection: WsConnection;

  constructor(options: NewsieOptions) {
    super(options);
    const {
      host,
      port = 119,
      tlsPort = false,
      tlsOptions = {}
    } = options;
    this._wsConnection = new WsConnection(host, port, tlsPort, tlsOptions);
  }

  public setOnCloseCallback(callback: any) {
    this._wsConnection.setOnCloseCallback(callback);
  }

  public connect = async (): Promise<any> => {
    const socket = await this._wsConnection.connect();
    const response = await this.sendData(Command.GREETING);
    return {
      ...response,
      socket
    }
  };

  public disconnect = () => this._wsConnection.disconnect();

  public sendData = (command: Command, payload?: string): Promise<any> =>
    new Promise((resolve, reject) => {
      this._wsConnection.addCallback((text: string) => JSON.parse(text), resolve, reject);
      if (payload) {
        this._wsConnection.write(payload)
      }
    })
      //.then(this._interceptor)
      .then((response: any) => (response.code < 400 ? response : Promise.reject(response)))
}

export interface ServerInterface {
  readonly host: string;
  readonly port: number | undefined;

  getGroupByName(name: string): Promise<GroupInterface | null>;

  groups(): Promise<GroupInterface[]>;
}

export class Server implements ServerInterface {
  private static server: Server | null = null;
  private static keepaliveIntervalReference: NodeJS.Timeout | null = null;
  public readonly host: string;
  public readonly port: number | undefined;
  private newsieClient: WsNewsie;

  constructor(host: string, port?: number) {
    this.host = host;
    if (port) {
      this.port = port;
    }
    this.newsieClient = this.initWsNewsieClient(this.host, this.port);
  }

  public static async instance(): Promise<Server> {
    if (this.server === null) {
      const nntpUrl = process.env.REACT_APP_NNTP_URL;
      const nntpPortStr = process.env.REACT_APP_NNTP_PORT;
      if (!nntpUrl || !nntpPortStr) {
        throw new Error('Environment variable: REACT_APP_NNTP_URL or REACT_APP_NNTP_PORT not specified.');
      }
      this.server = new Server(nntpUrl, parseInt(nntpPortStr));
      await this.server.connectAndVerifyNewsieClient();
    }
    return this.server;
  }

  private initWsNewsieClient(host: string, port?: number | undefined): WsNewsie {
    const newsieOptions: NewsieOptions = {
      host
    };
    if (port && !isNaN(port)) {
      newsieOptions.port = port;
    }
    this.newsieClient = new WsNewsie(newsieOptions);
    this.newsieClient.setOnCloseCallback(() => {
      console.log('WS: Reconnect!');
      this.initWsNewsieClient(host, port);
      this.connectAndVerifyNewsieClient();
    });
    return this.newsieClient;
  }

  private async connectAndVerifyNewsieClient(): Promise<WebSocket> {
    const connection = await this.newsieClient.connect();
    if (connection.code !== 200) {
      throw Error('No connection to server.');
    }
    const capabilities = await this.newsieClient.capabilities();
    if (!capabilities.capabilities.LIST.includes('NEWSGROUPS')) {
      throw Error('Server does\'t have the required LIST NEWSGROUPS capability.');
    }
    return connection.socket;
  }

  public async getGroupByName(name: string): Promise<Group | null> {
    const newsgroups = await this.newsieClient.listNewsgroups(name);
    if (newsgroups.newsgroups.length !== 1) {
      return null;
    }
    return newsgroups.newsgroups.map((ng) => {
      const description = typeof ng.description === 'undefined' ? '' : ng.description;
      return new Group(ng.name, description, this.host, this.newsieClient);
    })[0];
  }

  public async groups(): Promise<Group[]> {
    // todo: remove 'tu-graz*' once https://gitlab.com/timrs2998/newsie/merge_requests/2 is merged
    const newsgroups = await this.newsieClient.listNewsgroups(process.env.REACT_APP_NNTP_GROUP_PREFIX);
    return newsgroups.newsgroups.map((ng) => {
      const description = typeof ng.description === 'undefined' ? '' : ng.description;
      return new Group(ng.name, description, this.host, this.newsieClient);
    });
  }
}
