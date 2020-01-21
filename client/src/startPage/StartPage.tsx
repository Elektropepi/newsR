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
import {Route, Switch} from "react-router-dom";

interface StartPageState {
  groups: Group[],
  filterText: string,
  subscribedGroupsName: string[]
}

export function StartPage() {
  const [state, setState] = useState<StartPageState>({
    groups: [],
    filterText: "",
    subscribedGroupsName: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const server = await Server.instance();
      const groups = await server.groups();
      const subscribedGroupsName = getSubscribedGroups();
      setState({
        ...state,
        groups,
        subscribedGroupsName
      });

      setLoading(false)
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  const filter = (filterText: string) => {
    setState({...state, filterText})
  }

  const changeSubscriptionState = (group: { title: string }) => {
    if (isGroupSubscribed(group.title)) {
      unsubscribeGroup(group.title);
    } else {
      subscribeGroup(group.title);
    }
    const subscribedGroupsName = getSubscribedGroups();
    setState({...state, subscribedGroupsName})
  }

  const groupIcon = (group: Group): IconProp => {
    if (isGroupSubscribed(group.name))
      return "minus-square" as IconProp;

    return "plus-square" as IconProp
  }

  const manageButton: Button = {
    name: "Manage groups",
    icon: "cog",
    url: "/groups-manage"
  };

  const subscriptionButton: Button = {
    name: "Subscriptions",
    icon: "filter",
    url: "/"
  };

  const allGroupsButton: Button = {
    name: "All Groups",
    icon: "filter",
    url: "/groups"
  };

  const groupButtons: Button[] = [manageButton, subscriptionButton];

  const subscriptionButtons: Button[] = [manageButton, allGroupsButton];

  const manageButtons: Button[] = [allGroupsButton, subscriptionButton];

  const isGroupFiltered = (group: Group) => {
    const {filterText} = state;
    if(filterText === "") {
      return true;
    }
    return (group.name.toLowerCase().includes(filterText) || group.description.toLowerCase().includes(filterText));
  }

  const isGroupSubscribed = (groupName: string) => {
    return state.subscribedGroupsName.includes(groupName);
  }

  const getGroups = (isSubscription?: boolean): Group[] => {
    return state.groups.filter(group => isGroupFiltered(group) && (isSubscription !== true || isGroupSubscribed(group.name)));
  } ;

  return (
    <div className="app-grid">
      <Helmet>
        <title>newsR - news.tugraz.at</title>
      </Helmet>
      <Switch>
        <Route path="/groups">
          <Header name={"news.tugraz.at"} searchBar={{filter}} buttons={groupButtons}/>
        </Route>
        <Route path="/groups-manage">
          <Header name={"news.tugraz.at"} searchBar={{filter}} buttons={manageButtons}/>
        </Route>
        <Route path="/">
          <Header name={"news.tugraz.at"} searchBar={{filter}} buttons={subscriptionButtons}/>
        </Route>
      </Switch>
      <div className="app-grid-body">
        <Switch>
          <Route path="/groups">
            <List data={getGroups().map((group) => ({
              title: group.name,
              subtitle: group.description,
              url: `/groups/${group.name}`
            }))}/>
          </Route>
          <Route path="/groups-manage">
            <List data={getGroups().map((group) => ({
              title: group.name,
              subtitle: group.description,
              url: "",
              onPress: changeSubscriptionState,
              icon: groupIcon(group)
            }))}/>
          </Route>
          <Route path="/">
            <List data={getGroups(true).map((group) => ({
              title: group.name,
              subtitle: group.description,
              url: `/groups/${group.name}`
            }))}/>
          </Route>
        </Switch>

      </div>
      <Footer/>
    </div>
  )
}




