import {Moment} from "moment";
import Newsie from 'newsie';
import {Author} from "../author/Author";
import {Content} from "./Content";
import {Group} from "../group/Group";

export type ArticleId = string;

export interface ArticleInterface {
  id: ArticleId,
  subject: string,
  date: Moment,
  author: Author,
  followUps: ArticleInterface[],
  number: number,

  contents(): Promise<Content[]>,
}

export class Article implements ArticleInterface {
  private static readonly whitespaceRegex = new RegExp(/^$|\s+/);
  public readonly id: ArticleId;
  public readonly number: number;
  public readonly subject: string;
  public readonly date: Moment;
  public readonly author: Author;
  public references: ArticleId[] = [];
  public directReference: ArticleId = '';
  public followUps: ArticleInterface[] = [];
  private group: Group;
  private readonly newsieClient: Newsie;

  constructor(id: string, number: number, subject: string, date: Moment, author: Author, group: Group, newsieClient: Newsie) {
    this.id = id;
    this.number = number;
    this.subject = subject;
    this.date = date;
    this.author = author;
    this.group = group;
    this.newsieClient = newsieClient;
  }

  public static stripStartEndCitationsFromContents(contents: Content[]) {
    if (contents.length < 1) {
      return;
    }
    const firstContent = contents[0];
    if (firstContent.isCitationStart()) {
      let nextRootIndex = 1;
      while (nextRootIndex < contents.length && contents[nextRootIndex].citationLevel !== 0) {
        nextRootIndex++;
      }
      contents.splice(0, nextRootIndex);
    }

    let citationIndex: number | null = null;
    for (let i = contents.length - 1; i >= 0; i--) {
      const content = contents[i];
      if (content.citationLevel === 0 && !Article.isOnlyWhitespace(content.text)) {
        break;
      }
      if (content.isCitationStart()) {
        citationIndex = i;
        break;
      }
    }

    if (citationIndex !== null) {
      contents.splice(citationIndex, contents.length - citationIndex)
    }
  }

  private static isOnlyWhitespace(text: string): boolean {
    return Article.whitespaceRegex.test(text);
  }

  private static bodyToContents(body: string[]): Content[] {
    const contents: Content[] = [];

    body.forEach((line: string) => {
      let citationLevel = 0;
      while (citationLevel < line.length && line[citationLevel] === ">") {
        citationLevel++;
      }
      line = line.substring(citationLevel, line.length);
      contents.push(new Content(line, citationLevel));
    });
    return contents;
  }

  public setReferences(references: string) {
    if (references.length <= 0) {
      return;
    }
    this.references = references.split(' ');
    this.directReference = this.references[this.references.length - 1];
  }

  public async contents(): Promise<Content[]> {
    const article = await this.newsieClient.body(this.id);
    if (!article.article.body) {
      return [];
    }
    const contents = Article.bodyToContents(article.article.body);
    Article.stripStartEndCitationsFromContents(contents);
    return contents;
  }

  public async postFollowup(author: Author, subject: string, body: string[]): Promise<void> {
    await this.group.post(author, subject, body, this.references.concat(this.id));
  }
}
