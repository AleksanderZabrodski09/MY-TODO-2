import React, {ChangeEvent, useState,KeyboardEvent} from 'react';
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
  changeFilter: (value: ChangeFilterType) => void
  addTask: (newTitle: string) => void
}
export const Todolist: React.FC<TodolistType> = (props) => {

  const [newTitle, setNewTitle] = useState('')

  const addTaskHandler = () => {
    if (newTitle.trim() !== '') {
      props.addTask(newTitle.trim())
      setNewTitle('')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
 const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
if(e.key==='Enter'){
  addTaskHandler()
}
  }

  const allClickFilter = () => props.changeFilter('all')
  const activeClickFilter = () => props.changeFilter('active')
  const completedClickFilter = () => props.changeFilter('completed')


  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTitle}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
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
        <button onClick={activeClickFilter}>Active</button>
        <button onClick={completedClickFilter}>Completed</button>
      </div>
    </div>
  )
}