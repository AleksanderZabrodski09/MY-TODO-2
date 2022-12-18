import React from 'react';
import {InputForm} from './components/InputForm';
import {EditableSpan} from './components/EditableSpan';
import {Button} from '@mui/material';
import PlaylistRemoveRoundedIcon from '@mui/icons-material/PlaylistRemoveRounded';
import {TodolistType} from './AppWithRedux';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootReducerType} from './state/store';
import {addTaskAC, changeTasksStatusAC, changeTasksTitleAC, removeTaskAC} from './state/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer';
import {Task} from './Task';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type PropsType = {
  todolist: TodolistType
}
export const TodolistWithDispatch = ({todolist}: PropsType) => {
  const {todolistId, title, filter} = todolist

  let tasks = useSelector<AppRootReducerType, TaskType[]>(store => store.tasks[todolistId])

  const dispatch = useDispatch()


  if (filter === 'active') {
    tasks = tasks.filter(t => t.isDone === true)
  }
  if (filter === 'completed') {
    tasks = tasks.filter(t => t.isDone === false)
  }

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(todolistId))
  }
  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title))
  }


  const addTaskHandler = (newTitle: string) => {
    dispatch(addTaskAC(todolistId, newTitle))

  }
  const removeTaskHandler = (tID: string) => {
    dispatch(removeTaskAC(todolistId, tID))
  }
  const onChangeTaskStatusHandler = (tID: string, eValue: boolean) => {
    dispatch(changeTasksStatusAC(todolistId, tID, eValue))
  }
  const changeTaskTitleHandler = (tID: string, title: string) => {
    dispatch(changeTasksTitleAC(todolistId, tID, title))
  }

  const allChangeFilterTasks = () => dispatch(changeTodolistFilterAC(todolistId, 'all'))
  const activeChangeFilterTasks = () => dispatch(changeTodolistFilterAC(todolistId, 'active'))
  const completedChangeFilterTasks = () => dispatch(changeTodolistFilterAC(todolistId, 'completed'))


  return <div>
    <h3>
      <EditableSpan value={title} callback={changeTodolistTitleHandler}/>
      <Button
        onClick={removeTodolistHandler}
        color='secondary'
      ><PlaylistRemoveRoundedIcon/></Button>
    </h3>

    <InputForm addInput={addTaskHandler}/>
    <div>
      {
        tasks.map(t => {

          return (
            <Task
              task={t}
              removeTask={removeTaskHandler}
              changeTaskTitleHandler={changeTaskTitleHandler}
              onChangeTaskStatusHandler={onChangeTaskStatusHandler}
            />
          )
        })
      }
    </div>
    <div>
      <Button onClick={allChangeFilterTasks}
        // className={props.filter === 'all' ? 'activeFilter' : 'buttonFilter'}
              className='buttonFilter'
              variant={filter === 'all' ? 'outlined' : 'text'}
              color='secondary'
              size='small'
      >All
      </Button>
      <Button onClick={activeChangeFilterTasks}
              className='buttonFilter'
              variant={filter === 'active' ? 'outlined' : 'text'}
              color='secondary'
              size='small'
      >Active
      </Button>
      <Button onClick={completedChangeFilterTasks}
              className='buttonFilter'
              variant={filter === 'completed' ? 'outlined' : 'text'}
              color='secondary'
              size='small'
      >Completed
      </Button>
    </div>
  </div>
}


