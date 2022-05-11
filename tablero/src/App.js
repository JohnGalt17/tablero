import React, {useState} from 'react'

const Item =  ({title, text, disableLeft, disableRight, onMoveLeft, onMoveRight}) =>
  <div style={{width: 150, marginBottom: 10, backgroundColor: 'white'}}>
    <p>{title}</p>
    <p>{text}</p>
    <div style={{display: 'flex', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between'}}>
    {!disableLeft && <p onClick={onMoveLeft}>{'<'}</p>}
    {!disableRight && <p onClick={onMoveRight}>{'>'}</p>}
    </div>
  </div>;

const Column = ({title, items, disableLeft, disableRight, onMoveLeft, onMoveRight}) =>
<div style={{padding: 40, margin: 20, backgroundColor: 'grey'}}>
  <p style={{marginBottom: 30}}>{title}</p>
  {
    items.map( (i,position) => 
      <Item {...i} key={i.text} 
        disableLeft={disableLeft} 
        disableRight={disableRight} 
        onMoveLeft={()=>onMoveLeft(position)} 
        onMoveRight={()=>onMoveRight(position)}/>
      )
  }
</div>

const tarea1 = {title: 'Tarea1', text: '11111111111111'}
const tarea2 = {title: 'Tarea2', text: '222222222222'}
const tarea3 = {title: 'Tarea3', text: '333333333333'}


const arrayUtils = {
  removeByIndex: (array, index) =>{
    return array.filter( (_, i) => i!==index)
  },
  insert: (array, item) =>{
    const copy = [...array];
    copy.push(item);
    return copy;
  },
};

const MainContainer = () => {

  const [data, setData] = useState([
    {data: [tarea1,tarea2,tarea3], title: 'To Do'},
    {data: [], title: 'progress'},
    {data: [], title: 'Done'},
    {data: [], title: 'Extra'},
  ]);

  const onMoveRight = (taskIndex, columnIndex) => onMove(taskIndex,columnIndex, 1);
  const onMoveLeft = (taskIndex, columnIndex) => onMove(taskIndex,columnIndex, -1);

  const onMove = (taskIndex, columnIndex, direction) => {
    console.log(columnIndex, taskIndex)
    const item = data[columnIndex].data[taskIndex];

    const new0riginColumn = arrayUtils.removeByIndex(data[columnIndex].data, taskIndex);
    const newDestinationColumn = arrayUtils.insert(data[columnIndex+direction].data, item);

    const dataCopy = [...data];

    dataCopy[columnIndex].data = new0riginColumn;
    dataCopy[columnIndex+direction].data = newDestinationColumn;

    setData(
      dataCopy
    );
  };

  return <div style={{display: "flex", flexDirection: "row"}}>
    <p onClick={()=>setData([...data,{data:[], title: 'testt!'}])}>+</p>
    {
      data.map( (d,i) =>         
        <Column disableLeft={i===0} key={d.title} disableRight={i>=data.length-1}
          title={d.title}
          items={d.data} 
          onMoveRight={(itemIndex)=>onMoveRight(itemIndex,i)}
          onMoveLeft={(itemIndex)=>onMoveLeft(itemIndex,i)}
        />
      )
    }
  </div> 
}


function App() {
  return (
    <div>
      <MainContainer/>
      
    </div>
  );
}

export default App;
