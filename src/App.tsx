import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';


export type ChangeFilterType = 'all' | 'active' | 'completed'
export type TodolistsPropsType = {
  todolistId: string
  title: string
  filter: ChangeFilterType
}
export type TaskPropsType = {
  [key: string]: TasksType[]
}

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistsPropsType[]>([
    {todolistId: todolistId1, title: "What to learn?", filter: 'all'},
    {todolistId: todolistId2, title: "What to buy?", filter: 'all'}
  ])

  const [tasks, setTasks] = useState<TaskPropsType>({
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
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
  }
  const addTask = (todolistId: string, newTitle: string) => {
    // setTasks({{id: v1(), title: newTitle, isDone: false}, ...tasks})
    setTasks({...tasks, [todolistId]: [{id: v1(), title: newTitle, isDone: false}, ...tasks[todolistId]]})
  }
  const changeTaskStatus = (todolistId: string, taskId: string, value: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: value} : t)})
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
  }

  const addTodolist = (title: string) => {
    const newTodolistId = v1();
    setTodolists([{todolistId: newTodolistId, title, filter: 'all'}, ...todolists])
    setTasks({...tasks, [newTodolistId]: []})
  }
  const changeTodolistTitle=(todolistId: string, title:string)=>{
    setTodolists(todolists.map(tl=>tl.todolistId===todolistId?{...tl, title}:tl))
  }
  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.todolistId !== todolistId))
    delete tasks[todolistId]
      setTasks({...tasks})
  }


  const changeFilter = (todolistId: string, value: ChangeFilterType) => {
    setTodolists(todolists.map(tl => tl.todolistId ? {...tl, filter: value} : tl))

  }


  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
      {
        todolists.map(tl => {
            let tasksForTodolist = tasks[tl.todolistId]
            if (tl.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
            }
            return <Todolist
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
          }
        )
      }

    </div>
  );
}

export default App;

