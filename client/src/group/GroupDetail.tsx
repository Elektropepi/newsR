import React from "react";
import {Group} from "./Group";
import {ThreadDetail} from "../article/ThreadDetail";
import {SidebarContent} from "../template/SidebarContent";
import {GroupTitle} from "./GroupTitle";
import {AppGrid} from "../template/AppGrid";
import {Server} from "../server/Server";
import {Link, Route, RouteComponentProps, Switch} from "react-router-dom"
import Media from "react-media";
import {SMALL_SCREEN_QUERY} from "../template/Constants";
import {Loading} from "../template/Loading";
import {Article} from "../article/Article";
import {List} from "../template/List";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Helmet} from "react-helmet";

interface State {
  loading: boolean;
  group: Group | null;
  threads: Article[];
}

export interface GroupRouteParams {
  name: string;
}

export class GroupDetail extends React.Component<RouteComponentProps<GroupRouteParams>, State> {

  state: Readonly<State> = {
    loading: true,
    group: null,
    threads: []
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
    this.setState({loading: false, group, threads});
  }

  render() {
    const {match} = this.props;
    const {loading, group, threads} = this.state;

    if (loading) {
      return (<Loading/>);
    }

    if (group === null) {
      return "Group not found!";
    }

    const articleListData = threads.map(article => ({
      title: article.subject,
      subtitle: `${article.author.name} - ${article.date.format('DD.MM.YY')}`,
      url: `${match.url}/${article.id}`
    }));

    return (
      <div className="group-detail">
        <Helmet>
          <title>newsR - {group?.name}</title>
        </Helmet>
        <AppGrid
          header={
            <div className="float-div">
              <div className="float">
                <Link className="no-link" to={'/'}>
                  <FontAwesomeIcon icon="home" size="xs"/>
                </Link>
              </div>

              <GroupTitle group={group} url={match.url}/>
            </div>
          }
          body={<Media query={SMALL_SCREEN_QUERY}>
            {
              screenIsSmall => screenIsSmall
                ?
                <Switch>
                  <Route path={`${match.path}/:id`} render={props =>
                    <ThreadDetail {...props} group={group}
                                  article={threads.find(thread => thread.id === props.match.params.id) || null}/>
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
                      <Route path={`${match.path}/:id`} render={props =>
                        <ThreadDetail {...props} group={group}
                                      article={threads.find(thread => thread.id === props.match.params.id) || null}/>
                      }/>
                      <Route path={`${match.path}`}>
                        <h3>Please select a thread</h3>
                      </Route>
                    </Switch>
                  }/>
            }
          </Media>
          }
          footer={<div></div>}/>
      </div>
    )
  }
}
