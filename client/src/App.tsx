import React, {ReactNode} from 'react';
import './App.scss';
import {GroupDetail} from "./group/GroupDetail";
import {Switch, Route, Link} from "react-router-dom"


export default class App extends React.Component {
  render(): ReactNode {
    return (
      <Switch>
        <Route path="/groups/:name" component={GroupDetail}/>
        <Route path="/">
          <h1><Link to="/groups/tu-graz.lv.iaweb">Go to IAWEB Newsgroup</Link></h1>
          <h1><Link to="/groups/tu-graz.lv.it-sicherheit">Go to IT Sec Newsgroup</Link></h1>
          <h1><Link to="/groups/tu-graz.lv.vt">Go to VT Newsgroup</Link></h1>
        </Route>
      </Switch>
    );
  }
};
