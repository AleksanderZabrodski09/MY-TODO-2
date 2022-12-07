import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ChangeFilterType} from './App';
import {CheckBox} from './componets/CheckBox';


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
  changeTaskStatus: (taskId: string, value: boolean) => void
  filter: ChangeFilterType
}
export const Todolist: React.FC<TodolistType> = (props) => {

  const [newTitle, setNewTitle] = useState('')
  const [error, setError] = useState<null | string>('')

  const addTaskHandler = () => {
    if (newTitle.trim() !== '') {
      props.addTask(newTitle.trim())
      setNewTitle('')
    } else {
      setError('title is required')
    }
  }
  const removeTaskHandler = (tID: string) => {
    props.removeTask(tID)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler()
    }
      setError(null)
  }

  const changeTaskStatus = (tID: string, eValue: boolean) => {
    props.changeTaskStatus(tID, eValue)
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
          className={error ? 'error' : ''}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className='errorMessage'>{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => {

            return (

              <li key={t.id} className={t.isDone?'taskCompleted':''}>
                <CheckBox
                  checked={t.isDone}
                  callBack={(eValue) => changeTaskStatus(t.id, eValue)}/>
                <span>{t.title}</span>
                <button onClick={() => removeTaskHandler(t.id)}>x</button>
              </li>)

          })
        }

      </ul>
      <div>
        <button onClick={allClickFilter} className={props.filter==='all'? 'activeFilter':'filterButton'}>All</button>
        <button onClick={activeClickFilter} className={props.filter==='active'? 'activeFilter':'filterButton'}>Active</button>
        <button onClick={completedClickFilter} className={props.filter==='completed'? 'activeFilter':'filterButton'}>Completed</button>
      </div>
    </div>
  )
}


