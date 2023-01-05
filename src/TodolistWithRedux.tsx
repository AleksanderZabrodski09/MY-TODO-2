import React, {memo, useCallback} from 'react';
import {InputForm} from './components/InputForm';
import {EditableSpan} from './components/EditableSpan';
import {Button} from '@mui/material';
import PlaylistRemoveRoundedIcon from '@mui/icons-material/PlaylistRemoveRounded';
import {TodolistType} from './AppWithRedux';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootReducerType} from './state/store';
import {addTaskAC} from './state/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer';
import {Task} from './components/Task';
import {ButtonUC} from './ButtonUC';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type PropsType = {
  todolist: TodolistType
}
export const TodolistWithDispatch = memo(({todolist}: PropsType) => {
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
  const changeTodolistTitleHandler = useCallback((title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title))
  },[dispatch])


  const addTaskHandler = useCallback((newTitle: string) => {
    dispatch(addTaskAC(todolistId, newTitle))
  },[todolistId])


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
              key={t.id}
              task={t}
              todolistId={todolistId}
            />
          )
        })
      }
    </div>
    <div>
      <ButtonUC
        title={'All'}
        onClick={allChangeFilterTasks}
        variant={filter === 'all' ? 'outlined' : 'text'}
        color={'secondary'}
        size={'small'}
      />
      {/*<Button onClick={allChangeFilterTasks}*/}
      {/*  // className={props.filter === 'all' ? 'activeFilter' : 'buttonFilter'}*/}
      {/*        className='buttonFilter'*/}
      {/*       */}
      {/*>All*/}
      {/*</Button>*/}
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
})


