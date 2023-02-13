import React, {useState} from 'react';
import '../app/App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {InputForm} from '../components/InputForm/InputForm';
import ButtonAppBar from '../app/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolist-api';
import {ChangeFilterType, TodolistDomainType} from '../features/todolists-reducer';

// export type TodolistType = {
//   todolistId: string
//   title: string
//   filter: ChangeFilterType
// }
export type TasksStateType = {
  [key: string]: TaskType[]
}


function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistDomainType[]>([
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
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
      {id: v1(), title: "JS", status: TaskStatuses.Completed, order: 0, addedDate: '', todoListId: todolistId1, priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''
      },
      {id: v1(), title: "ReactJS", status: TaskStatuses.New, order: 0, addedDate: '', todoListId: todolistId1, priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''
      },
      {id: v1(), title: "ReactTS", status: TaskStatuses.Completed, order: 0, addedDate: '', todoListId: todolistId1, priority: TaskPriorities.Low, startDate: '', deadline: '', description: ''
      },
      {id: v1(), title: "TS", status: TaskStatuses.New, order: 0, addedDate: '', todoListId: todolistId1, priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''
      }
    ],
    [todolistId2]: [
      {id: v1(), title: "milk", status: TaskStatuses.Completed, order: 0, addedDate: '', todoListId: todolistId2, priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''
      },
      {id: v1(), title: "kefir", status: TaskStatuses.Completed, order: 0, addedDate: '', todoListId: todolistId2, priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''
      },
      {id: v1(), title: "curs", status: TaskStatuses.New, order: 0, addedDate: '', todoListId: todolistId2, priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''
      },
      {id: v1(), title: "socks", status: TaskStatuses.New, order: 0, addedDate: '', todoListId: todolistId2, priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''
      }
    ],
  })

  const addTask = (todolistId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: [{id: v1(), title: title, status: TaskStatuses.Completed, description: '', order: 0, addedDate: '', todoListId: todolistId1, priority: TaskPriorities.Hi, startDate: '', deadline: ''
      }, ...tasks[todolistId]]
    })
    // let newTask: TaskType = {id: v1(), title: title, status: false}
    // setTasks([newTask, ...tasks])
  }
  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
  }
  const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, status: status} : t)})
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
  }

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  const addTodolist = (newTitle: string) => {
    const newTodolistId = v1()
    setTodolists([{id: newTodolistId, title: newTitle, filter: 'all', addedDate: '', order: 0}, ...todolists])
    setTasks({...tasks, [newTodolistId]: []})
  }

  const changeFilter = (todolistId: string, value: ChangeFilterType) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
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
                let tasksForTodolist = tasks[tl.id]
                if (tl.filter === 'active') {
                  tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
                }
                if (tl.filter === 'completed') {
                  tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
                }
                return <Grid item>
                  <Paper style={{padding: '10px'}}><Todolist
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
            })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;

