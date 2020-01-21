import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {HashRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faChevronDown,
  faChevronRight,
  faHandPointRight,
  faHome,
  faReply,
  faSpinner,
  faPencilAlt,
  faCog,
  faMinusSquare,
  faPlusSquare,
  faList
} from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner);
library.add(faHome);
library.add(faReply);
library.add(faHandPointRight);
library.add(faChevronRight);
library.add(faChevronDown);
library.add(faPencilAlt);
library.add(faCog);
library.add(faMinusSquare);
library.add(faPlusSquare);
library.add(faList);
ReactDOM.render(
  <HashRouter basename={process.env.REACT_APP_BASE_URL}>
    <App/>
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
