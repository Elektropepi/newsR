import {Moment} from "moment";
import Newsie from 'newsie';
import {Author} from "../author/Author";

type ArticleId = string;

export interface ArticleInterface {
    id: ArticleId,
    subject: string,
    date: Moment,
    author: Author,
    followUps: ArticleInterface[]
    content(): Promise<string>,
}

export class Article implements ArticleInterface {
    public readonly id: ArticleId;
    public readonly subject: string;
    public readonly date: Moment;
    public readonly author: Author;
    private readonly newsieClient: Newsie;
    public references: ArticleId[] = [];
    public directReference: ArticleId = '';
    public followUps: ArticleInterface[] = [];

    constructor(id: string, subject: string, date: Moment, author: Author, newsieClient: Newsie) {
        this.id = id;
        this.subject = subject;
        this.date = date;
        this.author = author;
        this.newsieClient = newsieClient;
    }

    public setReferences(references: string) {
        if (references.length <= 0) {
            return;
        }
        this.references = references.split(' ');
        this.directReference = this.references[this.references.length - 1];
    }

    public async content(): Promise<string> {
        const article = await this.newsieClient.article(this.id);
        if (!article.article.body) {
            return '';
        }
        // todo: maybe add line break as join character
        return article.article.body.join();
    }
}