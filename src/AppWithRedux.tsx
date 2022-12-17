import React from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './componets/AddItemForm';
import ButtonAppBar from './componets/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';


export type ChangeFilterType = 'all' | 'active' | 'completed'
export type TodolistsPropsType = {
  todolistId: string
  title: string
  filter: ChangeFilterType
}
export type TaskPropsType = {
  [key: string]: TasksType[]
}

function AppWithRedux() {
  const todolists = useSelector< AppRootStateType, TodolistsPropsType[]>(state=>state.todolists)
  // const tasks = useSelector<AppRootStateType, TaskPropsType>(state=>state.tasks)
  const dispatch = useDispatch();

  const addTodolist = (title: string) => {
    const action= AddTodolistAC(title)
    dispatch(action)

  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(ChangeTodolistTitleAC(todolistId,title))
  }
  const removeTodolist = (todolistId: string) => {
    const action= RemoveTodolistAC(todolistId)
    dispatch(action)
  }
  const changeFilter = (todolistId: string, value: ChangeFilterType) => {
    dispatch(ChangeTodolistFilterAC(todolistId,value))
  }
  // const removeTask = (todolistId: string, taskId: string) => {
  //   dispatch(removeTaskAC(todolistId,taskId))
  // }
  // const addTask = (todolistId: string, newTitle: string) => {
  //   dispatch(addTaskAC(todolistId,newTitle))
  // }
  // const changeTaskStatus = (todolistId: string, taskId: string, value: boolean) => {
  //   dispatch(changeTaskStatusAC(todolistId,taskId,value))
  // }
  // const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
  //   dispatch(changeTaskTitleAC(todolistId,taskId,title))
  // }

  return (
    <div className="App">
      <ButtonAppBar/>
      <Container fixed>
        <Grid container style={{padding:'20px'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {

                return <Grid item  key={tl.todolistId}>
                  <Paper style={{padding:'10px'}} >
                    <Todolist
                      key={tl.todolistId}
                      todolistId={tl.todolistId}
                      filter={tl.filter}
                      title={tl.title}
                      changeTodolistTitle={changeTodolistTitle}
                      removeTodolist={removeTodolist}
                      changeFilter={changeFilter}
                      // tasks={tasksForTodolist}
                      // removeTask={removeTask}
                      // addTask={addTask}
                      // changeTaskStatus={changeTaskStatus}
                      // changeTaskTitle={changeTaskTitle}
                    />
                  </Paper>
                </Grid>
              }
            )
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;

