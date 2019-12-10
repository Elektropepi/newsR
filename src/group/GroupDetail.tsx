import React from "react";
import {Group} from "./Group";
import {ArticleList} from "../article/ArticleList";
import {ArticleDetail} from "../article/ArticleDetail";
import {Article} from "../article/Article";

interface Props {
    group: Group | null;
}

interface State {
    selectedArticle: Article | null
}

export class GroupDetail extends React.Component<Props, State> {

    static defaultProps: Props = {
        group: null
    };

    state: Readonly<State> = {
        selectedArticle: null
    };

    private onArticleClick(article: Article) {
        this.setState({
            selectedArticle: article
        });
    }

    render() {
        const { group } = this.props;
        const { selectedArticle } = this.state;

        if(group === null) {
            return null;
        }

        return (
            <div>
                <h1>Group {group.name}</h1>
                <div className="article-list">
                    <ArticleList articles={group.threads} onArticleClick={article => this.onArticleClick(article)} />
                </div>
                <div className="article-detail">
                    { selectedArticle !== null && <ArticleDetail article={selectedArticle}/> }
                </div>
            </div>
        )
    }
}
