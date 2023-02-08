import {CheckBox} from './CheckBox';
import {EditableSpan} from './EditableSpan';
import {Button} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React, {memo} from 'react';

import {useDispatch} from 'react-redux';
import {
  changeTasksStatusAC,
  changeTasksTitleAC,
  removeTaskAC,
  removeTaskTC,
  updateTaskTC
} from '../state/tasks-reducer';
import {TaskStatuses, TaskType} from '../api/todolist-api';
import {AppDispatch} from '../state/store';



export const Task = memo(({task, todolistId}: { task: TaskType, todolistId:string }) => {

  const dispatch = AppDispatch()
  const {id, title, status}= task

  const removeTaskHandler=()=>{
    dispatch(removeTaskTC(todolistId,id))
  }
  const changeTasksStatus=(eValue:boolean) => {
    // dispatch(changeTasksStatusAC(todolistId, id, eValue ? TaskStatuses.Completed : TaskStatuses.New))
    dispatch(updateTaskTC(todolistId, id, eValue ? TaskStatuses.Completed : TaskStatuses.New))
  }

  return <div  className={status ? 'isCompleted' : ''}>
    <CheckBox checked={status === TaskStatuses.Completed} callBack={changeTasksStatus}/>
    <EditableSpan value={title} callback={(newTitle) => dispatch(changeTasksTitleAC(todolistId,id, newTitle))}/>
    <Button
      onClick={removeTaskHandler}
      color='secondary'
    ><HighlightOffIcon/>
      {/*✖*/}
      ️</Button>
  </div>
})