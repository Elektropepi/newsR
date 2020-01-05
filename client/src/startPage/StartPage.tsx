import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Server} from "../server/Server";
import {List} from "../template/List";
import {Loading} from "../template/Loading";
import {Group} from "../group/Group";

interface StartPageState {
  groups: Group[]
}

export function StartPage() {
  const [state, setState] = useState<StartPageState>({
    groups: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const server = await Server.instance();
      const groups = await server.groups();
      setState({groups})

      setLoading(false)
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  return (
    <div>
      <div className="header">
        <h1>Welcome to news.tugraz.at</h1>
      </div>
      <List data={state.groups.map((group) => ({
        title: group.name,
        subtitle: group.description,
        url: `/groups/${group.name}`
      }))}/>
    </div>
  )
}




