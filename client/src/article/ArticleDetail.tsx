import {ArticleId, ArticleInterface} from "./Article";
import React, {ReactNode} from "react";
import {Loading} from "../template/Loading";
import {Content} from "./Content";
import {ArticleAuthor} from "./ArticleAuthor";
import {IconButton} from "../template/IconButton";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
  article: ArticleInterface;
  showContent: boolean;
  onClickHeader: ((id: ArticleId) => void) | null;
  hasSimpleHeader: boolean;
  baseUrl: string;
}

const defaultProps: Partial<Props> = {
  onClickHeader: null,
  hasSimpleHeader: false
};

interface State {
  contents: Content[];
  isContentLoading: boolean;
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
    const {article, showContent, onClickHeader, hasSimpleHeader, baseUrl} = this.props;
    const {contents, isContentLoading} = this.state;
    return (
      <div className="article-detail">
        <div className="header" onClick={() => onClickHeader && onClickHeader(article.id)}>
          <div>
            {hasSimpleHeader
              ? <div>
                {
                  showContent ? <FontAwesomeIcon icon="chevron-down"/> : <FontAwesomeIcon icon="chevron-right"/>
                }&nbsp;&nbsp;
                <ArticleAuthor article={article}/>
              </div>

              : <div>
                <h1 className="article-detail-title">{article.subject}</h1>
                <ArticleAuthor article={article}/>
              </div>
            }
          </div>
          <a href={`mailto:${article.author.email}`} className="no-link">
            <div className="article-button">
              <IconButton icon="reply">Reply</IconButton>
            </div>
          </a>
          <Link to={`${baseUrl}${article.number}/post`} className="no-link">
            <div className="article-button">
              <IconButton icon="hand-point-right">Follow Up</IconButton>
            </div>
          </Link>
        </div>
        {isContentLoading && <Loading/>}
        {showContent && <div className="article-detail-content">
          {contents.map((content, index) =>
            <div key={index}>
              {this.nestContent(content.citationLevel, content.text + "\n")}
            </div>)}
        </div>}
      </div>
    );
  }
}

ArticleDetail.defaultProps = defaultProps;
