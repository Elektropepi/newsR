import * as React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ListType} from "./List";

export function ListEntry<T extends ListType<T>>(props: {
  entry: T
}) {
  const {entry} = props;

  return (
    <div onClick={() => entry.onPress ? entry.onPress(entry) : undefined}>
      <p className={"list-entry"}>
        {entry.icon &&
          <div className="float">
            <FontAwesomeIcon icon={entry.icon}/>
          </div>
        }
        <Link className="no-link" to={entry.url}>
          <span className={"title" + (entry.bold ? " bold" : "")}>{entry.title}</span><br/>
          <span className={"subtitle" + (entry.bold ? " bold" : "")}>{entry.subtitle}</span>
        </Link>
      </p>
    </div>

  )
}
