import React from "react";
import {ListEntry} from "./ListEntry";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export function List<T extends {
  url: string
  title: string
  subtitle?: string
  bold?: boolean
  icon?: IconProp
  onPress?: (entry: T) => void
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
