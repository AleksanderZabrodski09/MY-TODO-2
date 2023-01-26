import {CheckBox} from './CheckBox';
import {EditableSpan} from './EditableSpan';
import {Button} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React, {memo} from 'react';

import {useDispatch} from 'react-redux';
import {changeTasksStatusAC, changeTasksTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {TaskStatuses, TaskType} from '../api/todolist-api';



export const Task = memo(({task, todolistId}: { task: TaskType, todolistId:string }) => {

  const dispatch = useDispatch()
  const {id, title, status}= task

  return <div  className={status ? 'isCompleted' : ''}>
    <CheckBox checked={status === TaskStatuses.Completed} callBack={(eValue) => dispatch(changeTasksStatusAC(todolistId,id, eValue ? TaskStatuses.Completed :TaskStatuses.New))}/>
    <EditableSpan value={title} callback={(newTitle) => dispatch(changeTasksTitleAC(todolistId,id, newTitle))}/>
    <Button
      onClick={() => dispatch(removeTaskAC(todolistId,id))}
      color='secondary'
    ><HighlightOffIcon/>
      {/*✖*/}
      ️</Button>
  </div>
})