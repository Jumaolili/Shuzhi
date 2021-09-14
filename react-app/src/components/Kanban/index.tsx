import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.module.less';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import {useLocalObservable, useObserver, Observer} from 'mobx-react'

//引入组件
import List from './List'

interface Props{

}


const Kanban:React.FC<Props>=(props)=>{
    let list_1=React.createRef();
    let list_2=React.createRef();
    let list_3=React.createRef();
    //事件处理函数
    function get_oldTask(obj:object,father:string) {
        console.log(`应该删除${father}里的${obj}`);
        let task={
            title:obj.title,
            content:obj.content,
            mark:obj.mark
        }
        list_1.current.del_oldTask(father,task);
        list_2.current.del_oldTask(father,task);
        list_3.current.del_oldTask(father,task);
    }


    React.useEffect(() => {
        
    }, [])



    return(
        <div className={style.kanban}>
            <div className={style.kanban_list}><List onRef={list_1} get_oldTask={get_oldTask.bind(this)} canAdd={true} title={'To Do'} /></div>
            <div className={style.kanban_list}><List onRef={list_2} get_oldTask={get_oldTask.bind(this)} title={'In Progress'} /></div>
            <div className={style.kanban_list}><List onRef={list_3} get_oldTask={get_oldTask.bind(this)} title={'Done'} /></div>
        </div>
    )
    
}

export default Kanban;