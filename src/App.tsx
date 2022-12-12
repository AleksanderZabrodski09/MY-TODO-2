import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {InputForm} from './components/InputForm';
import ButtonAppBar from './components/AppBar';
import {Container, Grid, Paper} from '@mui/material';

export type TodolistType = {
  todolistId: string
  title: string
  filter: ChangeFilterType
}
export type TasksStateType={
  [key:string]:TaskType[]
}
export type ChangeFilterType = 'all' | 'active' | 'completed'



function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    {todolistId: todolistId1, title: 'What to learn', filter: 'all'},
    {todolistId: todolistId2, title: 'What to buy', filter: 'all'},
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "ReactTS", isDone: true},
      {id: v1(), title: "TS", isDone: false}
    ],
    [todolistId2]: [
      {id: v1(), title: "milk", isDone: true},
      {id: v1(), title: "kefir", isDone: true},
      {id: v1(), title: "curs", isDone: false},
      {id: v1(), title: "socks", isDone: false}
    ],
  })

  const addTask = (todolistId: string, title: string) => {
    setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]})
    // let newTask: TaskType = {id: v1(), title: title, isDone: false}
    // setTasks([newTask, ...tasks])
  }
  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
  }
  const changeTaskStatus = (todolistId: string, taskId: string, value: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: value} : t)})
  }
const changeTaskTitle=(todolistId: string, taskId: string, title: string)=>{
    setTasks({...tasks, [todolistId]:tasks[todolistId].map(t=>t.id===taskId?{...t, title}:t)})
}

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.todolistId !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  const addTodolist = (newTitle: string) => {
    const newTodolistId = v1()
    setTodolists([{todolistId: newTodolistId, title: newTitle, filter: 'all'}, ...todolists])
    setTasks({...tasks,[newTodolistId]:[] })
  }

  const changeFilter = (todolistId: string, value: ChangeFilterType) => {
    setTodolists(todolists.map(tl => tl.todolistId === todolistId ? {...tl, filter: value} : tl))
  }

  const changeTodolistTitle=(todolistId: string,title: string)=>{
    setTodolists(todolists.map(tl=>tl.todolistId===todolistId?{...tl, title}:tl))
  }

  return (
    <div className="App">
      <ButtonAppBar/>
      <Container>
        <Grid container style={{padding:'20px'}}>
          <InputForm addInput={addTodolist}/>
        </Grid>

        <Grid  container spacing={3}>
          {
          todolists.map(tl => {
              let tasksForTodolist = tasks[tl.todolistId]
              if (tl.filter === 'active') {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
              }
              if (tl.filter === 'completed') {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
              }
              return <Grid item>
                <Paper style={{padding:'10px'}}><Todolist
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

export default App;

