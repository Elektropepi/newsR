import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function Footer() {
  return (
    <div className="app-grid-footer">
      <span className="app-name">newsR</span>
      <a href="https://github.com/Elektropepi/newsR/" className="no-link github-link">
        <FontAwesomeIcon icon={['fab', 'github']} />&nbsp;&nbsp;Github
      </a>
    </div>
  )
}
