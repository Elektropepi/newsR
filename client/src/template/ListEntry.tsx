import React from "react";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ListType} from "./List";

export function ListEntry<T extends ListType<T>>(props: {
  entry: T
}) {
  const {entry} = props;
  const history = useHistory();

  function onPress() {
    if(entry.onPress) {
      entry.onPress(entry);
    }
    if(entry.url) {
      history.push(entry.url);
    }
  }

  return (
    <div onClick={onPress}>
      <div className={"list-entry"}>
        {entry.icon &&
        <div className="float">
          <FontAwesomeIcon icon={entry.icon}/>
        </div>
        }
        <div className="list-entry-text">
          <span className={"title" + (entry.bold ? " bold" : "")}>{entry.title}</span><br/>
          <span className={"subtitle" + (entry.bold ? " bold" : "")}>{entry.subtitle}</span>
        </div>
      </div>
    </div>

  )
}
