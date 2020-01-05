import React from "react";
import {ListEntry} from "./ListEntry";

export function List<T extends {
  url: string
  title: string
  subtitle?: string
}>(props: {
  data: T[]
}) {
  const {data} = props;

  return (
    <div>
      {data.map(entry => <ListEntry entry={entry}/>)}
    </div>
  );
}
