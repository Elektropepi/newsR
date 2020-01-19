import * as React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export function ListEntry<T extends {
  url: string
  title: string
  subtitle?: string
  bold?: boolean
  icon?: IconProp
  onPress?: (entry: T) => void
}>(props: {
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