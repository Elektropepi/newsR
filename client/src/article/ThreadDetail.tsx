import React from "react";
import {Article, ArticleId} from "./Article";
import {RouteComponentProps} from "react-router-dom";
import {Group} from "../group/Group";
import {Helmet} from "react-helmet";
import {ArticleDetail} from "./ArticleDetail";
import {CollapsibleThreadList} from "./CollapsibleThreadList";


interface State {
  content: string
}

interface ArticleDetailRouteParams {
  id: ArticleId;
}

interface Props extends RouteComponentProps<ArticleDetailRouteParams> {
  group: Group;
  article: Article | null;
}

export class ThreadDetail extends React.Component<Props, State> {
  render() {
    const {article} = this.props;

    if (article === null) {
      return "Article not found!";
    }

    return (
      <div className="thread-detail">
        <Helmet>
          <title>newsR - {article?.subject}</title>
        </Helmet>
        <ArticleDetail article={article} showContent={true}/>
        <CollapsibleThreadList articles={article?.followUps} levelsToShow={2}/>
      </div>
    )
  }
}
