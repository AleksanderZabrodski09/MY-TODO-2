import {CheckBox} from './components/CheckBox';
import {EditableSpan} from './components/EditableSpan';
import {Button} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React, {memo, useCallback} from 'react';
import {TaskType} from './TodolistWithRedux';
import {useDispatch} from 'react-redux';
import {changeTasksStatusAC, changeTasksTitleAC, removeTaskAC} from './state/tasks-reducer';



export const Task = memo(({task, todolistId}: { task: TaskType, todolistId:string }) => {
  console.log('Task')
// removeTask: (tID: string) => void, onChangeTaskStatusHandler: (tID: string, eValue: boolean) => void, changeTaskTitleHandler: (tID: string, title: string) => void }
  // removeTask,
  // onChangeTaskStatusHandler,
  // changeTaskTitleHandler
  const dispatch = useDispatch()
  const {id, title, isDone}= task

  return <div  className={isDone ? 'isCompleted' : ''}>
    <CheckBox checked={isDone} callBack={(eValue) => dispatch(changeTasksStatusAC(todolistId,id, eValue))}/>
    <EditableSpan value={title} callback={(newTitle) => dispatch(changeTasksTitleAC(todolistId,id, newTitle))}/>
    <Button
      onClick={() => dispatch(removeTaskAC(todolistId,id))}
      color='secondary'
    ><HighlightOffIcon/>
      {/*✖*/}
      ️</Button>
  </div>
})