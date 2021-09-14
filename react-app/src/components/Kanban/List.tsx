import React,{useImperativeHandle} from 'react';
import ReactDOM from 'react-dom';
import style from './style.module.less';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import {useLocalObservable, useObserver, Observer} from 'mobx-react'
import { store } from "./store/store";
//引入组件
import Card from './Card'

interface Props{
    title?:string
    canAdd?:boolean
    get_oldTask?:any
    onRef?:any
}

interface Item {
    title?:string,
    content?:string,
    mark?:number
}



const Kanban:React.FC<Props>=(props)=>{
    // const {title,add_item}=props;
    const [routine,setRoutine]=React.useState([]);
    let localStore = useLocalObservable(() => store);
    useImperativeHandle(props.onRef,()=>{
        return {
            del_oldTask:del_oldTask
        }
    })

    React.useEffect(() => {
        
    }, [])

    //事件函数
    function addTask(e:any){
        let id=new Date().getTime();
        let obj:Item={};
        obj.title="Nothing";
        obj.content="no detail";
        obj.mark=id;
        routine.push(obj);
        let newData=JSON.parse(JSON.stringify(routine));
        setRoutine(newData);
    }

    function changeTask(obj:object){
        for(let i=0;i<routine.length;i++){
            if(routine[i].mark===obj.mark){
                routine[i]=obj;
                break;
            }
        }
    }

    function accept_newTask(obj:object,father:string) {
        console.log('从'+father+'进入'+props.title)
        if(father==props.title){
            return console.log('没有发生变动')
        }else{
            //发生变动
            console.log('发生变动')
            obj.title=store.title;
            obj.content=store.content;
            routine.push(obj);
            let newData=JSON.parse(JSON.stringify(routine));
            setRoutine(newData);
            //通知之前的list删除该项
            props.get_oldTask(obj,father)
        }

    }

    function del_oldTask(father:string,obj:object){
        if(props.title==father){
            console.log(`${props.title}收到了删除命令`);
            for(let i=0;i<routine.length;i++){
                if(routine[i].mark==obj.mark){
                    routine.splice(i,1);
                    let newData=JSON.parse(JSON.stringify(routine));
                    setRoutine(newData);
                    return;
                }
            }
        }
    }


    // 第一个参数是 collect 方法返回的对象，第二个参数是一个 ref 值，赋值给 drop 元素
    const [, droper] = useDrop({
        // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
        accept: 'Card',
        // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
        collect: (minoter: DropTargetMonitor) => ({
            // isOver: minoter.isOver()
        }),
        canDrop:(item, monitor)=>{
            return true
        },
        drop:(item, monitor)=>{
            console.log(item)
            accept_newTask(item,item.father);
            return item
        }
    })

    return(
        <div ref={droper} className={style.list}>
            <div className={style.list_title}>{props.title}</div>
            {props.canAdd?<div onClick={addTask} className={style.list_add}>{'>>'}Add a task{'<<'}</div>:''}
            <div className={style.list_content}>
                {
                    routine.map((item:Item)=>{
                        return <Card 
                                    key={item.mark} 
                                    father={props.title}
                                    changeTask={changeTask.bind(this)}
                                    data={item}
                                />
                    })
                }
            </div>
        </div>
    )
    
}

export default Kanban;