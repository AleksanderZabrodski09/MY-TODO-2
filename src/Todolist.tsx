import React from 'react';

import {CheckBox} from './components/CheckBox';
import {InputForm} from './components/InputForm';
import {EditableSpan} from './components/EditableSpan';
import {Button} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PlaylistRemoveRoundedIcon from '@mui/icons-material/PlaylistRemoveRounded';
import {TaskStatuses, TaskType} from './api/todolist-api';
import {ChangeFilterType} from './state/todolists-reducer';


// export type TaskType = {
//   id: string
//   title: string
//   status: TaskStatuses
// }
type TodolistType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  addTask: (todolistId: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, value: ChangeFilterType) => void
  changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
  filter: ChangeFilterType
  removeTodolist: (todolistId: string) => void
  changeTaskTitle:(todolistId: string, taskId: string, title: string)=>void
  changeTodolistTitle:(todolistId: string, title: string)=>void
}
export const Todolist: React.FC<TodolistType> = (props) => {

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistId)
  }
  const changeTodolistTitleHandler=(title:string)=>{
    props.changeTodolistTitle(props.todolistId,title)
  }
  const addTaskHandler = (newTitle: string) => {
    props.addTask(props.todolistId, newTitle)
  }
  const removeTaskHandler = (tID: string) => {
    props.removeTask(props.todolistId, tID)
  }
  const onChangeTaskStatusHandler = (tID: string, eValue: TaskStatuses) => {
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
      <EditableSpan value={props.title} callback={changeTodolistTitleHandler}/>
      <Button
        onClick={removeTodolistHandler}
        color='secondary'
      ><PlaylistRemoveRoundedIcon/></Button>
    </h3>

    <InputForm addInput={addTaskHandler}/>
    <div>
      {
        props.tasks.map(t => {

          return <div key={t.id} className={t.status === TaskStatuses.Completed ? 'isCompleted' : ''}>
            <CheckBox checked={t.status === TaskStatuses.Completed} callBack={(eValue) => onChangeTaskStatusHandler(t.id, eValue ? TaskStatuses.Completed : TaskStatuses.New)}/>
            <EditableSpan value={t.title} callback={(newTitle)=>changeTaskTitleHandler(t.id,newTitle)}/>
            <Button
              onClick={() => removeTaskHandler(t.id)}
              color='secondary'
            ><HighlightOffIcon/>
              {/*✖*/}
              ️</Button>
          </div>
        })
      }
    </div>
    <div>
      <Button onClick={allChangeFilterTasks}
              // className={props.filter === 'all' ? 'activeFilter' : 'buttonFilter'}
              className='buttonFilter'
              variant={props.filter === 'all' ? 'outlined' : 'text'}
              color='secondary'
              size='small'
      >All
      </Button>
      <Button onClick={activeChangeFilterTasks}
              className='buttonFilter'
              variant={props.filter === 'active' ? 'outlined' : 'text'}
              color='secondary'
              size='small'
      >Active
      </Button>
      <Button onClick={completedChangeFilterTasks}
              className='buttonFilter'
              variant={props.filter === 'completed' ? 'outlined' : 'text'}
              color='secondary'
              size='small'
      >Completed
      </Button>
    </div>
  </div>
}


