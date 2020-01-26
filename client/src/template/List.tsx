import React from "react";
import {ListEntry} from "./ListEntry";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
export type ListType<T> = {
  title: string
  url?: string
  subtitle?: string
  bold?: boolean
  icon?: IconProp
  onPress?: (entry: T) => void
};

export function List<T extends ListType<T>>(props: {
  data: T[]
}) {
  const {data} = props;

  return (
    <div>
      {data.map((entry, index) => <ListEntry key={index} entry={entry}/>)}
    </div>
  );
}
