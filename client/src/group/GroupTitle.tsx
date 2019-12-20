import React from "react";
import {Group} from "./Group";
import {Link} from "react-router-dom";

interface Props {
  group: Group;
  url: string;
}

export class GroupTitle extends React.Component<Props, any> {

  render() {
    const {group, url} = this.props;
    return (
      <div className="group-title">
        <Link className="no-link" to={`${url}`}>{group.name}</Link>
      </div>
    )
  }
}
