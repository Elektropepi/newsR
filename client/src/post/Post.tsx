import React, {ChangeEvent, FormEvent} from "react";
import {Server} from "../server/Server";
import {Author} from "../author/Author";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Group} from "../group/Group";
import {Article} from "../article/Article";
import {Loading} from "../template/Loading";
import {Helmet} from "react-helmet";
import {Header} from "../template/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface State {
  loading: boolean;
  sending: boolean;
  done: boolean;
  group: Group | null;
  article: Article | null;
  author: string,
  subject: string,
  content: string,
  email: string
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
    content: '',
    email: ''
  };

  async componentDidMount(): Promise<void> {
    const {match} = this.props;
    const server = await Server.instance();
    const group = await server.getGroupByName(match.params.name);
    this.setState({
      author: localStorage.getItem('author') || "",
      email: localStorage.getItem('authorEmail') || ""
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
    const {group, article, subject, author, email, content} = this.state;
    if (!group) {
      console.error('Error: cannot send, group not found.');
      return;
    }
    const authorClass = new Author(author, email);
    console.log('author', author, authorClass);
    console.log('subject', subject);
    console.log('content', content);

    localStorage.setItem('author', author);
    localStorage.setItem('authorEmail', email);
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
    const {group, article, loading, subject, author, email, content, sending, done} = this.state;

    let headerText = group === null ? match.params.name : group.name;
    if (article) {
      headerText += ` ${_Post.replyStr + article.subject}`
    }
    // todo: insert article content as quote..
    // todo: form validation, author
    // todo: fix reload bug
    return (
      <div className="app-grid">
        <Helmet>
          <title>newsR - headerText</title>
        </Helmet>
        <Header name={headerText} url={match.url}/>
        <div className="app-grid-body">
          {
            loading ? <Loading/> : (group === null ? "Group not found" :
              <form className="post-article" onSubmit={(event: FormEvent<HTMLFormElement>) => this.send(event)}>
                <div className="input-group">
                  <input
                    required
                    name="author"
                    type="text"
                    placeholder="Name"
                    value={author}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      this.setState({
                        author: event.currentTarget.value
                      })
                    }}
                  />
                </div>
                <div className="input-group">
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="email@provider.tld"
                    value={email}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      this.setState({
                        email: event.currentTarget.value
                      })
                    }}
                  />
                </div>
                <div className="input-group">
                  <input
                    required
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
                <div className="input-group">
                  <input name="group" type="hidden" value={group.name} readOnly tabIndex={-1}/>
                </div>
                {article && (
                  <div className="input-group">
                    <input
                      name="followup to"
                      type="hidden"
                      value={article?.references.concat(article.id).join(' ')}
                      readOnly
                    />
                  </div>
                )}
                <div className="input-group">
              <textarea
                required
                value={content}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  this.setState({
                    content: event.currentTarget.value
                  })
                }}
              />
                </div>
                <div className="input-group">
                  <button className="submit" type="submit" disabled={sending || done}>
                    {
                      sending ? <FontAwesomeIcon icon="spinner" spin />
                      : (done ? "Sent!" : "Post")
                    }
                  </button>
                  <button className="back" type="reset" onClick={() => this.props.history.goBack()}>Go back</button>
                </div>
              </form>)
          }
        </div>
      </div>
    );
  }
}

export const Post = withRouter(_Post);
