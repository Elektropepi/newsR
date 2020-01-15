import {Moment} from "moment";
import Newsie from 'newsie';
import parse from "emailjs-mime-parser";
import {Author} from "../author/Author";
import {Content} from "./Content";
import {Group} from "../group/Group";
import {GroupCache} from "../group/GroupCache";
import {Attachment} from "./Attachment";

export type ArticleId = string;

export interface ArticleInterface {
  id: ArticleId,
  subject: string,
  date: Moment,
  author: Author,
  followUps: ArticleInterface[]

  contents(): Promise<{text: Content[], attachments: Attachment[]}>,
}

export class Article implements ArticleInterface {
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
  private static readonly whitespaceRegex = new RegExp(/^$|\s+/);

  constructor(id: string, number: number, subject: string, date: Moment, author: Author, group: Group, newsieClient: Newsie) {
    this.id = id;
    this.number = number;
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

  private static isOnlyWhitespace(text: string): boolean {
    return Article.whitespaceRegex.test(text);
  }

  public static stripStartEndCitationsFromContents(contents: Content[]) {
    if(contents.length < 1) {
      return;
    }
    const firstContent = contents[0];
    if(firstContent.isCitationStart()) {
      let nextRootIndex = 1;
      while((nextRootIndex < contents.length && contents[nextRootIndex].citationLevel !== 0) ||
      contents[nextRootIndex].text.length === 0) {
        nextRootIndex++;
      }
      contents.splice(0, nextRootIndex);
    }

    let citationIndex: number|null = null;
    for(let i = contents.length - 1; i >= 0; i--) {
      const content = contents[i];
      if(content.citationLevel === 0 && !Article.isOnlyWhitespace(content.text)) {
        break;
      }
      if(content.isCitationStart()) {
        citationIndex = i;
        break;
      }
    }

    if(citationIndex !== null) {
      contents.splice(citationIndex, contents.length - citationIndex)
    }
  }

  private static bodyToContents(body: string[]): {text: Content[], attachments: Attachment[]} {
    const contents: Content[] = [];
    let attachments: Attachment[] = [];

    if (body[0] === 'This is a multi-part message in MIME format.') {
      const missingMimeHeader =
        'MIME-Version: 1.0\n' +
        `Content-Type: multipart/mixed; boundary=${body[1].substring(2)}\n` +
        '\n';
      const mimeInfo = parse(missingMimeHeader + body.join('\n'));
      body = mimeInfo.childNodes
        .filter((node: any) => node.contentType.value === 'text/plain')
        .map((node: any) => new TextDecoder("utf-8").decode(node.content))
        .join('\n')
        .split('\n');
      attachments = mimeInfo.childNodes
        .filter((node: any) => node.contentType.value !== 'text/plain')
        .map((node: any) => {
          const base64 = node.raw.substring(node.raw.lastIndexOf('\n\n')).replace(/\s/g, "");
          return {
            contentType: node.contentType.value,
            name: node.contentType.params.name,
            dataUrl: `data:${node.contentType.value};base64,${base64}`
          };
        });
    }

    if (!body) {
      return {text: contents, attachments};
    }

    body.forEach((line: string) => {
      let citationLevel = 0;
      while (citationLevel < line.length && line[citationLevel] === ">") {
        citationLevel++;
      }
      line = line.substring(citationLevel, line.length);
      contents.push(new Content(line, citationLevel));
    });
    return {text: contents, attachments};
  }

  public async contents(): Promise<{text: Content[], attachments: Attachment[]}> {
    const groupCache = await GroupCache.instance();
    let article = await groupCache.retrieveBody(this.group.host, this.id);
    if (!article || !article.body) {
      article = (await this.newsieClient.body(this.id)).article;
      if (article.body) {
        await groupCache.persistBody(this.group.host, article);
      } else {
        article.body = [
          '[newsR: content not found and not cached]'
        ]
      }
    }
    const contents = Article.bodyToContents(article.body);
    Article.stripStartEndCitationsFromContents(contents.text);
    return {text: contents.text, attachments: contents.attachments};
  }

  public async postFollowup(author: Author, subject: string, body: string[]): Promise<void> {
    await this.group.post(author, subject, body, this.references.concat(this.id));
  }
}
