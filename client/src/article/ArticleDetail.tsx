import {ArticleInterface} from "./Article";
import React from "react";
import {Loading} from "../template/Loading";

interface Props {
  article: ArticleInterface,
  showContent: boolean
}

interface State {
  content: string,
  isContentLoading: boolean
}

export class ArticleDetail extends React.Component<Props, State> {
  state: Readonly<State> = {
    isContentLoading: false,
    content: ""
  };

  async componentDidMount() {
    this.loadContent();
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.article !== prevProps.article || this.props.showContent !== prevProps.showContent) {
      this.loadContent();
    }
  }

  private async loadContent() {
    if (!this.props.showContent) {
      return;
    }
    this.setState({isContentLoading: true, content: ""});
    const content = await this.props.article.content();
    this.setState({isContentLoading: false, content: content});
  }

  render() {
    const {article, showContent} = this.props;
    const {content, isContentLoading} = this.state;
    return (
      <div className="article-detail">
        <div className="header">
          <h1>{article.subject}</h1>
          <p className="article-detail-author">
            {article.date.format("DD.MM.YYYY")} by {article.author.name} ({article.author.email})
          </p>
        </div>
        {isContentLoading && <Loading/>}
        {showContent && <p className="article-detail-content">
          {content}
        </p>}
      </div>
    );
  }
}
