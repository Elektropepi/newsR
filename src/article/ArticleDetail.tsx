import React from "react";
import {Article} from "./Article";

interface Props {
    article: Article | null;
}

interface State {

}

export class ArticleDetail extends React.Component<Props, State> {

    static defaultProps: Props = {
        article: null
    };

    state: Readonly<State> = {

    };

    render() {
        const { article } = this.props;
        if(article === null) {
            return null;
        }

        return (
            <div>
                <h2>{article.subject}</h2>
                <h3>{article.author.email} - {article.date.format("DD.MM.YYYY")}</h3>
                <p>
                    {article.content}
                </p>
            </div>
        )
    }
}
