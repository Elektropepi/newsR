import {ArticleId, ArticleInterface} from "./Article";
import React, {ReactNode} from "react";
import {Loading} from "../template/Loading";
import {Content} from "./Content";
import {ArticleAuthor} from "./ArticleAuthor";
import {IconButton} from "../template/IconButton";
import {Link} from "react-router-dom";
import {Attachment} from "./Attachment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
  article: ArticleInterface;
  showContent: boolean;
  onClickHeader: ((id: ArticleId) => void) | null;
  hasSimpleHeader: boolean;
  baseUrl: string;
  groupName: string;
}

const defaultProps: Partial<Props> = {
  onClickHeader: null,
  hasSimpleHeader: false
};

interface State {
  contents: Content[];
  attachments: Attachment[];
  isContentLoading: boolean;
}

export class ArticleDetail extends React.Component<Props, State> {
  static defaultProps: Partial<Props>;
  state: Readonly<State> = {
    isContentLoading: false,
    contents: [],
    attachments: []
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
    this.setState({isContentLoading: true, contents: [], attachments: []});
    const contents = await this.props.article.contents();
    this.setState({isContentLoading: false, contents: contents.text, attachments: contents.attachments});
  }

  private nestContent(level: number, text: string): ReactNode {
    if (level === 0) {
      return text;
    }
    return <div className="nested-content">{this.nestContent(level - 1, text)}</div>;
  }

  render() {
    const {article, showContent, onClickHeader, hasSimpleHeader, groupName} = this.props;
    const {contents, attachments, isContentLoading} = this.state;
    return (
      <div className="article-detail">
        <div className="header" onClick={() => onClickHeader && onClickHeader(article.id)}>
          {hasSimpleHeader && <div className="article-detail-chevron">
            {
              showContent ? <FontAwesomeIcon icon="chevron-down"/> : <FontAwesomeIcon icon="chevron-right"/>
            }
          </div> }
          {hasSimpleHeader
            ? <ArticleAuthor article={article}/>

            : <div>
              <h1 className="article-detail-title">{article.subject}</h1>
              <ArticleAuthor article={article}/>
            </div>
          }
          <div className="article-buttons">
            <div className="article-button">
              <a href={`mailto:${article.author.email}`} className="no-link" onClick={e => e.stopPropagation()}>
                <IconButton icon="reply">Reply</IconButton>
              </a>
            </div>
            <div className="article-button">
              <Link to={`/post/${groupName}/${article.number}`} className="no-link">
                <IconButton icon="hand-point-right">Follow Up</IconButton>
              </Link>
            </div>
          </div>
        </div>
        {isContentLoading && <Loading/>}
        {showContent && <div className="article-detail-content">
          {contents.map((content, index) =>
            <div key={index}>
              {this.nestContent(content.citationLevel, content.text + "\n")}
            </div>)}
          {attachments.length > 0 &&
          <div>
            <p>Attachments:</p>
            <ul className="attachments">
              {attachments.map((attachment) =>
                <li key={attachment.name}>
                  <a
                    href={attachment.dataUrl}
                    download={attachment.name}
                  >
                    {['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml'].includes(attachment.contentType) ? (
                      <img src={attachment.dataUrl}  alt={attachment.name} />
                      ) : (
                      <span>{attachment.name}</span>
                      )
                    }
                  </a>
                </li>)}
            </ul>
          </div>
          }
        </div>}
      </div>
    );
  }
}

ArticleDetail.defaultProps = defaultProps;
