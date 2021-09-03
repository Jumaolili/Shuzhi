import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.module.less';
import img_icon from '../../imgs/addBtn.png';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import {store} from '../../store/store';
import {useLocalObservable, useObserver, Observer} from 'mobx-react'

//引入组件
import Bar_Item from '../Bar_Item'

interface Props{
    title?:string,
    add_item?:boolean,
    color?:string
}

interface List_item {
    content:string
}

interface Content{
    content?:string,
    remove?:any,
    index?:number,
    changeValue?:any,
    delete?:any
}


const Bar:React.FC<Props>=(props)=>{
    const {title,add_item}=props;
    const mylist:List_item[]=[];
    const [name,setName]=React.useState(title);
    const [list,setList]=React.useState(mylist);
    let localStore = useLocalObservable(() => store);

    let obj={};
    let index=0;
    let count=0;
    // let style={
    //     'pink':'backgroundColor:#DD7776',
    //     'green':'backgroundColor:#9CD28E',
    //     'grey':'backgroundColor:#9CD28E'
    // }

    let colorStyle = {
            backgroundColor: props.color
        };

    const add=()=>{
        let newList:any[]=list.map(item=>{
            return item;
        })
        newList.push({content:'',index:new Date().getTime()});
        console.log(newList)
        setList(newList)
        //console.log(newList)
    }
    const pushAdd=(obj:any)=>{
        let newList:any[]=list.map(item=>{
            return item;
        })
        newList.push({content:localStore.content,index:obj.index})
        //console.log(localStore.content)
        setList(newList)
    }
    const getObj=(str:string)=>{
        obj=JSON.parse(str)
        console.log(obj)
        pushAdd(obj)
    }

    const changeValue=(index:number,content:string)=>{
        //console.log('需要改变的index：'+index+' : '+content);
        let newList=JSON.parse(JSON.stringify(list));
        //console.log(newList==list)
        for(let i=0;i<newList.length;i++){
            if(newList[i]['index']==index){
                newList[i].content=content
            }
        }
        //console.log(newList)
    }

    const remove=(content:string,index:number)=>{
        console.log('hello !'+content+':'+index)
        setList(list.filter((item:any)=>{
            return item['index']!=index
        }))
        console.log(list)
        
    }

    const Delete=(index:number)=>{
        let newList:any[]=list.map(item=>{
            return item;
        })
        for(let i=0;i<newList.length;i++){
            if(newList[i]['index']===index){
                newList.splice(i,1);
                break
            }
        }
        console.log(newList)
        setList(newList)
    }


    // 第一个参数是 collect 方法返回的对象，第二个参数是一个 ref 值，赋值给 drop 元素
    const [collectProps, droper] = useDrop({
        // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
        accept: 'Bar_Item',
        // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
        collect: (minoter: DropTargetMonitor) => ({
            isOver: minoter.isOver()
        }),
        canDrop:(item, monitor)=>{
            return true
        },
        drop:(item, monitor)=>{
            // console.log(JSON.stringify(item));
            getObj(JSON.stringify(item));
            return item
        }
    })

    React.useEffect(() => {
        
    }, [])


    return(
        <div className={style.container}>
            <div className={style.title}  style={colorStyle}>
                <span>{title}</span>
            </div>
            <div ref={droper} className={style.content} style={colorStyle}>
                <div className={style.content_list}>
                    {
                        list.length>0?list.map((item:Content)=>{
                            return <Bar_Item remove={remove.bind(this)} changeValue={changeValue.bind(this)} delete={Delete.bind(this)} index={item.index}  content={item.content} key={count++}/>
                        }):''
                    }
                </div>
                {
                    (add_item?
                    <div className={style.add} onClick={(e:any)=>{add()}}>
                        <img className={style.add_icon} src={img_icon} alt=""/>
                    </div>
                    :'')
                }
            </div>
        </div>
    )
    
}

export default Bar;