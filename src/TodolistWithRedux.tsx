import React from 'react';
import {CheckBox} from './componets/CheckBox';
import {AddItemForm} from './componets/AddItemForm';
import {EditableSpan} from './componets/EditableSpan';
import {Button} from '@mui/material';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistsPropsType} from './AppWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from './state/todolists-reducer';

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistWithReduxType = {
  todolist: TodolistsPropsType
}


export const TodolistWithRedux = ({todolist}: TodolistWithReduxType ) => {

  const {todolistId,title,filter} = todolist
  let tasks = useSelector<AppRootStateType, TasksType[]>(state=>state.tasks[todolistId])

  const dispatch = useDispatch();

  if (filter === 'active') {
    tasks = tasks.filter(t => t.isDone === false)
  }
  if (filter === 'completed') {
    tasks = tasks.filter(t => t.isDone === true)
  }
  const removeTodolistHandler = () => {
    dispatch(RemoveTodolistAC(todolistId))
  }
  const changeTodolistTitleHandler = (title: string) => {
    dispatch( ChangeTodolistTitleAC(todolistId, title))
  }

  const addTask = (newTitle: string) => {
    dispatch(addTaskAC(todolistId, newTitle))
  }
  const removeTaskHandler = (tID: string) => {
    dispatch(removeTaskAC(todolistId, tID))
  }
  const changeTaskStatus = (tID: string, eValue: boolean) => {
    dispatch(changeTaskStatusAC(todolistId, tID, eValue))
  }
  const changeTaskTitle = (tID: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(todolistId, tID, newTitle))
  }



  const allClickFilter = () => dispatch(ChangeTodolistFilterAC(todolistId, 'all'))
  const activeClickFilter = () => dispatch(ChangeTodolistFilterAC(todolistId, 'active'))
  const completedClickFilter = () => dispatch(ChangeTodolistFilterAC(todolistId, 'completed'))




  return (
    <div>
      <h3>
        <EditableSpan value={title} callBack={changeTodolistTitleHandler}/>
        <Button onClick={removeTodolistHandler} >
          <DeleteForeverIcon/></Button>
      </h3>
      <AddItemForm addItem={addTask}/>

      <div>
        {
          tasks.map((t) => {

            return (
              <div key={t.id} className={t.isDone ? 'taskCompleted' : ''}>
                <CheckBox
                  checked={t.isDone}
                  callBack={(eValue) => changeTaskStatus(t.id, eValue)}/>
                <EditableSpan
                  value={t.title}
                  callBack={(newTitle) => changeTaskTitle(t.id, newTitle)}/>
                <Button
                  size='small'
                  onClick={() => removeTaskHandler(t.id)}>
                  <RemoveCircleTwoToneIcon/>
                </Button>
              </div>)
          })
        }

      </div>
      <div>
        <Button
          onClick={allClickFilter}
          // className={props.filter === 'all' ? 'activeFilter' : 'filterButton'}
          variant={filter === 'all' ? 'contained' : 'outlined'}
          color='error' size='small'
        >All
        </Button>
        <Button
          onClick={activeClickFilter}
          variant={filter === 'active' ? 'contained' : 'outlined'} color='error' size='small'
        >Active
        </Button>
        <Button
          onClick={completedClickFilter}
          variant={filter === 'completed' ? 'contained' : 'outlined'} color='error' size='small'
        >Completed
        </Button>
      </div>
    </div>
  )
}


