import {ArticleInterface} from "./Article";
import React from "react";

interface Props {
  article: ArticleInterface
}

interface State {
}

export class ArticleAuthor extends React.Component<Props, State> {
  render() {
    const {article} = this.props;
    return (
      <span className="article-detail-author">
        {article.date.format("DD.MM.YYYY HH:mm")} by {article.author.name}
        &nbsp;(<a href={`mailto:${article.author.email}`}>{article.author.email}</a>)
      </span>
    );
  }
}
