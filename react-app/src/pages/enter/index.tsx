import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.module.less';


function Enter() {
  
  return (
    <div className={style.container}>
        <div className={style.enter}>
          <a href="/main"> Start App</a>
        </div>
    </div>
  );   
}

export default Enter;