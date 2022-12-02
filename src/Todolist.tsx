import React from 'react';
import {changeFilterType} from './App';


type TaskType = {
  id: number
  title: string
  isDone: boolean
}
type TodolistType = {
  title: string
  tasks: TaskType[]
  removeTask:(taskId:number)=>void
  changeFilter:(value:changeFilterType)=>void
}
export const Todolist: React.FC<TodolistType> = (props) => {

  const removeTaskHandler=(tID:number)=>{
    props.removeTask(tID)
  }

  const allChangeFilterTasks=()=> props.changeFilter('all')
  const activeChangeFilterTasks=()=> props.changeFilter('active')
  const completedChangeFilterTasks=()=> props.changeFilter('completed')


  return <div>
    <h3>{props.title}</h3>
    <div>
      <input/>
      <button>+</button>
    </div>
    <ul>
      {
        props.tasks.map(t=>{

          return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
            <button onClick={()=>removeTaskHandler(t.id)}>✖️</button>
          </li>
        })
      }
    </ul>
    <div>
      <button onClick={allChangeFilterTasks}>All</button>
      <button onClick={activeChangeFilterTasks}>Active</button>
      <button onClick={completedChangeFilterTasks}>Completed</button>
    </div>
  </div>
}