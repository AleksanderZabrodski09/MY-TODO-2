import React from 'react';
import './App.css';
import {TasksType} from './Todolist';
import {AddItemForm} from './componets/AddItemForm';
import ButtonAppBar from './componets/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistWithRedux} from './TodolistWithRedux';


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
  const todolists = useSelector<AppRootStateType, TodolistsPropsType[]>(state => state.todolists)

  const dispatch = useDispatch();

  const addTodolist = (title: string) => {
    const action = AddTodolistAC(title)
    dispatch(action)

  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(ChangeTodolistTitleAC(todolistId, title))
  }
  const removeTodolist = (todolistId: string) => {
    const action = RemoveTodolistAC(todolistId)
    dispatch(action)
  }
  const changeFilter = (todolistId: string, value: ChangeFilterType) => {
    dispatch(ChangeTodolistFilterAC(todolistId, value))
  }


  return (
    <div className="App">
      <ButtonAppBar/>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {

                return <Grid item key={tl.todolistId}>
                  <Paper style={{padding: '10px'}}>
                    <TodolistWithRedux
                      todolist={tl}
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

