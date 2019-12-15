import Newsie from 'newsie';
import moment from "moment";
import {Author} from "../author/Author";
import {Article, ArticleInterface} from "../article/Article";

export interface GroupInterface {
    readonly name: string;
    readonly description: string;
    threads(): Promise<ArticleInterface[]>;
}

interface ArticleMap {
    [key: string]: Article;
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
        const group = (await this.newsieClient.group(this.name)).group;
        if (group.number === 0) {
            return [];
        }
        // todo: fix type
        const overview: any = await this.newsieClient.over(`${group.low}-${group.high}`);
        const articlesByNumber: Article[] = overview.articles
          .sort((a: any, b: any) => a.articleNumber - b.articleNumber)
          .map((a: any) => {
              const date = moment(a.headers.DATE);
              const author = Author.authorFromString(a.headers.FROM);
              const article = new Article(a.headers['MESSAGE-ID'], a.headers.SUBJECT, date, author, this.newsieClient);
              article.setReferences(a.headers.REFERENCES);
              return article;
          });
        const articleIdMap: ArticleMap = {};
        const threads: Article[] = [];
        articlesByNumber.forEach((article) => {
            articleIdMap[article.id] = article;
            if (article.references.length === 0) {
                threads.push(article);
            } else {
                if (articleIdMap[article.directReference]) {
                    articleIdMap[article.directReference].followUps.push(article);
                }
            }
        });
        return threads;
    }
}
