import Newsie, {Options as NewsieOptions, Command} from 'newsie';
import {Group, GroupInterface} from "../group/Group";

interface ResponseHandler {
    callback: Function
    resolve: Function
    reject: Function
}

class WsConnection {
    private _socket: WebSocket;
    private _host: string;
    private _port: number;
    private _queue: ResponseHandler[];

    // todo: type tlsOptions: TlsOptions
    constructor(host: string, port: number, tlsPort: boolean, tlsOptions: any) {
        this._socket = new WebSocket('ws://localhost:8080'); // todo: not sure about this..
        this._host = host;
        this._port = port;
        this._queue = [];
    }

    // todo: connect to websocket and then connect to tpc "socket"..
    // todo: rewrite tls support to wss?
    public connect = async (): Promise<WebSocket> => {
        //this._socket = new WebSocket('ws://localhost');
        return new Promise((resolve) => {
            this._socket.addEventListener('open', () => {
                this.write(`NNTPCONNECT ${this._host} ${this._port}`);
                // this._port, this._host
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
        /*if (this._compress) {
            str = zlib.deflateSync(str).toString('base64')
        }*/
        this._socket.send(str);
    };

    public addCallback = (callback: Function, resolve: Function, reject: Function) => {
        this._queue.push({ callback, resolve, reject })
    };

    // todo: ...
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
            this._queue.forEach(h => h.reject(new Error('Connection closed')));
            //this._socket.removeEventListener()
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
        this._wsConnection = new WsConnection(host, port, tlsPort, tlsOptions)
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
    groups(): Promise<GroupInterface[]>;
}

export class Server implements ServerInterface {
    public readonly host: string;
    public readonly port: number | undefined;
    private readonly newsieClient: WsNewsie;

    constructor(host: string, port?: number) {
        this.host = host;
        if (port) {
            this.port = port;
        }
        this.newsieClient = Server.initWsNewsieClient(this.host, this.port);
    }

    // todo: does this work with tls?
    // todo: inject websocket connection socket
    private static initWsNewsieClient(host: string, port?: number | undefined): WsNewsie {
        const newsieOptions: NewsieOptions = {
            host
        };
        if (port && !isNaN(port)) {
            newsieOptions.port = port;
        }
        return new WsNewsie(newsieOptions);
    }

    public async groups(): Promise<Group[]> {
        const connection = await this.newsieClient.connect();
        if (connection.code !== 200) {
            throw Error('No connection to server.');
        }
        const capabilities = await this.newsieClient.capabilities();
        if (!capabilities.capabilities.LIST.includes('NEWSGROUPS')) {
            throw Error('Server does\'t have the required LIST NEWSGROUPS capability.');
        }
        // todo: remove 'tu-graz*' once https://gitlab.com/timrs2998/newsie/merge_requests/2 is merged
        const newsgroups = await this.newsieClient.listNewsgroups('tu-graz*');
        return newsgroups.newsgroups.map((ng) => {
            const description = typeof ng.description === 'undefined' ? '' : ng.description;
            return new Group(ng.name, description, this.newsieClient);
        });
    }
}
