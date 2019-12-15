import React from "react";
import {Group} from "./Group";

interface Props {
    group: Group;
}

export class GroupTitle extends React.Component<Props, any> {

    render() {
        const { group } = this.props;
        return (
            <div>
                <h1>Group {group.name}</h1>
            </div>
        )
    }
}
