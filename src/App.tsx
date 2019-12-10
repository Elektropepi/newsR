import React from 'react';
import './App.scss';
import {mockServer} from "./testData/testDataGenerator";
import {GroupDetail} from "./group/GroupDetail";

const App: React.FC = () => {
  return (
    <div className="app">
      <header></header>
      <div>
        <GroupDetail group={mockServer().groups[0]} />
      </div>
    </div>
  );
};

export default App;
