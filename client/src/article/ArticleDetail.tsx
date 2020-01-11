import {ArticleId, ArticleInterface} from "./Article";
import React, {ReactNode} from "react";
import {Loading} from "../template/Loading";
import {ContentInterface} from "./Content";
import {Link} from "react-router-dom";

interface Props {
  article: ArticleInterface,
  showContent: boolean,
  onClickHeader: ((id: ArticleId) => void) | null
}

const defaultProps: Partial<Props> = {
  onClickHeader: null
};

interface State {
  contents: ContentInterface[],
  isContentLoading: boolean
}

export class ArticleDetail extends React.Component<Props, State> {
  static defaultProps: Partial<Props>;
  state: Readonly<State> = {
    isContentLoading: false,
    contents: []
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
    this.setState({isContentLoading: true, contents: []});
    const contents = await this.props.article.contents();
    this.setState({isContentLoading: false, contents: contents});
  }

  private nestContent(level: number, text: string): ReactNode {
    if (level === 0) {
      return text;
    }
    return <div className="nested-content">{this.nestContent(level - 1, text)}</div>;
  }

  render() {
    const {article, showContent, onClickHeader} = this.props;
    const {contents, isContentLoading} = this.state;
    return (
      <div className="article-detail">
        <div className="header" onClick={() => onClickHeader && onClickHeader(article.id)}>
          <h1 className="article-detail-title">{article.subject}</h1>
          <p className="article-detail-author">
            {article.date.format("DD.MM.YYYY")} by {article.author.name}
            &nbsp;(<a href={`mailto:${article.author.email}`}>{article.author.email}</a>)
            &nbsp;<Link to="/post/">Followup</Link>
          </p>
        </div>
        {isContentLoading && <Loading/>}
        {showContent && <div className="article-detail-content">
          {contents.map((content, index) =>
            <div key={index}>
              {this.nestContent(content.citationLevel, content.text)}
            </div>)}
        </div>}
      </div>
    );
  }
}

ArticleDetail.defaultProps = defaultProps;
