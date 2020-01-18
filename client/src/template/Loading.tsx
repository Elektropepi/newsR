import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
}

interface State {

}

export class Loading extends React.Component<Props, State> {

  render() {
    return (
      <div className="loading-container">
        <div className="loading">
          <FontAwesomeIcon icon="spinner" spin />&nbsp;&nbsp;Loading ...
        </div>
      </div>
    );
  }
}
