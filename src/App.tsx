import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type changeFilterType= 'all'|'active'|'completed'




function App() {

const [tasks, setTasks] = useState([
  { id: 1, title: "HTML&CSS", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "ReactJS", isDone: false },
  { id: 4, title: "ReactTS", isDone: true },
  { id: 5, title: "TS", isDone: false }
])

const removeTask=(taskId:number)=>{
  setTasks(tasks.filter(t=>t.id!==taskId))
}

const [filter,setFilter]=useState<changeFilterType>('all')

  let tasksForTodolist = tasks
  if(filter==='active'){
    tasksForTodolist = tasks.filter(t=>t.isDone === true)
  }
  if(filter==='active'){
    tasksForTodolist = tasks.filter(t=>t.isDone === false)
  }
const changeFilter=(value:changeFilterType)=>{
  console.log('filter')
    setFilter(value)
}

  return (
        <div className="App">
          <Todolist
            title='What to learn'
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
          />
        </div>
    );
}

export default App;

