import React from 'react';
import {ChangeFilterType} from './App';
import {CheckBox} from './componets/CheckBox';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';


export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistType = {
  todolistId: string
  title: string
  tasks: TasksType[]
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, value: ChangeFilterType) => void
  addTask: (todolistId: string, newTitle: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, value: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  filter: ChangeFilterType
  removeTodolist: (todolistId: string) => void
}


export const Todolist: React.FC<TodolistType> = (props) => {


  const addTask = (newTitle: string) => {
    props.addTask(props.todolistId, newTitle)
  }
  const removeTaskHandler = (tID: string) => {
    props.removeTask(props.todolistId, tID)
  }
  const changeTaskStatus = (tID: string, eValue: boolean) => {
    props.changeTaskStatus(props.todolistId, tID, eValue)
  }
  const changeTaskTitle = (tID: string, newTitle: string) => {
    props.changeTaskTitle(props.todolistId, tID, newTitle)
  }

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistId)
  }


  const allClickFilter = () => props.changeFilter(props.todolistId, 'all')
  const activeClickFilter = () => props.changeFilter(props.todolistId, 'active')
  const completedClickFilter = () => props.changeFilter(props.todolistId, 'completed')


  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodolistHandler}>X</button>
      </h3>
      <AddItemForm addItem={addTask}/>

      <ul>
        {
          props.tasks.map(t => {

            return (

              <li key={t.id} className={t.isDone ? 'taskCompleted' : ''}>
                <CheckBox
                  checked={t.isDone}
                  callBack={(eValue) => changeTaskStatus(t.id, eValue)}/>
                <EditableSpan
                  value={t.title}
                  callBack={(newTitle)=>changeTaskTitle(t.id,newTitle)}/>
                {/*<span>{t.title}</span>*/}
                <button onClick={() => removeTaskHandler(t.id)}>x</button>
              </li>)
          })
        }

      </ul>
      <div>
        <button onClick={allClickFilter} className={props.filter === 'all' ? 'activeFilter' : 'filterButton'}>All
        </button>
        <button onClick={activeClickFilter}
                className={props.filter === 'active' ? 'activeFilter' : 'filterButton'}>Active
        </button>
        <button onClick={completedClickFilter}
                className={props.filter === 'completed' ? 'activeFilter' : 'filterButton'}>Completed
        </button>
      </div>
    </div>
  )
}


