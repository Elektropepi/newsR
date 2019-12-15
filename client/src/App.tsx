import React, {ReactNode} from 'react';
import './App.scss';
import {Server} from "./server/Server";
import {GroupDetail} from "./group/GroupDetail";
import {GroupTitle} from "./group/GroupTitle";
import {Group} from "./group/Group";
import {AppGrid} from "./template/AppGrid";

interface State {
  loading: boolean;
  group0: Group | null;
}

export default class App extends React.Component<any, State> {
  private server: Server;

  constructor(props: any) {
    super(props);
    this.state = { loading: true, group0: null };
    this.server = new Server('news.tugraz.at', 119);
  }

  async componentDidMount(): Promise<void> {
    const groups = await this.server.groups();
    this.setState({ loading: false, group0: groups[0] });
  }

  render(): ReactNode {
    const { loading, group0 } = this.state;
    if(loading) {
      return "Loading...";
    }
    if(group0 === null) {
      return "No group found?";
    }
    return (
        <AppGrid
            header={<GroupTitle group={group0} />}
            body={<GroupDetail group={group0} />}
            footer={<div></div>} />
    );
  }
};
