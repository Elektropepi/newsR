import React from "react";
import {ArticleInterface} from "./Article";
import {ArticleDetail} from "./ArticleDetail";


interface State {
}

interface Props {
  articles: ArticleInterface[];
  levelsToShow: number;
}

export class CollapsibleThreadList extends React.Component<Props, State> {
  render() {
    const {articles, levelsToShow} = this.props;

    if (articles.length < 1 || levelsToShow === 0) {
      return null;
    }

    return (
      <div>
        <ul>
          {articles.map(article =>
            <li key={article.id}>
              <ArticleDetail article={article} showContent={levelsToShow > 1}/>
              <CollapsibleThreadList articles={article.followUps} levelsToShow={levelsToShow - 1}/>
            </li>)}
        </ul>
      </div>
    )
  }
}
