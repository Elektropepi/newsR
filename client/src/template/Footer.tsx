import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function Footer() {
  return (
    <div className="app-grid-footer">
      <a href="https://github.com/Elektropepi/newsR/" className="no-link">
        newsR <FontAwesomeIcon icon={['fab', 'github']} />
      </a>
    </div>
  )
}
