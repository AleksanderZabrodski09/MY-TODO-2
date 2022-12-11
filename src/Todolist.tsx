import React from 'react';
import {ChangeFilterType} from './App';
import {CheckBox} from './components/CheckBox';
import {InputForm} from './components/InputForm';
import {EditableSpan} from './components/EditableSpan';


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
  changeFilter: (todolistId: string, value: ChangeFilterType) => void
  changeTaskStatus: (todolistId: string, taskId: string, value: boolean) => void
  filter: ChangeFilterType
  removeTodolist: (todolistId: string) => void
  changeTaskTitle:(todolistId: string, taskId: string, title: string)=>void
}
export const Todolist: React.FC<TodolistType> = (props) => {

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistId)
  }

  const addTaskHandler = (newTitle: string) => {
    props.addTask(props.todolistId, newTitle)
  }
  const removeTaskHandler = (tID: string) => {
    props.removeTask(props.todolistId, tID)
  }
  const onChangeTaskStatusHandler = (tID: string, eValue: boolean) => {
    props.changeTaskStatus(props.todolistId, tID, eValue)
  }
 const changeTaskTitleHandler=(tID:string, title:string)=>{
    props.changeTaskTitle(props.todolistId, tID, title)
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
            <EditableSpan value={t.title} callback={(newTitle)=>changeTaskTitleHandler(t.id,newTitle)}/>
            {/*<span>{t.title}</span>*/}
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


