import React from "react";
import {Group} from "./Group";
import {ArticleList} from "../article/ArticleList";
import {ArticleDetail} from "../article/ArticleDetail";
import {SidebarContent} from "../template/SidebarContent";
import {GroupTitle} from "./GroupTitle";
import {AppGrid} from "../template/AppGrid";
import {Server} from "../server/Server";
import {Switch, Route, RouteComponentProps} from "react-router-dom"

interface State {
  loading: boolean;
  group: Group | null;
}

export interface GroupRouteParams {
  name: string;
}

export class GroupDetail extends React.Component<RouteComponentProps<GroupRouteParams>, State> {

  state: Readonly<State> = {
    loading: true,
    group: null
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
    this.setState({loading: false, group: group});
  }

  render() {
    const {match} = this.props;
    const {loading, group} = this.state;
    if (loading) {
      return "Loading ...";
    }

    if (group === null) {
      return "Group not found!";
    }

    return (
      <AppGrid
        header={<GroupTitle group={group}/>}
        body={<SidebarContent
          sidebar={<ArticleList group={group} url={match.url}/>}
          content={
            <Switch>
              <Route path={`${match.path}/:id`} render={props =>
                <ArticleDetail {...props} group={group} />
              }/>
              <Route path={`${match.path}`}>
                <h3>Please select a thread</h3>
              </Route>
            </Switch>
          }/>
        }
        footer={<div></div>}/>
    )
  }
}
