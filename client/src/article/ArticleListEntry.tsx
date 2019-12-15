import React from "react";
import {Article} from "./Article";

interface Props {
    article: Article | null;
    onClick: (article: Article) => void;
}

interface State {

}

export class ArticleListEntry extends React.Component<Props, State> {

    static defaultProps: Props = {
        article: null,
        onClick: () => {}
    };

    state: Readonly<State> = {

    };

    render() {
        const { article, onClick } = this.props;
        if(article === null) {
            return null;
        }


        return (
            <p className="article-list-entry" onClick={() => onClick(article)}>
                {article.subject}
            </p>
        )
    }
}
