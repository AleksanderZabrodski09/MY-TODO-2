import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {changeFilterType} from './App';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodolistType = {
  todolistId:string
  title: string
  tasks: TaskType[]
  addTask: (todolistId:string,title: string) => void
  removeTask: (todolistId:string,taskId: string) => void
  changeFilter: (todolistId:string,value: changeFilterType) => void
  changeTaskStatus: (taskId: string, value: boolean) => void
  filter:changeFilterType
}
export const Todolist: React.FC<TodolistType> = (props) => {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<null | string>(null)

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(props.todolistId,title.trim())
      setTitle('')
    } else {
      setError('Title required')
    }
  }
  const removeTaskHandler = (tID: string) => {
    props.removeTask(props.todolistId,tID)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask()
    }
      setError('')
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onChangeTaskStatusHandler = (tID: string, eValue: boolean) => {
    props.changeTaskStatus(tID, eValue)
  }

  const allChangeFilterTasks = () => props.changeFilter( props.todolistId,'all')
  const activeChangeFilterTasks = () => props.changeFilter( props.todolistId,'active')
  const completedChangeFilterTasks = () => props.changeFilter( props.todolistId,'completed')


  return <div>
    <h3>{props.title}</h3>
    <div>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addTask}>+</button>
      {error && <div className={'errorMessage'}>{error}</div>}
    </div>
    <ul>
      {
        props.tasks.map(t => {


          return <li key={t.id}  className={t.isDone===true?'isCompleted':''}>
            <CheckBox checked={t.isDone} callBack={(eValue)=>onChangeTaskStatusHandler(t.id,eValue)}/>

            <span>{t.title}</span>
            <button onClick={() => removeTaskHandler(t.id)}>✖️</button>
          </li>
        })
      }
    </ul>
    <div>
      <button onClick={allChangeFilterTasks} className={props.filter==='all'?'activeFilter':'buttonFilter'}>All</button>
      <button onClick={activeChangeFilterTasks} className={props.filter==='active'?'activeFilter':'buttonFilter'}>Active</button>
      <button onClick={completedChangeFilterTasks} className={props.filter==='completed'?'activeFilter':'buttonFilter'}>Completed</button>
    </div>
  </div>
}


export const CheckBox=({checked,callBack}:{checked:boolean, callBack:(checked:boolean)=>void})=>{
  const callBackHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    callBack( e.currentTarget.checked)
  }
  return <input
    type="checkbox"
    checked={checked}
    // onChange={(e) => onChangeTaskStatusHandler(t.id, e.currentTarget.checked)}
    onChange={callBackHandler}
  />
}