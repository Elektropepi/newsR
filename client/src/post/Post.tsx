import React, {ChangeEvent, FormEvent} from "react";
import {Server} from "../server/Server";
import {Author} from "../author/Author";
import {RouteComponentProps} from "react-router-dom";
import {Group} from "../group/Group";
import {Article} from "../article/Article";
import {Loading} from "../template/Loading";

interface State {
  loading: boolean;
  sending: boolean;
  done: boolean;
  group: Group | null;
  article: Article | null;
  author: string,
  subject: string,
  content: string
}

export interface PostRouteParams {
  name: string;
  number: string;
}

export class Post extends React.Component<RouteComponentProps<PostRouteParams>, {}> {

  public static replyStr = 'Re: ';

  state: Readonly<State> = {
    loading: true,
    sending: false,
    done: false,
    group: null,
    article: null,
    author: '',
    subject: '',
    content: ''
  };

  async componentDidMount(): Promise<void> {
    const {match} = this.props;
    const server = await Server.instance();
    const group = await server.getGroupByName(match.params.name);
    this.setState({
      author: localStorage.getItem('author')
    });
    if (!group) {
      this.setState({
        group: null,
        article: null,
        loading: false
      });
      return;
    }
    if (!match.params.number) {
      this.setState({
        group,
        article: null,
        loading: false
      });
      return;
    }
    const article = await group.article(parseInt(match.params.number));
    if (!article) {
      this.setState({
        group: null,
        article: null,
        loading: false
      });
      return;
    }
    const subject = article.subject.startsWith(Post.replyStr) ? article.subject : Post.replyStr + article.subject;
    this.setState({
      group,
      article,
      subject,
      loading: false
    });
  }

  async send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState({
      sending: true
    });
    const {group, article, loading, subject, author, content} = this.state;
    if (!group) {
      console.error('Error: cannot send, group not found.');
      return;
    }
    const authorClass = Author.authorFromString(author);
    console.log('author', author, authorClass);
    console.log('subject', subject);
    console.log('content', content);

    localStorage.setItem('author', author);
    if (article) {
      await article.postFollowup(authorClass, subject, [content]);
    } else {
      await group?.post(authorClass, subject, [content]);
    }
    this.setState({
      sending: false,
      done: true
    });
  }

  render() {
    const {match} = this.props;
    const {group, article, loading, subject, author, content, sending, done} = this.state;

    if (loading) {
      return <Loading/>;
    }

    if (!group) {
      // todo: error page
      return (
        <div>
          Error: no group found.
        </div>
      );
    }

    // todo: insert article content as quote..
    // todo: form validation, author
    // todo: fix reload bug
    return (
      <div>
        group: {group ? group.name : "no group"}<br />
        article: {article ? article.number : "no article"}<br />
        <form onSubmit={(event: FormEvent<HTMLFormElement>) => this.send(event)}>
          <div>
            <input
              name="author"
              type="text"
              placeholder="Name <mail@provider.tld>"
              value={author}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                this.setState({
                  author: event.currentTarget.value
                })
              }}
            />
          </div>
          <div>
            <input
              name="subject"
              type="text"
              placeholder="Subject: …"
              value={subject}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                this.setState({
                  subject: event.currentTarget.value
                })
              }}
            />
          </div>
          <div>
            <input name="group" type="text" value={group.name} readOnly />
          </div>
          {article && (
            <div>
              <input
                name="followup to"
                type="text"
                value={article?.references.concat(article.id).join(' ')}
                readOnly
              />
            </div>
          )}
          <div>
            <textarea
              value={content}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                this.setState({
                  content: event.currentTarget.value
                })
              }}
            />
          </div>
          <div>
            <button type="submit" disabled={sending || done}>Submit</button>
          </div>
          <div>
            {sending && !done && (
              <span>Sending..</span>
            )}
            {done && (
              <span>Send</span>
            )}
          </div>
        </form>
      </div>
    );
  }
}
