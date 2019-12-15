import React, {ReactNode} from "react";

interface Props {
    header: ReactNode,
    body: ReactNode,
    footer: ReactNode
}

interface State {
}

export class AppGrid extends React.Component<Props, State> {

    render() {
        return (
            <div className="app-grid">
                <div className="app-grid-header">{this.props.header}</div>
                <div className="app-grid-body">{this.props.body}</div>
                <div className="app-grid-footer">{this.props.footer}</div>
            </div>
        );
    }
}
