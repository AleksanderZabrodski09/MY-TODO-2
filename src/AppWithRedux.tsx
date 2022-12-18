import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {InputForm} from './components/InputForm';
import ButtonAppBar from './components/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTasksStatusAC, changeTasksTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import App from './App';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootReducerType} from './state/store';

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
  const todolistId1 = v1();
  const todolistId2 = v1();

  const todolists = useSelector<AppRootReducerType, TodolistType[]>((store) => store.todolists)
  const tasks = useSelector<AppRootReducerType, TasksStateType>(store => store.tasks)

  const dispatch=useDispatch()

  const addTask = (todolistId: string, title: string) => {
    dispathToTasks(addTaskAC(todolistId, title))

  }
  const removeTask = (todolistId: string, taskId: string) => {
    dispathToTasks(removeTaskAC(todolistId, taskId))
  }
  const changeTaskStatus = (todolistId: string, taskId: string, value: boolean) => {
    dispathToTasks(changeTasksStatusAC(todolistId, taskId, value))
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispathToTasks(changeTasksTitleAC(todolistId, taskId, title))
  }

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispathToTodolist(action)
    dispathToTasks(action)
  }

  const addTodolist = (newTitle: string) => {
    const action = addTodolistAC(newTitle)
    dispathToTodolist(action)
    dispathToTasks(action)
  }

  const changeFilter = (todolistId: string, value: ChangeFilterType) => {
    dispathToTodolist(changeTodolistFilterAC(todolistId, value))
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispathToTodolist(changeTodolistTitleAC(todolistId, title))
  }

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
                let tasksForTodolist = tasks[tl.todolistId]
                if (tl.filter === 'active') {
                  tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                }
                if (tl.filter === 'completed') {
                  tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                }
                return <Grid item key={tl.todolistId}>
                  <Paper style={{padding: '10px'}}>
                    <Todolist
                      key={tl.todolistId}
                      todolistId={tl.todolistId}
                      title={tl.title}
                      tasks={tasksForTodolist}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}
                      changeFilter={changeFilter}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
                      changeTodolistTitle={changeTodolistTitle}
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

