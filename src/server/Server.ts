import Newsie, {Options as NewsieOptions} from 'newsie';
import {Group, GroupInterface} from "../group/Group";

export interface ServerInterface {
    readonly url: URL;
     groups(): Promise<GroupInterface[]>;
}

export class Server implements ServerInterface {
    public readonly url: URL;
    private readonly newsieClient: Newsie;

    constructor(url: URL) {
        Server.isValidNewsUrl(url);
        this.url = url;
        this.newsieClient = Server.initNewsieClient(this.url);
    }

    // todo: does this work with tls?
    private static initNewsieClient(url: URL): Newsie {
        const newsieOptions: NewsieOptions = {
            host: url.host
        };
        const port = parseInt(url.port);
        if (!isNaN(port)) {
            newsieOptions.port = port;
        }
        return new Newsie(newsieOptions);
    }

    // see: https://tools.ietf.org/html/rfc5538
    public static isValidNewsUrl(url: URL): boolean {
        if (url.protocol !== 'news:' && url.protocol !== 'nntp:') {
            throw RangeError('URL needs to be of protocol news:// or nntp://.');
        }
        return true;
    }

    public async groups(): Promise<Group[]> {
        const connection = await this.newsieClient.connect();
        if (connection.code !== 200) {
            throw Error('No connection to server.');
        }
        const capabilities = await this.newsieClient.capabilities();
        if (!('NEWSGROUPS' in capabilities.capabilities.LIST)) {
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
