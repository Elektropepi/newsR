import React from "react";
import {Article} from "./Article";
import {RouteComponentProps} from "react-router-dom";
import {Group} from "../group/Group";
import {Helmet} from "react-helmet";
import {ArticleDetail} from "./ArticleDetail";
import {CollapsibleThreadList} from "./CollapsibleThreadList";


interface State {
  content: string
}

interface ArticleDetailRouteParams {
  number: string;
  name: string;
}

interface Props extends RouteComponentProps<ArticleDetailRouteParams> {
  group: Group;
  article: Article | null;
}

export class ThreadDetail extends React.Component<Props, State> {
  render() {
    const {article, match} = this.props;
    const baseUrl = `/groups/${match.params.name}/`;

    if (article === null) {
      return "Article not found!";
    }

    return (
      <div className="thread-detail">
        <Helmet>
          <title>newsR - {article?.subject}</title>
        </Helmet>
        <ArticleDetail baseUrl={baseUrl} article={article} showContent={true}/>
        <CollapsibleThreadList baseUrl={baseUrl} articles={article?.followUps}/>
      </div>
    )
  }
}
