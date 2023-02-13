import React, {useCallback, useEffect} from 'react';
import {AppDispatch, useAppSelector} from '../../app/store';
import {
  addTodolistTC, ChangeFilterType,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistTC,
  removeTodolistTC,
  TodolistDomainType
} from '../todolists-reducer';
import {Grid, Paper} from '@mui/material';
import {InputForm} from '../../components/InputForm/InputForm';
import {TodolistWithDispatch} from './TodolistWithRedux';


export const TodolistsList: React.FC = () => {

  // const todolists = useSelector<AppRootReducerType, TodolistDomainType[]>((store) => store.todolists)
  const todolists = useAppSelector<TodolistDomainType[]>((store) => store.todolists)
  const dispatch = AppDispatch()

  useEffect(() => {
    // // todolistAPI.getTodolist()
    // //   .then(res=> dispatch(setTodolistsAC(res)))
    // // fetchTodolistThunk(dispatch);
    // dispatch(fetchTodolistThunk);
    dispatch(fetchTodolistTC());
  }, [])


  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  }, [dispatch])
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch])
  const changeFilter = useCallback((todolistId: string, value: ChangeFilterType) => {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }, [dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolistTitleTC(todolistId, title))
  }, [dispatch])
  return (
    <>
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
    </>
  )

}