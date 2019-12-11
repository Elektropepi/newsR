import Newsie from 'newsie';
import {Article} from "../article/Article";

export interface GroupInterface {
    readonly name: string;
    readonly description: string;
    threads(): Promise<Article[]>;
}

export class Group implements GroupInterface {
    public readonly name: string;
    public readonly description: string;
    private readonly newsieClient: Newsie;

    constructor(name: string, description: string, newsieClient: Newsie) {
        this.name = name;
        this.description = description;
        this.newsieClient = newsieClient;
    }

    public async threads(): Promise<Article[]> {
        return [];
    }
}
