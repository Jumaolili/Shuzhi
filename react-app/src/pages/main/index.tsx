import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.module.less';


//引入组件
import Bar from '../../components/Bar'

function Main() {
  
  return (
      <div className={style.container}>
        <div className={style.container_bar}><Bar color={'#EEDCDC'} add_item={true} title={'Prepare to study'}/></div>
        <div className={style.container_bar}><Bar color={'#9CD28E'} add_item={false} title={'Learning to study'}/></div>
        <div className={style.container_bar}><Bar color={'#DDDDDD'} add_item={false} title={'Complete...'}/></div>
      </div>

  );   
}

export default Main;