import * as React from "react";
import {Link} from "react-router-dom";

export function ListEntry<T extends {
  url: string
  title: string
  subtitle?: string
  bold?: boolean
  onPress?: () => void
}>(props: {
  entry: T
}) {
  const {entry} = props;

  return (
    <div onClick={() => entry.onPress ? entry.onPress() : undefined}>
      <p className={"list-entry"}>
        <Link className="no-link" to={entry.url}>
          <span className={"title" + (entry.bold ? " bold" : "")}>{entry.title}</span><br/>
          <span className={"subtitle" + (entry.bold ? " bold" : "")}>{entry.subtitle}</span>
        </Link>
      </p>
    </div>

  )
}