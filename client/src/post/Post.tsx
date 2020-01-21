import React, {ChangeEvent, FormEvent} from "react";
import {Server} from "../server/Server";
import {Author} from "../author/Author";
import {RouteComponentProps} from "react-router-dom";
import {Group} from "../group/Group";
import {Article} from "../article/Article";
import {Loading} from "../template/Loading";
import {Helmet} from "react-helmet";
import {Header} from "../template/Header";
import {withRouter} from 'react-router-dom'

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

class _Post extends React.Component<RouteComponentProps<PostRouteParams>, {}> {

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
    const subject = article.subject.startsWith(_Post.replyStr) ? article.subject : _Post.replyStr + article.subject;
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
    const {group, article, subject, author, content} = this.state;
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

    let headerText = group.name;
    if (article) {
      headerText += ` ${article.number} follow up`
    }
    // todo: insert article content as quote..
    // todo: form validation, author
    // todo: fix reload bug
    return (
      <div className="app-grid">
        <Helmet>
          <title>newsR - {group?.name}</title>
        </Helmet>
        <Header name={headerText} url={match.url} />
        <div className="app-grid-body">
          <form className="postArticle" onSubmit={(event: FormEvent<HTMLFormElement>) => this.send(event)}>
            <div className="inputGroup">
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
            <div className="inputGroup">
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
            <div className="inputGroup">
              <input name="group" type="text" value={group.name} readOnly tabIndex={-1} />
            </div>
            {article && (
              <div className="inputGroup">
                <input
                  name="followup to"
                  type="text"
                  value={article?.references.concat(article.id).join(' ')}
                  readOnly
                />
              </div>
            )}
            <div className="inputGroup">
              <textarea
                value={content}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  this.setState({
                    content: event.currentTarget.value
                  })
                }}
              />
            </div>
            <div className="inputGroup">
              <button className="submit" type="submit" disabled={sending || done}>Post</button>
              <button className="back" type="reset" onClick={() => this.props.history.goBack()}>Go back</button>
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
      </div>
    );
  }
}

export const Post = withRouter(_Post);
