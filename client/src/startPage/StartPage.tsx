import React, {useEffect, useState} from "react";
import {Server} from "../server/Server";
import {List} from "../template/List";
import {Loading} from "../template/Loading";
import {Group} from "../group/Group";
import {Helmet} from "react-helmet"
import {Button, Header} from "../template/Header";
import {Footer} from "../template/Footer";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {getSubscribedGroups, subscribeGroup, unsubscribeGroup} from "../localStorage/localStorage";

interface StartPageState {
  groups: Group[]
  filteredGroups: Group[]
  subscribedGroups: Group[]
  listView: "subscribed" | "manage" | "all"
  filterText: string
}

export function StartPage() {
  const [state, setState] = useState<StartPageState>({
    groups: [],
    filteredGroups: [],
    subscribedGroups: [],
    listView: "subscribed",
    filterText: ""
  });
  const [loading, setLoading] = useState(true);

  const getSubscribtions = (groups: Group[]) => {
    const subscribedGroupsName = getSubscribedGroups();
    return  groups.filter(group => (subscribedGroupsName.find(s => s === group.name)))
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const server = await Server.instance();
      const groups = await server.groups();
      const subscribedGroups = getSubscribtions(groups);
      setState({...state, groups, filteredGroups: state.listView === "subscribed" ? subscribedGroups : groups, subscribedGroups});

      setLoading(false)
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  const filter = (filterText: string) => {
    let filteredGroups = filterGroups(filterText, state.listView)
    setState({...state, filteredGroups, filterText})
  }

  const filterGroups = (filterText: string, filterState: string) => {
    const data = filterState === "subscribed" ? state.subscribedGroups : state.groups;
    return  data.filter(
      (group) => (group.name.toLowerCase().includes(filterText) || group.description.toLowerCase().includes(filterText))
    )
  }

  const changeSubscribtionState = (group: {title: string}) => {
    if (state.subscribedGroups.find(g => g.name === group.title)) {
      unsubscribeGroup(group.title);
    } else {
      subscribeGroup(group.title);
    }
    setState({...state, subscribedGroups: getSubscribtions(state.groups)})
  }

  const groupIcon = (group : Group): IconProp | undefined => {
    if (state.listView !== "manage")
      return undefined;

    if (!!state.subscribedGroups.find(g => g.name === group.name))
      return "minus-square" as IconProp;

    return "plus-square" as IconProp
  }

  const manageButton: Button = {
      name: "Manage groups",
      icon: "cog",
      onPress: () => {
        const listView = state.listView === "manage" ? "subscribed" : "manage"
        setState({...state, listView, filteredGroups: filterGroups(state.filterText, listView)})
      }
    }

  const subscribeButton: Button = {
    name: state.listView === "subscribed" ? "All groups" : "Subscribed",
    icon: "filter",
    onPress: () => {
      const listView = state.listView === "all" ? "subscribed" : "all"
      setState({...state, listView, filteredGroups: filterGroups(state.filterText, listView)})
    }
  }

  const getButtons = (): Button[] => {
    if (state.listView === "manage")
      return [manageButton]

    return [manageButton, subscribeButton]
  }

  return (
    <div className="app-grid">
      <Helmet>
        <title>newsR - news.tugraz.at</title>
      </Helmet>
      <Header name={"news.tugraz.at"} searchBar={{filter}} buttons={getButtons()}/>
      <div className="app-grid-body">
        <List data={state.filteredGroups.map((group) => ({
          title: group.name,
          subtitle: group.description,
          url: state.listView === "manage" ? "" : `/groups/${group.name}`,
          onPress: state.listView === "manage" ? changeSubscribtionState : undefined,
          icon: groupIcon(group)
        }))}/>
      </div>
      <Footer/>
    </div>
  )
}




