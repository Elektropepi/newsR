import React, {useEffect, useState} from "react";
import {Server} from "../server/Server";
import {List} from "../template/List";
import {Loading} from "../template/Loading";
import {Group} from "../group/Group";
import {Helmet} from "react-helmet"
import {Button, Header} from "../template/Header";
import {Footer} from "../template/Footer";

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
      (group) => group.name.toLowerCase().includes(text) || group.description.toLowerCase().includes(text)
    )
    setState({...state, filteredGroups})
  }

  const buttons: Button[] = [
    {
      name: "Manage groups",
      icon: "cog",
      onPress: () => {}
    },
    {
      name: "All groups",
      icon: "filter",
      onPress: () => {}
    }
  ]

  return (
    <div className="app-grid">
      <Helmet>
        <title>newsR - news.tugraz.at</title>
      </Helmet>
      <Header name={"Welcome to news.tugraz.at"} searchBar={{filter}} buttons={buttons}/>
      <div className="app-grid-body">
        <List data={state.filteredGroups.map((group) => ({
          title: group.name,
          subtitle: group.description,
          url: `/groups/${group.name}`
        }))}/>
      </div>
      <Footer/>
    </div>
  )
}




