import React, {useEffect, useState} from "react";
import {Server} from "../server/Server";
import {List} from "../template/List";
import {Loading} from "../template/Loading";
import {Group} from "../group/Group";

interface StartPageState {
  groups: Group[]
  filteredGroups: Group[]
}

export function StartPage() {
  const [state, setState] = useState<StartPageState>({
    groups: [],
    filteredGroups: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const server = await Server.instance();
      const groups = await server.groups();
      setState({groups, filteredGroups: groups})

      setLoading(false)
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  const filter = (text: string) => {
    const filteredGroups = state.groups.filter(
      (group) => group.name.toLowerCase().includes(text)
    )
    setState({...state, filteredGroups})
  }

  return (
    <div>
      <div className="header">
        <h1>Welcome to news.tugraz.at</h1>
        <input className="search" type="text" placeholder="Search..." onChange={(e) => filter(e.target.value.toLowerCase())}/>
      </div>
      <List data={state.filteredGroups.map((group) => ({
        title: group.name,
        subtitle: group.description,
        url: `/groups/${group.name}`
      }))}/>
    </div>
  )
}




