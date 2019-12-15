import React from "react";
import {Article} from "./Article";

interface Props {
    article: Article;
}

interface State {
  loading: boolean;
  content: string;
}

export class ArticleDetail extends React.Component<Props, State> {

    state: Readonly<State> = {
      loading: true,
      content: ''
    };

    async componentDidMount() {
        this.loadContent();
    }

    async componentDidUpdate(prevProps: Props) {
        if(this.props.article.id !== prevProps.article.id) {
            this.loadContent();
        }
    }

    private async loadContent() {
        this.setState({ loading: true });
        const content = await this.props.article.content();
        this.setState({ loading: false, content: content });
    }

    render() {
        const { article } = this.props;
        const { loading, content } = this.state;

        if(article === null) {
            return null;
        }

        return (
            <div className="article-detail">
                <h2>{article.subject}</h2>
                <h3>{article.author.email} - {article.date.format("DD.MM.YYYY")}</h3>
                <p>
                  {loading ? 'loading...' : content}
                </p>
            </div>
        )
    }
}
