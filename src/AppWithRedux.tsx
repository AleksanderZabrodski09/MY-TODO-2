import React, {useCallback, useEffect} from 'react';
import './App.css';
import {InputForm} from './components/InputForm';
import ButtonAppBar from './components/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
  addTodolistAC, addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, changeTodolistTitleTC,
  fetchTodolistTC,
  removeTodolistAC, removeTodolistTC,
  TodolistDomainType
} from './state/todolists-reducer';
import {useSelector} from 'react-redux';
import {AppDispatch, AppRootReducerType, useAppSelector} from './state/store';
import {TodolistWithDispatch} from './TodolistWithRedux';
import {TaskType} from './api/todolist-api';


export type TasksStateType = {
  [key: string]: TaskType[]
}
export type ChangeFilterType = 'all' | 'active' | 'completed'


function AppWithRedux() {
  // const todolistId1 = v1();
  // const todolistId2 = v1();

  // const todolists = useSelector<AppRootReducerType, TodolistDomainType[]>((store) => store.todolists)
  const todolists = useAppSelector<TodolistDomainType[]>((store) => store.todolists)
  const dispatch=AppDispatch()

  useEffect(()=>{
    // // todolistAPI.getTodolist()
    // //   .then(res=> dispatch(setTodolistsAC(res)))
    // // fetchTodolistThunk(dispatch);
    // dispatch(fetchTodolistThunk);
    dispatch(fetchTodolistTC());
  },[])
  
  
  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  },[dispatch])
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  },[dispatch])
  const changeFilter = useCallback((todolistId: string, value: ChangeFilterType) => {
    dispatch(changeTodolistFilterAC(todolistId, value))
  },[dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolistTitleTC(todolistId, title))
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

                return <Grid item key={tl.id}>
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

