import {ArticleInterface} from "./Article";
import React, { Fragment } from "react";
import Media from "react-media";
import {LARGE_SCREEN_QUERY, SMALL_SCREEN_QUERY} from "../template/Constants";

interface Props {
  article: ArticleInterface
}

interface State {
}

export class ArticleAuthor extends React.Component<Props, State> {
  render() {
    const {article} = this.props;
    return (
      <div className="article-detail-author">
        {article.date.format("DD.MM.YYYY HH:mm")} by {article.author.name}
        <Media queries={{small: SMALL_SCREEN_QUERY, large: LARGE_SCREEN_QUERY}}>
          {matches => (
            <Fragment>
              {matches.small && <br />}
              {matches.large && <Fragment>&nbsp;</Fragment>}
            </Fragment>
          )}
        </Media>
        <a href={`mailto:${article.author.email}`}>{article.author.email}</a>
      </div>
    );
  }
}
