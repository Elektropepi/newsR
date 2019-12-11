import React, {ReactNode} from 'react';
import './App.scss';
import {Server} from "./server/Server";
import {GroupDetail} from "./group/GroupDetail";
import {Group} from "./group/Group";

interface State {
  loading: boolean;
  group0: Group | null;
}

export default class App extends React.Component<any, State> {
  private server: Server;

  constructor(props: any) {
    super(props);
    this.state = { loading: true, group0: null };
    this.server = new Server(new URL('news://news.tugraz.at:119'));
  }

  async componentDidMount(): Promise<void> {
    const groups = await this.server.groups();
    this.setState({ loading: false, group0: groups[0] });
  }

  render(): ReactNode {
    const { loading, group0 } = this.state;
    return (
      <div className="app">
        <header></header>
        <div>
          {loading || group0 === null ? 'loading...' :
            <GroupDetail group={group0}/>
          }
        </div>
      </div>
    );
  }
};
