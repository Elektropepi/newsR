import React from "react";
import {ArticleId, ArticleInterface} from "./Article";
import {CollapsibleThreadListEntry} from "./CollapsibleThreadListEntry";
import {ArticleDetail} from "./ArticleDetail";


interface State {
  forceHideIds: ArticleId[];
}

interface Props {
  articles: ArticleInterface[];
  baseUrl: string;
  groupName: string;
}

export class CollapsibleThreadList extends React.Component<Props, State> {
  state: Readonly<State> = {
    forceHideIds: []
  };

  handleArticleClick(articleId: ArticleId) {
    const {forceHideIds} = this.state;
    if (forceHideIds.includes(articleId)) {
      forceHideIds.splice(forceHideIds.indexOf(articleId), 1)
    } else {
      forceHideIds.push(articleId);
    }
    this.setState({forceHideIds: forceHideIds});
  }

  render() {
    const {articles, baseUrl, groupName} = this.props;
    const {forceHideIds} = this.state;

    return (
      <div className="collapsible-thread-list">
        <ul>
          {articles.map(article =>
            <CollapsibleThreadListEntry baseUrl={baseUrl} groupName={groupName} key={article.id} article={article}
                                        showContent={!forceHideIds.includes(article.id)}
                                        onClick={id => this.handleArticleClick(id)}/>)}
        </ul>
      </div>
    )
  }
}
