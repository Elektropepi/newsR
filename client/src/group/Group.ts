import Newsie from 'newsie';
import {Article as NewsieArticle} from "newsie";
import {Author} from "../author/Author";
import {Article, ArticleInterface} from "../article/Article";
import {GroupCache} from "./GroupCache";
import packageJson from '../../package.json';

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
  public readonly host: string;
  private readonly newsieClient: Newsie;

  constructor(name: string, description: string, host: string, newsieClient: Newsie) {
    this.name = name;
    this.description = description;
    this.newsieClient = newsieClient;
    this.host = host;
  }

  public async article(articleNumber: number): Promise<Article|null> {
    // todo: fix type
    const overview: any = await this.newsieClient.over(`${articleNumber}-${articleNumber}`);
    const groupCache = await GroupCache.instance();
    await groupCache.persistOverArticles(this.host, this.name, overview.articles);
    const a: NewsieArticle = overview.articles[0];
    return Article.ArticleFromNewsieArticle(a, this, this.newsieClient);
  }

  public async threads(): Promise<Article[]> {
    const group = (await this.newsieClient.group(this.name)).group;
    if (group.number === 0) {
      return [];
    }
    // todo: fix type
    const overview: any = await this.newsieClient.over(`${group.low}-${group.high}`);
    const groupCache = await GroupCache.instance();
    await groupCache.persistOverArticles(this.host, this.name, overview.articles);
    const articles = await groupCache.retrieveOverArticles(this.host, this.name);
    const articlesByNumber: any[] = articles
      .sort((a: any, b: any) => a.articleNumber - b.articleNumber)
      .map((a: any) => {
        return Article.ArticleFromNewsieArticle(a, this, this.newsieClient);
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
    threads.sort((a: Article, b: Article) => b.date.unix() - a.date.unix());
    return threads;
  }

  public async post(author: Author, subject: string, body: string[], references?: string[]): Promise<void> {
    const initialResponse = await this.newsieClient.post();
    if (initialResponse.code !== 340) {
      // todo: display error..
      const errorMsg = "Cannot post: Posting not permitted";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    const article: NewsieArticle = {
      headers: {
        From: author.toString(),
        Newsgroups: this.name,
        Subject: subject,
        "User-Agent": `newsR ${packageJson.version}`
      },
      body: body
    };
    if (references && article.headers) {
      article.headers.References = references.join(' ');
    }

    const postResponse = await initialResponse.send(article);
    if (postResponse.code !== 240) {
      // todo: display error..
      const errorMsg = "Posting failed: Posting failed";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
  }
}
