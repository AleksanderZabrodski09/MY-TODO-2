import React from 'react';
import {changeFilterType} from './App';
import {CheckBox} from './CheckBox';
import {InputForm} from './InputForm';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodolistType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  addTask: (todolistId: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, value: changeFilterType) => void
  changeTaskStatus: (todolistId: string, taskId: string, value: boolean) => void
  filter: changeFilterType
  removeTodolist: (todolistId: string) => void
}
export const Todolist: React.FC<TodolistType> = (props) => {

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistId)
  }

  const addTaskHandler = (newTitle:string) => {
   props.addTask(props.todolistId, newTitle)
  }
  const removeTaskHandler = (tID: string) => {
    props.removeTask(props.todolistId, tID)
  }
  const onChangeTaskStatusHandler = (tID: string, eValue: boolean) => {
    props.changeTaskStatus(props.todolistId, tID, eValue)
  }




  const allChangeFilterTasks = () => props.changeFilter(props.todolistId, 'all')
  const activeChangeFilterTasks = () => props.changeFilter(props.todolistId, 'active')
  const completedChangeFilterTasks = () => props.changeFilter(props.todolistId, 'completed')


  return <div>
    <h3>
      {props.title}
      <button onClick={removeTodolistHandler}>✖</button>
    </h3>

            <InputForm addInput={addTaskHandler}/>
    <ul>
      {
        props.tasks.map(t => {


          return <li key={t.id} className={t.isDone ? 'isCompleted' : ''}>
            <CheckBox checked={t.isDone} callBack={(eValue) => onChangeTaskStatusHandler(t.id, eValue)}/>
            <span>{t.title}</span>
            <button onClick={() => removeTaskHandler(t.id)}>✖️</button>
          </li>
        })
      }
    </ul>
    <div>
      <button onClick={allChangeFilterTasks}
              className={props.filter === 'all' ? 'activeFilter' : 'buttonFilter'}>All
      </button>
      <button onClick={activeChangeFilterTasks}
              className={props.filter === 'active' ? 'activeFilter' : 'buttonFilter'}>Active
      </button>
      <button onClick={completedChangeFilterTasks}
              className={props.filter === 'completed' ? 'activeFilter' : 'buttonFilter'}>Completed
      </button>
    </div>
  </div>
}

