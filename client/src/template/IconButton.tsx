import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {SMALL_SCREEN_QUERY} from "./Constants";
import Media from "react-media";

interface Props {
  icon: IconProp
}

interface State {
}

export class IconButton extends React.Component<Props, State> {

  render() {
    const {icon, children} = this.props;
    return (
      <Media query={SMALL_SCREEN_QUERY}>
        {
          screenIsSmall => screenIsSmall ?
            < div className="icon-button">
              <FontAwesomeIcon icon={icon}/>
            </div> :
            < div className="icon-button">
              <FontAwesomeIcon icon={icon}/>&nbsp;&nbsp;{children}
            </div>
        }
      </Media>
    );
  }
}
