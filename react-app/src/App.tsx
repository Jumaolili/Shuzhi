import React from 'react';
import logo from './logo.svg';
import './App.module.less';
import { BrowserRouter, Switch, Route, Redirect, Router } from 'react-router-dom'

//引入pages组件
import Enter from './pages/enter';
import Main from './pages/main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Nav /> */}
        <div className='container'>
          {/* 根据URL路径匹配路由组件，渲染到该位置 */}
          <Switch>
            <Route path='/enter' exact component={Enter} />
            <Route path='/main' exact component={Main} />
            {/* <Route path='/addCapsule' component={} /> */}
            {/* 这是一个默认页面，如果前面的路由都没有被匹配到，就会渲染这个组件，相当于404，一定要放到最后 */}
            <Redirect from="/" to="/enter" exact></Redirect>
          </Switch>
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
