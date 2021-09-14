import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.module.less';
import img_icon from '../../imgs/addBtn.png';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import {useLocalObservable, useObserver, Observer} from 'mobx-react'

//引入组件

interface Props{

}


const Test:React.FC<Props>=(props)=>{
    // const {title,add_item}=props;
    // const [name,setName]=React.useState(title);

    React.useEffect(() => {
        
    }, [])


    return(
        <div>
            hello {props.children}
        </div>
    )
    
}

export default Test;