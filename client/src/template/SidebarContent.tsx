import React, {ReactNode} from "react";

interface Props {
  sidebar: ReactNode,
  content: ReactNode
}

interface State {
}

export class SidebarContent extends React.Component<Props, State> {

  render() {
    return (
      <div className="sidebar-content">
        <div className="sidebar-content-sidebar">{this.props.sidebar}</div>
        <div className="sidebar-content-content">{this.props.content}</div>
      </div>
    );
  }
}
