import React from "react";
import {Group} from "./Group";

interface Props {
    group: Group;
}

export class GroupTitle extends React.Component<Props, any> {

    render() {
        const { group } = this.props;
        return (
            <div className="group-title">
                Group {group.name}
            </div>
        )
    }
}
