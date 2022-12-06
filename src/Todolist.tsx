import React from 'react';
import {ChangeFilterType} from './App';


type TasksType = {
  id: number
  title: string
  isDone: boolean
}

type TodolistType = {
  title: string
  tasks: TasksType[]
  removeTask: (taskId: number) => void
  changeFilter:(value:ChangeFilterType)=>void
}
export const Todolist: React.FC<TodolistType> = (props) => {


  const allClickFilter=()=>{
    props.changeFilter('all')
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {
          props.tasks.map(t => {
            const removeTaskHandler = () => {
              props.removeTask(t.id)
            }
            return (

              <li key={t.id}>
                <input
                  type="checkbox"
                  checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTaskHandler}>x</button>
              </li>)

          })
        }

      </ul>
      <div>
        <button onClick={allClickFilter}>All</button>
        <button onClick={()=>props.changeFilter('active')}>Active</button>
        <button onClick={()=>props.changeFilter('completed')}>Completed</button>
      </div>
    </div>
  )
}