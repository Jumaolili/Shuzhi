import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.module.less';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import {useLocalObservable, useObserver, Observer} from 'mobx-react'

//引入组件


interface Props{
    
}


const Checklist:React.FC<Props>=(props)=>{
    // const {title,add_item}=props;
    let myList:string[] = []
    const [list,setList]=React.useState(myList);
    const [input,setInput]=React.useState('')

    //方法
    function changeInput(e:any) {
        setInput(e.target.value)
    }
    function addInput(e:any) {
        if(e.keyCode==13){
            list.push(input);
            setInput('')
        }
    }
    React.useEffect(() => {
        
    }, [])


    return(
        <div className={style.checklist}>
            <div className={style.checklist_content}>
                {list.map(item=>{
                    return <div><label><input type="checkbox" value={'hello'} className={style.task}/>{item}</label></div>
                })}
            </div>
            <div className={style.checklist_input}>
                <input value={input} type="text" onKeyDown={addInput} onChange={changeInput} placeholder={'Type then hit Enter to add a task'}/>
            </div>
        </div>
    )
    
}

export default Checklist;