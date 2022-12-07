import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';


export type ChangeFilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
  todolistId: string
  title: string
  filter: ChangeFilterType
}

function App() {

  const [todolists, setTodolists]=useState<TodolistType[]>([
    {todolistId: v1(), title: "What to learn?", filter: 'all'},
    {todolistId: v1(), title: "What to buy?", filter: 'all'}
  ])

  const [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false}
  ])

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }
  const addTask = (newTitle: string) => {
    setTasks([{id: v1(), title: newTitle, isDone: false}, ...tasks])
  }
const changeTaskStatus=(taskId: string,value:boolean)=>{
    setTasks(tasks.map(t=>t.id===taskId?{...t,isDone:value}:t))
}

  const [filter, setFilter] = useState<ChangeFilterType>('all')

  const changeFilter = (value: ChangeFilterType) => {
    setFilter(value)
  }
  let tasksForTodolist = tasks
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }


  return (
    <div className="App">
      <Todolist
        title='What to learn?'
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
      />

    </div>
  );
}

export default App;

