import React from "react";
import {Group} from "./Group";
import {ArticleList} from "../article/ArticleList";
import {ArticleDetail} from "../article/ArticleDetail";
import {Article} from "../article/Article";
import {SidebarContent} from "../template/SidebarContent";

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
        const selectedArticle = threads.length > 0 ? threads[0] : null;
        this.setState({ loading: false, threads: threads, selectedArticle: selectedArticle });
    }

    render() {
        const { group } = this.props;
        const { selectedArticle, threads } = this.state;

        if(group === null) {
            return null;
        }

        return (
            <SidebarContent sidebar={<ArticleList articles={threads} onArticleClick={article => this.onArticleClick(article)} />}
                            content={ selectedArticle !== null && <ArticleDetail article={selectedArticle}/> } />
        )
    }
}
