import React from 'react';
import {ChangeFilterType} from './App';
import {CheckBox} from './componets/CheckBox';
import {AddItemForm} from './componets/AddItemForm';
import {EditableSpan} from './componets/EditableSpan';
import {Button} from '@mui/material';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskPropsType} from './AppWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {ChangeTodolistFilterAC} from './state/todolists-reducer';

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistType = {
  todolistId: string
  title: string
  filter: ChangeFilterType
  changeFilter: (todolistId: string, value: ChangeFilterType) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  // tasks: TasksType[]
  // addTask: (todolistId: string, newTitle: string) => void
  // removeTask: (todolistId: string, taskId: string) => void
  // changeTaskStatus: (todolistId: string, taskId: string, value: boolean) => void
  // changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}


export const Todolist: React.FC<TodolistType> = (props) => {
  const tasks = useSelector<AppRootStateType, TasksType[]>(state=>state.tasks[props.todolistId])
  const dispatch = useDispatch();

  const addTask = (newTitle: string) => {
    dispatch(addTaskAC(props.todolistId, newTitle))
  }
  const removeTaskHandler = (tID: string) => {
    dispatch(removeTaskAC(props.todolistId, tID))
  }
  const changeTaskStatus = (tID: string, eValue: boolean) => {
    dispatch(changeTaskStatusAC(props.todolistId, tID, eValue))
  }
  const changeTaskTitle = (tID: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(props.todolistId, tID, newTitle))
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


  let tasksForTodolist = tasks;
  if (props.filter === 'active') {
    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
  }
  if (props.filter === 'completed') {
    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} callBack={changeTodolistTitleHandler}/>
        <Button onClick={removeTodolistHandler} >
          <DeleteForeverIcon/></Button>
      </h3>
      <AddItemForm addItem={addTask}/>

      <div>
        {
          tasks.map(t => {

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


