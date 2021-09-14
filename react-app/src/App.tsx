import React from 'react';
import logo from './logo.svg';
import './App.module.less';
import { BrowserRouter, Switch, Route, Redirect, Router } from 'react-router-dom'

//引入pages组件
import Enter from './pages/enter';
import Main from './pages/main';
import Test from './components/Test'
import Kanban from './components/Kanban'

function App() {
  return (
    <div className="App">
      <Kanban/>
    </div>
  );
}

export default App;
