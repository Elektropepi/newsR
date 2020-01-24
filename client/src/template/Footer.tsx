import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import packageJson from '../../package.json';

export function Footer() {
  return (
    <div className="app-grid-footer">
      <span className="app-name">newsR {packageJson.version}</span>
      <a href="https://github.com/Elektropepi/newsR/" className="no-link github-link">
        <FontAwesomeIcon icon={['fab', 'github']} />&nbsp;&nbsp;Github
      </a>
    </div>
  )
}
