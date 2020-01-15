import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface Props {
  icon: IconProp
}

interface State {
}

export class IconButton extends React.Component<Props, State> {

  render() {
    const {icon, children} = this.props;
    return (
      <div className="icon-button">
        <FontAwesomeIcon icon={icon}/>&nbsp;&nbsp;{children}
      </div>
    );
  }
}
