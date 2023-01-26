import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
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
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-api';


export type TasksStateType={
  [key:string]:TaskType[]
}
export type ChangeFilterType = 'all' | 'active' | 'completed'



function AppWithReducer() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodolist] = useReducer(todolistsReducer,[
    {id: todolistId1, title: 'What to learn', filter: 'all',addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all',addedDate: '', order: 0},
  ])

  const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        description: '',
        order: 0,
        addedDate: '',
        todoListId: todolistId1,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: ''
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: '',
        todoListId: todolistId1,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        description: ''
      },
      {
        id: v1(),
        title: "ReactJS",
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        todoListId: todolistId1,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        description: ''
      },
      {
        id: v1(),
        title: "ReactTS",
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: '',
        todoListId: todolistId1,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        description: ''
      },
      {
        id: v1(),
        title: "TS",
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        todoListId: todolistId1,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        description: ''
      }
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "milk",
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: '',
        todoListId: todolistId2,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        description: ''
      },
      {
        id: v1(),
        title: "kefir",
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: '',
        todoListId: todolistId2,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        description: ''
      },
      {
        id: v1(),
        title: "curs",
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        todoListId: todolistId2,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        description: ''
      },
      {
        id: v1(),
        title: "socks",
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        todoListId: todolistId2,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        description: ''
      }
    ],
  })

  const addTask = (todolistId: string, title: string) => {
    dispatchToTasks(addTaskAC(todolistId,title))

  }
  const removeTask = (todolistId: string, taskId: string) => {
    dispatchToTasks(removeTaskAC(todolistId,taskId))
  }
  const changeTaskStatus = (todolistId: string, taskId: string, value: TaskStatuses) => {
    dispatchToTasks(changeTasksStatusAC(todolistId,taskId,value))
  }
const changeTaskTitle=(todolistId: string, taskId: string, title: string)=>{
  dispatchToTasks(changeTasksTitleAC(todolistId,taskId,title))
}

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatchToTodolist(action)
    dispatchToTasks(action)
  }

  const addTodolist = (newTitle: string) => {
    const action = addTodolistAC(newTitle)
    dispatchToTodolist(action)
    dispatchToTasks(action)
  }

  const changeFilter = (todolistId: string, value: ChangeFilterType) => {
    dispatchToTodolist(changeTodolistFilterAC(todolistId,value))
  }

  const changeTodolistTitle=(todolistId: string,title: string)=>{
    dispatchToTodolist(changeTodolistTitleAC(todolistId,title))
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
          todolists.map((tl) => {
              let tasksForTodolist = tasks[tl.id]
              if (tl.filter === 'active') {
                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
              }
              if (tl.filter === 'completed') {
                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
              }
              return <Grid item>
                <Paper style={{padding:'10px'}}><Todolist
                  key={tl.id}
                  todolistId={tl.id}
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

export default AppWithReducer;

