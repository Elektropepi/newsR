import React from "react";
import {Article} from "./Article";
import {ArticleListEntry} from "./ArticleListEntry";
import {Group} from "../group/Group";

interface State {
    loading: boolean;
    threads: Article[];
}

interface Props {
    group: Group;
    url: string;
}

export class ArticleList extends React.Component<Props, State> {
    state: Readonly<State> = {
        loading: true,
        threads: []
    };
    async componentDidMount(): Promise<void> {
        const threads = await this.props.group.threads();
        this.setState({loading: false, threads: threads});
    }
    render() {
        const { url } = this.props;
        const { threads, loading } = this.state;
        if(loading) {
            return "Loading...";
        }
        return (
          <div>
              {threads.map(article =>
                <ArticleListEntry key={article.id} article={article} url={url} />
              )}
          </div>
        );
    }
}
