import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.module.less';
import { useDrag } from 'react-dnd';
import { DragSource } from 'react-dnd';
import {store} from '../../store/store';
import {useLocalObservable, useObserver, Observer} from 'mobx-react'

interface Content{
    content?:string,
    remove?:any,
    index?:number,
    changeValue?:any,
    delete?:any
}


const Bar_Item:React.FC<Content>=(props)=>{
    const [content,setContent]=React.useState(props.content);
    const [index,setIndex]=React.useState(props.index)
    let localStore = useLocalObservable(() => store);
    const changeValue=(str:string)=>{
        props.changeValue(index,str)
    }
    const changeContent=(e:any)=>{
        setContent(e.target.value);
        changeValue(e.target.value);
        // console.log(content);
        localStore.setContent(e.target.value);
    }
    const Delete=()=>{
        props.delete(index);
    }
    
    
    const changeState=(e:any)=>{
        //console.log(e.target.value)
        setContent(e.target.value);
        localStore.setContent(e.target.value);
    }

    const remove=()=>{
        props.remove(localStore.content,index);
    }

    // 使用 useDrag
    const [, drager] = useDrag(
        ()=>({
            type:'Bar_Item',
            item:{type:'Bar_Item',content:content,index:index},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            
            }),
            end:(item, monitor)=>{
                //console.log(localStore.content)
                // console.log(item)
                remove();
            }
        })
    )
    
    
     
    return(
        <div ref={drager} className={style.container}>
            <input className={style.input} value={content} type="text" onClick={(e)=>{changeState(e)}} onChange={(e)=>{changeContent(e)}}  placeholder={content}/>
            <div className={style.delete} onClick={(e)=>{Delete()}}>X</div>
        </div>
    )
    
}

export default Bar_Item;