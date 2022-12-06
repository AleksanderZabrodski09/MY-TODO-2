import React, {ChangeEvent, useState} from 'react';
import {ChangeFilterType} from './App';


export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistType = {
  title: string
  tasks: TasksType[]
  removeTask: (taskId: string) => void
  changeFilter:(value:ChangeFilterType)=>void
  addTask:(newTitle:string)=>void
}
export const Todolist: React.FC<TodolistType> = (props) => {

const [newTitle, setNewTitle]=useState('')

  const addTaskHandler=()=>{
  if(newTitle.trim()!=='')
    props.addTask(newTitle.trim())
    setNewTitle('')
  }

  const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    setNewTitle(e.currentTarget.value)

  }

  const allClickFilter=()=>{
    props.changeFilter('all')
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTitle} onChange={onChangeHandler}/>
        <button onClick={addTaskHandler}>+</button>
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