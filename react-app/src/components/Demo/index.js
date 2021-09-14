import React, { useState, useEffect } from 'react'

import { DndProvider, useDrop, useDrag } from 'react-dnd'

import HTML5Backend from 'react-dnd-html5-backend'

 

import { Row, Col, Card } from 'antd'

 

function DragPanel(props) {
 

const { dragItem, handleDrag, dragProps, firstCount } = props;

 

// 定义拖拽接收组件数据

const [dustbins, setDustbins] = useState([])

 

useEffect(() => {
if (dragProps) {
setDustbins(dragProps)

}

}, [dragProps])

 

function handleDrop(data) {
// console.log(data)

handleDrag(data)

}

 

function renderItem(item) {
return dragItem(item)

}

 

// 拖拽接收组件

function Bin(props) {
 

const { list, type, title, accept, onDrop, style } = props;

 

const [more, setMore] = useState(false);

 

// 定义拖动源

const [boxes] = useState(list.map(item => {
return { dragItem: item, type: type }

}))

 

const [{ isOver, canDrop }, drop] = useDrop({
accept,

drop: onDrop,

collect: (monitor) => ({
isOver: monitor.isOver(),

canDrop: monitor.canDrop(),

}),

})

const isActive = isOver && canDrop

 

let cardStyle = { ...style }

let alertType = null

if (isActive) {
cardStyle.boxShadow = "0px 0px 12px #1890ff";

alertType = <div style={{ background: "#1890ff", textAlign: 'center', padding: 5 }}>松开鼠标拖拽至此</div>

} else if (canDrop) {
cardStyle.boxShadow = "0px 0px 12px #91d5ff";

alertType = <div style={{ background: "#91d5ff", textAlign: 'center', padding: 5 }}>可拖拽</div>

}

return (

<div ref={drop} >

<Card title={`${title}(${list.length})`} style={cardStyle}>

{canDrop ? alertType : null}

{boxes.map(({ dragItem, type }, index) => {
if (more) {
return <Box key={index} dragItem={dragItem} type={type} />

}

if (index < (firstCount ? firstCount : 5)) {
return <Box key={index} dragItem={dragItem} type={type} />

}

return

})}

{
boxes.length > (firstCount ? firstCount : 5) ?

<div style={{ width: "100%", textAlign: "center", marginTop: 20 }} >

{more ?

<a onClick={() => setMore(false)}>收起更多</a> :

<a onClick={() => setMore(true)}> 存在{boxes.length - (firstCount ? firstCount : 5)}条收起，点此展示更多</a>

}

</div> : null

}

</Card>

</div>

)

}

 

// 可拖拽组件

function Box(props) {
 

const { dragItem, type } = props;

 

const [{ opacity }, drag] = useDrag({
item: { dragItem, type },

collect: (monitor) => ({
opacity: monitor.isDragging() ? 0.4 : 1,

}),

})

return (

<div ref={drag} style={{ opacity }}>

{renderItem(dragItem ? dragItem : {})}

</div>

)

}

 

return (

<DndProvider backend={HTML5Backend}>

<Row>

<div style={{ overflow: 'hidden', clear: 'both' }}>

{dustbins.map((dustbin, index) => (

<Col key={index} span={24 / dustbins.length} style={{ padding: 10 }}>

<Bin

key={index}

list={dustbin.list}

type={dustbin.type}

style={dustbin.style}

title={dustbin.title}

accept={dustbin.accepts}

onDrop={(item) => handleDrop({ dragItem: { ...item.dragItem }, dragTarget: dustbin.type })}

/>

</Col>

))}

</div>

</Row>

</DndProvider>

)

}

export default DragPanel

 

 

2、使用组件

 

import React from 'react'

import DragPanel from './index'

 

const ItemTypes = {
NEW: 'new',

DEAL: 'dear',

FINISH: 'finish',

}

 

function DragDemo(props) {
 

const taskList = {
new: [

{ id: 1, name: "11111" },

{ id: 2, name: "11111222" },

{ id: 3, name: "11111333" }

],

dear: [

{ id: 4, name: "1111144" },

{ id: 5, name: "1111122255" },

{ id: 6, name: "1111133366" },

{ id: 7, name: "111114477" },

{ id: 8, name: "11111222558" },

],

finish: [

{ id: 9, name: "1111144999" },

{ id: 10, name: "1111122251110" },

]

}

 

const dragProps = [

{
accepts: [], //接收拖拽类型

type: ItemTypes.NEW, //列表数据类型

style: { background: '#EDF5D0' },

title: "待办",

list: taskList[ItemTypes.NEW], //列表数据

},

{
accepts: [ItemTypes.NEW],

type: ItemTypes.DEAL,

title: "处理中",

style: { background: '#F5EED0' },

list: taskList[ItemTypes.DEAL]

},

{
accepts: [ItemTypes.NEW, ItemTypes.DEAL],

type: ItemTypes.FINISH,

title: "结束",

list: taskList[ItemTypes.FINISH]

},

]

 

function handleDrag(data) {
console.log(data)

}

 

function dragItem(props) {
return props.name

}

 

return <DragPanel dragProps={dragProps} handleDrag={handleDrag} dragItem={dragItem} />

}

 

export default DragDemo
