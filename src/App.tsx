import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type TodolistType = {
  todolistId: string
  title: string
  filter: changeFilterType
}
export type changeFilterType = 'all' | 'active' | 'completed'


function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    {todolistId: todolistId1, title: 'What to learn', filter: 'all'},
    {todolistId: todolistId2, title: 'What to buy', filter: 'all'},
  ])

  const [tasks, setTasks] = useState({
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
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=>t.id===taskId?{...t, isDone: value}:t)})
  }

const removeTodolist=(todolistId:string)=>{
    setTodolists(todolists.filter(tl=>tl.todolistId!==todolistId))
}

  const changeFilter = (todolistId: string, value: changeFilterType) => {
    setTodolists(todolists.map(tl => tl.todolistId === todolistId ? {...tl, filter: value} : tl))

  }

  return (
    <div className="App">
      {
        todolists.map(tl => {
            let tasksForTodolist = tasks[tl.todolistId]
            if (tl.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
            }
            if (tl.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
            }
            return <Todolist
              key={tl.todolistId}
              todolistId={tl.todolistId}
              title={tl.title}
              tasks={tasksForTodolist}
              addTask={addTask}
              removeTask={removeTask}
              changeTaskStatus={changeTaskStatus}
              changeFilter={changeFilter}
              filter={tl.filter}
              removeTodolist={removeTodolist}
            />
          }
        )
      }

    </div>
  );
}

export default App;

