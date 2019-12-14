import React from "react";
import {Group} from "./Group";
import {ArticleList} from "../article/ArticleList";
import {ArticleDetail} from "../article/ArticleDetail";
import {Article} from "../article/Article";

interface Props {
    group: Group;
}

interface State {
    loading: boolean;
    selectedArticle: Article | null;
    threads: Article[];
}

export class GroupDetail extends React.Component<Props, State> {

    state: Readonly<State> = {
        loading: true,
        selectedArticle: null,
        threads: []
    };

    private onArticleClick(article: Article) {
        this.setState({
            selectedArticle: article
        });
    }

    async componentDidMount(): Promise<void> {
        const threads = await this.props.group.threads();
        this.setState({ loading: false, threads: threads });
    }

    render() {
        const { group } = this.props;
        const { selectedArticle, threads } = this.state;

        if(group === null) {
            return null;
        }

        return (
            <div>
                <h1>Group {group.name}</h1>
                <div className="article-list">
                    <ArticleList articles={threads} onArticleClick={article => this.onArticleClick(article)} />
                </div>
                <div className="article-detail">
                    { selectedArticle !== null && <ArticleDetail article={selectedArticle}/> }
                </div>
            </div>
        )
    }
}
