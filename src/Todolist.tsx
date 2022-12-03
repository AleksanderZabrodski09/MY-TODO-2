import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {changeFilterType} from './App';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodolistType = {
  title: string
  tasks: TaskType[]
  addTask: (title: string) => void
  removeTask: (taskId: string) => void
  changeFilter: (value: changeFilterType) => void
  changeTaskStatus: (taskId: string, value: boolean) => void
}
export const Todolist: React.FC<TodolistType> = (props) => {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<null | string>(null)

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(title.trim())
      setTitle('')
    } else {
      setError('Title required')
    }
  }
  const removeTaskHandler = (tID: string) => {
    props.removeTask(tID)
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

  const allChangeFilterTasks = () => props.changeFilter('all')
  const activeChangeFilterTasks = () => props.changeFilter('active')
  const completedChangeFilterTasks = () => props.changeFilter('completed')


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


          return <li key={t.id}>
            <input
              type="checkbox"
              checked={t.isDone}
              onChange={(e) => onChangeTaskStatusHandler(t.id, e.currentTarget.checked)}
            />
            <span>{t.title}</span>
            <button onClick={() => removeTaskHandler(t.id)}>✖️</button>
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