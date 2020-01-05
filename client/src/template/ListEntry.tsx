import * as React from "react";
import {Link} from "react-router-dom";

export function ListEntry<T extends {
  url: string
  title: string
  subtitle?: string
}>(props: {
  entry: T
}) {
  const {entry} = props;
  return (
    <div>
      <p className="list-entry">
        <Link className="no-link" to={entry.url}>
          <span className="title">{entry.title}</span><br/>
          <span className="subtitle">{entry.subtitle}</span>
        </Link>
      </p>
    </div>

  )
}