import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.module.less';
import { useDrag, DragTargetMonitor } from 'react-dnd';
import {useLocalObservable, useObserver, Observer} from 'mobx-react';
import { store } from "./store/store";

//引入组件
import Checklist from './Checklist'

interface Item {
    title?:string,
    content?:string,
    mark?:number,
    changeTask?:any,
    father?:string
}

interface Props{
    data?:any
}



const Card:React.FC<Props>=(props)=>{
    let [show,setShow]=React.useState(true);
    let [title,setTitle]=React.useState(props.data.title);
    let [content,setContent]=React.useState(props.data.content);
    let localStore = useLocalObservable(() => store);
    //事件处理函数
    function changeShow(e:any) {
        setShow(!show)
    }
    function changeTitle(e:any) {
        setTitle(e.target.value);
    }
    function changeContent(e:any) {
        setContent(e.target.value);
    }
    function sendChange(obj:object) {
        
        //将变化的Card传回父组件
        props.changeTask({
            title:title,
            content:content,
            mark:props.data.mark
        })
    }
    function updateStore() {
        store.setTitle(title);
        store.setContent(content);
    }
    

    // 使用 useDrag
    const [, drager] = useDrag(
        ()=>({
            type:'Card',
            item:{type:'Card',title:store.title,content:store.content,mark:props.data.mark,father:props.father},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end:(item, monitor)=>{
                //console.log('end')
            },
            isDragging:(monitor)=>{
                //console.log('dragging')
            }
        })
    )

    React.useEffect(() => {
        
    }, [])


    return(
        <div ref={drager} onMouseDown={updateStore}  className={style.card}>
            <div className={style.head}>
                <span className={show?style.show_btn:style.hide_btn} onClick={changeShow}></span>
                <div className={style.title}><input  type="text" value={title} onBlur={sendChange} onChange={changeTitle}/></div>
                <div className={style.title_content}><textarea value={content} onBlur={sendChange} onChange={changeContent} name=""  id="" cols={30} rows={5}></textarea></div>
            </div>
            <div className={show?style.content:style.hide_content}>
                {/* {`title:${store.title} content:${store.content}`} */}
                <Checklist/>
            </div>
        </div>
    )
    
}

export default Card;