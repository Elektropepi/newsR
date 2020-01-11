import {Moment} from "moment";
import Newsie from 'newsie';
import {Author} from "../author/Author";
import {ContentInterface} from "./Content";
import {Group} from "../group/Group";

export type ArticleId = string;

export interface ArticleInterface {
  id: ArticleId,
  subject: string,
  date: Moment,
  author: Author,
  followUps: ArticleInterface[]

  contents(): Promise<ContentInterface[]>,
}

export class Article implements ArticleInterface {
  public readonly id: ArticleId;
  public readonly subject: string;
  public readonly date: Moment;
  public readonly author: Author;
  public references: ArticleId[] = [];
  public directReference: ArticleId = '';
  public followUps: ArticleInterface[] = [];
  private group: Group;
  private readonly newsieClient: Newsie;

  constructor(id: string, subject: string, date: Moment, author: Author, group: Group, newsieClient: Newsie) {
    this.id = id;
    this.subject = subject;
    this.date = date;
    this.author = author;
    this.group = group;
    this.newsieClient = newsieClient;
  }

  public setReferences(references: string) {
    if (references.length <= 0) {
      return;
    }
    this.references = references.split(' ');
    this.directReference = this.references[this.references.length - 1];
  }

  public async contents(): Promise<ContentInterface[]> {
    const article = await this.newsieClient.body(this.id);
    if (!article.article.body) {
      return [];
    }
    const contents: ContentInterface[] = [];

    let content: ContentInterface | null = null;
    article.article.body.forEach((line: string) => {
      let citationLevel = 0;
      while (citationLevel < line.length && line[citationLevel] === ">") {
        citationLevel++;
      }
      line = line.substring(citationLevel, line.length);
      if (content === null) {
        content = {
          text: line,
          citationLevel: citationLevel
        };
        return;
      }
      if (citationLevel !== content.citationLevel) {
        contents.push(content);
        content = {
          text: line,
          citationLevel: citationLevel
        };
        return;
      }
      content.text += "\n" + line;
    });
    content && contents.push(content);

    return contents;
  }

  public async postFollowup(author: Author, subject: string, body: string[]): Promise<void> {
    await this.group.post(author, subject, body, this.references.concat(this.id));
  }
}
