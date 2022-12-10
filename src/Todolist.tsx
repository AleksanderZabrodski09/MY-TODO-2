import React from 'react';
import {ChangeFilterType} from './App';
import {CheckBox} from './componets/CheckBox';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button} from '@mui/material';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';


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
  changeTodolistTitle: (todolistId: string, title: string) => void
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
  const changeTodolistTitleHandler = (title: string) => {
    props.changeTodolistTitle(props.todolistId, title)
  }

  const allClickFilter = () => props.changeFilter(props.todolistId, 'all')
  const activeClickFilter = () => props.changeFilter(props.todolistId, 'active')
  const completedClickFilter = () => props.changeFilter(props.todolistId, 'completed')


  return (
    <div>
      <h3>
        <EditableSpan value={props.title} callBack={changeTodolistTitleHandler}/>
        {/*{props.title}*/}
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
                  callBack={(newTitle) => changeTaskTitle(t.id, newTitle)}/>
                <Button
                  size='small'
                  onClick={() => removeTaskHandler(t.id)}>
                  <RemoveCircleTwoToneIcon/></Button>
              </li>)
          })
        }

      </ul>
      <div>
        <Button
          onClick={allClickFilter}
          // className={props.filter === 'all' ? 'activeFilter' : 'filterButton'}
          variant={props.filter === 'all' ? 'contained' : 'outlined'}
          color='error' size='small'
        >All
        </Button>
        <Button
          onClick={activeClickFilter}
          variant={props.filter === 'active' ? 'contained' : 'outlined'} color='error' size='small'
        >Active
        </Button>
        <Button
          onClick={completedClickFilter}
          variant={props.filter === 'completed' ? 'contained' : 'outlined'} color='error' size='small'

        >Completed
        </Button>
      </div>
    </div>
  )
}


