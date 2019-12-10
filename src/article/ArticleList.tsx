import React from "react";
import {Article} from "./Article";
import {ArticleListEntry} from "./ArticleListEntry";

interface Props {
    articles: Article[];
    onArticleClick: (article: Article) => void;
}

interface State {

}

export class ArticleList extends React.Component<Props, State> {

    static defaultProps: Props = {
        articles: [],
        onArticleClick: () => {}
    };

    state: Readonly<State> = {

    };

    render() {
        const { articles, onArticleClick } = this.props;

        return (
            <div>
                {articles.map(article =>
                    <ArticleListEntry key={article.id} article={article} onClick={onArticleClick} />
                )}
            </div>
        )
    }
}
