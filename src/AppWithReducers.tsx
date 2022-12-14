import React, {useReducer} from 'react';
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
  todolistsReducer
} from './state/todolists-reducer';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';


export type ChangeFilterType = 'all' | 'active' | 'completed'
export type TodolistsPropsType = {
  todolistId: string
  title: string
  filter: ChangeFilterType
}
export type TaskPropsType = {
  [key: string]: TasksType[]
}

function AppWithReducers() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
    {todolistId: todolistId1, title: "What to learn?", filter: 'all'},
    {todolistId: todolistId2, title: "What to buy?", filter: 'all'}
  ])

  const addTodolist = (title: string) => {
    const action= AddTodolistAC(title)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchToTodolists(ChangeTodolistTitleAC(todolistId,title))
  }
  const removeTodolist = (todolistId: string) => {
    const action= RemoveTodolistAC(todolistId)
    dispatchToTodolists(action)
    // delete tasks[todolistId]
    dispatchToTasks(action)
  }
  console.log(todolists)
  // console.log(tasks)
  const changeFilter = (todolistId: string, value: ChangeFilterType) => {
    dispatchToTodolists(ChangeTodolistFilterAC(todolistId,value))

  }

  const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
      [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "TS", isDone: false}
      ],
      [todolistId2]: [
        {id: v1(), title: "bread", isDone: true},
        {id: v1(), title: "milk", isDone: true},
        {id: v1(), title: "chocolate", isDone: false}
      ],
    }
  )

  const removeTask = (todolistId: string, taskId: string) => {
    dispatchToTasks(removeTaskAC(todolistId,taskId))
  }
  const addTask = (todolistId: string, newTitle: string) => {
    dispatchToTasks(removeTaskAC(todolistId,newTitle))
  }
  const changeTaskStatus = (todolistId: string, taskId: string, value: boolean) => {
    dispatchToTasks(changeTaskStatusAC(todolistId,taskId,value))
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchToTasks(changeTaskTitleAC(todolistId,taskId,title))
  }




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
                let tasksForTodolist = tasks[tl.todolistId]
                if (tl.filter === 'active') {
                  tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                }
                if (tl.filter === 'completed') {
                  tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                }
                return <Grid item>
                  <Paper style={{padding:'10px'}}>
                    <Todolist
                      key={tl.todolistId}
                      todolistId={tl.todolistId}
                      filter={tl.filter}
                      title={tl.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}
                      removeTodolist={removeTodolist}
                      changeTodolistTitle={changeTodolistTitle}
                      changeFilter={changeFilter}
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

export default AppWithReducers;

