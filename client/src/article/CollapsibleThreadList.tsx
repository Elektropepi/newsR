import React from "react";
import {ArticleId, ArticleInterface} from "./Article";
import {CollapsibleThreadListEntry} from "./CollapsibleThreadListEntry";


interface State {
  forceShowIds: ArticleId[];
}

interface Props {
  articles: ArticleInterface[];
}

export class CollapsibleThreadList extends React.Component<Props, State> {
  state: Readonly<State> = {
    forceShowIds: []
  };

  handleArticleClick(articleId: ArticleId) {
    const {forceShowIds} = this.state;
    if(forceShowIds.includes(articleId)) {
      forceShowIds.splice(forceShowIds.indexOf(articleId))
    } else {
      forceShowIds.push(articleId);
    }
    this.setState({forceShowIds: forceShowIds});
  }

  render() {
    const {articles} = this.props;
    const {forceShowIds} = this.state;

    return (
      <div className="collapsible-thread-list">
        <ul>
          {articles.map(article =>
            <CollapsibleThreadListEntry key={article.id} article={article}
                                        showContent={forceShowIds.includes(article.id)}
                                        onClick={id => this.handleArticleClick(id)} />)}
        </ul>
      </div>
    )
  }
}
