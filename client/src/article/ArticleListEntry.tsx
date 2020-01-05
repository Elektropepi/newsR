import React from "react";
import {Article} from "./Article";
import {Link} from "react-router-dom";

interface Props {
  article: Article;
  url: string;
}

interface State {

}

export class ArticleListEntry extends React.Component<Props, State> {

  state: Readonly<State> = {};

  render() {
    const {article, url} = this.props;
    return (
      <p className="list-entry">
        <Link className="no-link" to={`${url}/${article.id}`}>
          <span className="subject">{article.subject}</span><br/>
          <span className="author-name">{article.author.name}</span>&nbsp;-&nbsp;
          <span className="date">{article.date.format('DD.MM.YY')}</span>
        </Link>
      </p>
    )
  }
}
