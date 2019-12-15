import React from "react";
import {Article, ArticleId} from "./Article";
import {RouteComponentProps} from "react-router-dom";
import {Group} from "../group/Group";


interface State {
  loading: boolean;
  article: Article | null;
  content: string
}

interface ArticleDetailRouteParams {
  id: ArticleId;
}

interface Props extends RouteComponentProps<ArticleDetailRouteParams>{
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
        if(this.props.match.params.id !== prevProps.match.params.id) {
            this.loadContent();
        }
    }

    private async loadContent() {
        this.setState({ loading: true });
        // FIXME: cache result of threads() somewhere. Can't call newsieClient.article() because
        // here I need the followUp structure that's constructed in threads()
        const threads = await this.props.group.threads();
        const thread = threads.find(thread => thread.id === this.props.match.params.id);
        if(thread === undefined) {
          this.setState({
            loading: false,
            article: null,
            content: ""
          });
          return;
        }
        const content = await thread.content();
        this.setState({ loading: false, article: thread, content: content });
    }

    render() {
        const { article, loading, content } = this.state;
        if(loading) {
          return "Loading...";
        }

        if(article === null) {
            return "Article not found!";
        }

        return (
            <div className="article-detail">
                <h2>{article.subject}</h2>
                <h3>{article.author.email} - {article.date.format("DD.MM.YYYY")}</h3>
                <p>
                  {content}
                </p>
            </div>
        )
    }
}
