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
  baseUrl: string;
  groupName: string;
}

export class CollapsibleThreadListEntry extends React.Component<Props, State> {
  render() {
    const {showContent, article, onClick, baseUrl, groupName} = this.props;
    return (
      <li key={article.id}>
        <ArticleDetail article={article} baseUrl={baseUrl} groupName={groupName} showContent={showContent} onClickHeader={id => onClick(id)}
                       hasSimpleHeader={true}/>
        {showContent && <div>
          <CollapsibleThreadList articles={article.followUps} baseUrl={baseUrl} groupName={groupName} />
          <div className="collapsible-line" onClick={() => onClick(article.id)} />
        </div>}
      </li>
    )
  }
}
