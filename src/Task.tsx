import {CheckBox} from './components/CheckBox';
import {EditableSpan} from './components/EditableSpan';
import {Button} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React from 'react';
import {TaskType} from './TodolistWithRedux';

export const Task = ({
                       task,
                       removeTask,
                       onChangeTaskStatusHandler,
                       changeTaskTitleHandler
                     }: { task: TaskType, removeTask: (tID: string) => void, onChangeTaskStatusHandler: (tID: string, eValue: boolean) => void, changeTaskTitleHandler: (tID: string, title: string) => void }) => {


  return <div key={task.id} className={task.isDone ? 'isCompleted' : ''}>
    <CheckBox checked={task.isDone} callBack={(eValue) => onChangeTaskStatusHandler(task.id, eValue)}/>
    <EditableSpan value={task.title} callback={(newTitle) => changeTaskTitleHandler(task.id, newTitle)}/>
    <Button
      onClick={() => removeTask(task.id)}
      color='secondary'
    ><HighlightOffIcon/>
      {/*✖*/}
      ️</Button>
  </div>
}