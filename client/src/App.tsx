import React, {ReactNode} from 'react';
import './App.scss';
import {GroupDetail} from "./group/GroupDetail";
import {Route, Switch} from "react-router-dom"
import {Root} from "./startPage/Root";
import {Post} from "./post/Post";


export default class App extends React.Component {
  render(): ReactNode {
    return (
      <div className="app">
        <Switch>
          <Route path="/groups/:name" component={GroupDetail}/>
          <Route path="/post/:name/:number?" component={Post}/>
          <Route path="/" component={Root}/>
        </Switch>
      </div>
    );
  }
};
