import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type TodolistType={
  todolistId: string
  title: string
  filter: changeFilterType
}
export type changeFilterType = 'all' | 'active' | 'completed'


function App() {

  const [todolists,setTodolists]=useState<TodolistType[]>([
    {todolistId: v1(), title: 'What to learn', filter: 'all'},
    {todolistId: v1(), title: 'What to buy', filter: 'all'},
  ])

  const [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "ReactTS", isDone: true},
    {id: v1(), title: "TS", isDone: false}
  ])

  const addTask = (title: string) => {
    let newTask: TaskType = {id: v1(), title: title, isDone: false}
    setTasks([newTask, ...tasks])
  }
  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }
  const changeTaskStatus = (taskId: string, value: boolean) => {
    setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: value} : t))
  }

  const [filter, setFilter] = useState<changeFilterType>('all')

  let tasksForTodolist = tasks
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }
  const changeFilter = (value: changeFilterType) => {
    setFilter(value)
  }

  return (
    <div className="App">
      {
        todolists.map(tl=> <Todolist
          title='What to learn'
          tasks={tasksForTodolist}
          addTask={addTask}
          removeTask={removeTask}
          changeTaskStatus={changeTaskStatus}
          changeFilter={changeFilter}
          filter={filter}
        />)
      }

    </div>
  );
}

export default App;

