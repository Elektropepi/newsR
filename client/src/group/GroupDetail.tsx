import React from "react";
import {Group} from "./Group";
import {ThreadDetail} from "../article/ThreadDetail";
import {SidebarContent} from "../template/SidebarContent";
import {Server} from "../server/Server";
import {Link, Route, RouteComponentProps, Switch} from "react-router-dom"
import Media from "react-media";
import {SMALL_SCREEN_QUERY} from "../template/Constants";
import {Loading} from "../template/Loading";
import {Article} from "../article/Article";
import {List} from "../template/List";
import {Helmet} from "react-helmet";
import {addReadArticle, getReadArticles} from "../localStorage/localStorage";
import {Button, Header} from "../template/Header";
import {Footer} from "../template/Footer";

interface State {
  loading: boolean;
  group: Group | null;
  threads: Article[];
  readArticles: string[];
  filteredThreads: Article[];
}

export interface GroupRouteParams {
  name: string;
}

export class GroupDetail extends React.Component<RouteComponentProps<GroupRouteParams>, State> {

  state: Readonly<State> = {
    loading: true,
    group: null,
    threads: [],
    filteredThreads: [],
    readArticles: [],
  };

  async componentDidMount(): Promise<void> {
    const server = await Server.instance();
    const group = await server.getGroupByName(this.props.match.params.name);
    if (group === null) {
      this.setState({
        loading: false,
        group: null
      });
      return;
    }
    const threads = await group.threads();
    const readArticles = getReadArticles(group.name);

    this.setState({loading: false, group, threads, readArticles, filteredThreads: threads});
  }

  render() {
    const {match} = this.props;
    const {loading, group, threads, filteredThreads} = this.state;

    if (loading) {
      return (<Loading/>);
    }

    if (group === null) {
      return "Group not found!";
    }

    const filter = (text: string) => {
      const filteredThreads = threads.filter(
        (article) => article.subject.toLowerCase().includes(text) || article.author.name.toLowerCase().includes(text)
      )
      this.setState({filteredThreads})
    }

    const articleListData = filteredThreads.map(article => ({
      title: article.subject,
      subtitle: `${article.author.name} - ${article.date.format('DD.MM.YY HH:mm')}`,
      url: `${match.url}/${article.number}`,
      bold: !this.state.readArticles.find(a => a === article.id),
      onPress: () => {
        addReadArticle(group.name, article.id);
        this.setState({readArticles: this.state.readArticles.concat(article.id)})
      }
    }));

    const buttons: Button[] = [
      {
        name: "Write",
        icon: "pencil-alt",
        url: `/post/${group.name}`
      }
    ]

    return (
      <div className="app-grid">
        <Helmet>
          <title>newsR - {group?.name}</title>
        </Helmet>
        <Header name={group.name} searchBar={{filter}} url={match.url} buttons={buttons}/>
        <div className="app-grid-body">
          <Media query={SMALL_SCREEN_QUERY}>
            {
              screenIsSmall => screenIsSmall
                ?
                <Switch>
                  <Route path={`${match.path}/:number`} render={props =>
                    <ThreadDetail {...props} group={group}
                                  article={threads.find(thread => thread.number === parseInt(props.match.params.number))
                                    || null}/>
                  }/>
                  <Route path={`${match.path}`}>
                    <List data={articleListData}/>
                  </Route>
                </Switch>
                :
                <SidebarContent
                  sidebar={<List data={articleListData}/>}
                  content={
                    <Switch>
                      <Route path={`${match.path}/:number`} render={props =>
                        <ThreadDetail {...props} group={group}
                                      article={threads.find(thread => thread.number === parseInt(props.match.params.number))
                                        || null}/>
                      }/>
                      <NoThread url={match.path} groupName={group.name}/>
                    </Switch>
                  }/>
            }
          </Media>
        </div>
        <Footer/>
      </div>
    )
  }
}

function NoThread(props: {
  url: string
  groupName: string
}) {
  return (
    <Route path={props.url}>
      <div className="no-thread">
        <div className="no-thread-text">
          {"Welcome to " + props.groupName}
        </div>
        <div className="no-thread-text">
          Please select a thread or <Link to={`/post/${props.groupName}`}>write</Link> a new post!
        </div>
      </div>
    </Route>
  )
}
