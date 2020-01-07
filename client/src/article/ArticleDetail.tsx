import React from "react";
import {Article, ArticleId} from "./Article";
import {RouteComponentProps} from "react-router-dom";
import {Group} from "../group/Group";
import {Loading} from "../template/Loading";


interface State {
  loading: boolean;
  article: Article | null;
  content: string
}

interface ArticleDetailRouteParams {
  id: ArticleId;
}

interface Props extends RouteComponentProps<ArticleDetailRouteParams> {
  group: Group;
}

export class ArticleDetail extends React.Component<Props, State> {

  state: Readonly<State> = {
    loading: true,
    article: null,
    content: ""
  };

  async componentDidMount() {
    this.loadContent();
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.loadContent();
    }
  }

  render() {
    const {article, loading, content} = this.state;
    if (loading) {
      return (<Loading/>);
    }

    if (article === null) {
      return "Article not found!";
    }

    return (
      <div className="article-detail">
        <div className="header">
          <h1>{article.subject}</h1>
          <p className="article-detail-author">
            {article.date.format("DD.MM.YYYY")} by {article.author.name} ({article.author.email})
          </p>
        </div>
        <p className="article-detail-content">
          {content}
        </p>
      </div>
    )
  }

  private async loadContent() {
    this.setState({loading: true});
    // FIXME: cache result of threads() somewhere. Can't call newsieClient.article() because
    // here I need the followUp structure that's constructed in threads()
    const threads = await this.props.group.threads();
    const thread = threads.find(thread => thread.id === this.props.match.params.id);
    if (thread === undefined) {
      this.setState({
        loading: false,
        article: null,
        content: ""
      });
      return;
    }
    const content = await thread.content();
    this.setState({loading: false, article: thread, content: content});
  }
}
