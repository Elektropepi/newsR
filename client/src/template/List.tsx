import React from "react";
import {ListEntry} from "./ListEntry";

export function List<T extends {
  url: string
  title: string
  subtitle?: string
  bold?: boolean
  onPress?: () => void
}>(props: {
  data: T[]
}) {
  const {data} = props;

  return (
    <div>
      {data.map((entry, index) => <ListEntry key={index} entry={entry}/>)}
    </div>
  );
}
