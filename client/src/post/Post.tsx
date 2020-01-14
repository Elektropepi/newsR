import React from "react";
import {Server} from "../server/Server";
import {Author} from "../author/Author";

export class Post extends React.Component<{}, {}> {
  async send() {
    const server = await Server.instance();
    const group = await server.getGroupByName("tu-graz.test");
    const author = new Author("Name", "name@provider.tld");
    group?.post(author, "newsR", ["test1"]);


    // or
    //article.postFollowup(author, subject, body);
  }

  render() {
    return (
      <button onClick={() => this.send()}>
        Send test Post (for real!)
      </button>
    );
  }
}
