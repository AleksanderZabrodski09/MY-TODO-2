import React, {useCallback} from 'react';
import './App.css';
import {TaskType} from './Todolist';
import {v1} from 'uuid';
import {InputForm} from './components/InputForm';
import ButtonAppBar from './components/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootReducerType} from './state/store';
import {TodolistWithDispatch} from './TodolistWithRedux';

export type TodolistType = {
  todolistId: string
  title: string
  filter: ChangeFilterType
}
export type TasksStateType = {
  [key: string]: TaskType[]
}
export type ChangeFilterType = 'all' | 'active' | 'completed'


function AppWithRedux() {
  // const todolistId1 = v1();
  // const todolistId2 = v1();

  const todolists = useSelector<AppRootReducerType, TodolistType[]>((store) => store.todolists)

  const dispatch=useDispatch()

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  },[dispatch])
  const addTodolist = useCallback((newTitle: string) => {
    dispatch(addTodolistAC(newTitle))
  },[dispatch])
  const changeFilter = useCallback((todolistId: string, value: ChangeFilterType) => {
    dispatch(changeTodolistFilterAC(todolistId, value))
  },[dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title))
  },[dispatch])

  return (
    <div className="App">
      <ButtonAppBar/>
      <Container>
        <Grid container style={{padding: '20px'}}>
          <InputForm addInput={addTodolist}/>
        </Grid>

        <Grid container spacing={3}>
          {
            todolists.map(tl => {

                return <Grid item key={tl.todolistId}>
                  <Paper style={{padding: '10px'}}>
                    <TodolistWithDispatch
                    todolist={tl}

                    /></Paper>
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

