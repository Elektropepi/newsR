import {Article} from "newsie";

export class GroupCache {

  private static cache: GroupCache;

  private db: any;

  public static async instance(): Promise<GroupCache> {
    if (this.cache) {
      return GroupCache.cache;
    }
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open("newsR");

      openRequest.onerror = () => {
        reject();
      };
      openRequest.onsuccess = (event) => {
        this.cache = new GroupCache(openRequest.result);
        resolve(this.cache);
      };
      openRequest.onupgradeneeded = GroupCache.upgrade;
    })
  }

  // todo: event type
  private static upgrade(event: any) {
    const db = event.target.result;

    let overStore = db.createObjectStore("over", { keyPath: "id" });
    overStore.createIndex("server-group", ["server", "group"], {unique:false});
    overStore.createIndex("server", "server", { unique: false });
    overStore.createIndex("group", "group", { unique: false });
    overStore.createIndex("articleNumber", "articleNumber", { unique: false });
    overStore.createIndex("headers", "headers", { unique: false });
    overStore.createIndex("metadata", "metadata", { unique: false });

    let bodyStore = db.createObjectStore("body", { keyPath: "id" });
    bodyStore.createIndex("server-id", ["server", "id"], {unique:false});
    bodyStore.createIndex("server", "server", { unique: false });
    bodyStore.createIndex("body", "articleNumber", { unique: false });
  }

  constructor(db: any) {
    this.db = db;
  }

  // todo: fix type
  // todo: only return once finished..
  public async persistOverArticle(server: string, group: string, overArticle: any) {
    let transaction = this.db.transaction(["over"], "readwrite");
    let objectStore = transaction.objectStore("over");
    const storageObj = {
      id: overArticle.headers["MESSAGE-ID"],
      "server-group": [server, group],
      server: server,
      group: group,
      articleNumber: overArticle.articleNumber,
      headers: JSON.stringify(overArticle.headers),
      metadata: JSON.stringify(overArticle.metadata)
    };
    objectStore.add(storageObj);
  }

  // todo: fix overview type
  public async persistOverArticles(server: string, group: string, overviewArticles: any[]) {
    overviewArticles.forEach((overArticle: any) => this.persistOverArticle(server, group, overArticle));
  }

  public async retrieveOverArticles(server: string, group: string): Promise<any[]> {
    return new Promise((resolve => {
      let transaction = this.db.transaction('over');
      let objectStore = transaction.objectStore('over');
      let index = objectStore.index("server-group");
      const overArticles: any[] = [];

      index.openCursor(IDBKeyRange.only([server, group])).onsuccess = (event: any) => {
        let cursor = event.target.result;
        if(cursor) {
          const overArticle = {
            articleNumber: cursor.value.articleNumber,
            headers: JSON.parse(cursor.value.headers),
            metadata:  JSON.parse(cursor.value.metadata),
          };
          overArticles.push(overArticle);
          cursor.continue();
        } else {
          resolve(overArticles);
        }
      };
    }));
  }

  // todo: fix type
  // todo: only return once finished..
  public async persistBody(server: string, article: any) {
    let transaction = this.db.transaction(["body"], "readwrite");
    let objectStore = transaction.objectStore("body");
    const storageObj = {
      id: article.messageId,
      server: server,
      body: JSON.stringify(article.body),
    };
    objectStore.add(storageObj);
  }

  public async retrieveBody(server: string, id: string): Promise<Article> {
    return new Promise((resolve, reject) => {
      let transaction = this.db.transaction('body');
      let objectStore = transaction.objectStore('body');
      let index = objectStore.index("server-id");
      index.openCursor(IDBKeyRange.only([server, id])).onsuccess = (event: any) => {
        let cursor = event.target.result;
        if (!cursor) {
          resolve();
          return;
        }
        const body = {
          messageId: cursor.value.id,
          body: JSON.parse(cursor.value.body),
        };
        resolve(body);
      }
    });
  }
}
