import React from "react";
import {ArticleId, ArticleInterface} from "./Article";
import {ArticleDetail} from "./ArticleDetail";
import {CollapsibleThreadList} from "./CollapsibleThreadList";


interface State {
}

interface Props {
  article: ArticleInterface;
  showContent: boolean;
  onClick: (id: ArticleId) => void;
}

export class CollapsibleThreadListEntry extends React.Component<Props, State> {
  render() {
    const {showContent, article, onClick} = this.props;

    return (
      <li key={article.id}>
        <ArticleDetail article={article} showContent={showContent} onClickHeader={id => onClick(id)}/>
        {showContent && <div>
          <CollapsibleThreadList articles={article.followUps} />
          <div className="collapsible-line" onClick={() => onClick(article.id)}/>
        </div>}
      </li>
    )
  }
}
