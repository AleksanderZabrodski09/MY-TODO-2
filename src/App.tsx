import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';


export type ChangeFilterType = 'all' | 'active' | 'completed'
export type TodolistsPropsType = {
  todolistId: string
  title: string
  filter: ChangeFilterType
}

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistsPropsType[]>([
    {todolistId: todolistId1, title: "What to learn?", filter: 'all'},
    {todolistId: todolistId2, title: "What to buy?", filter: 'all'}
  ])

  const [tasks, setTasks] = useState({
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

  const removeTask = (taskId: string) => {
    // setTasks(tasks.filter(t => t.id !== taskId))
  }
  const addTask = (newTitle: string) => {
    // setTasks([{id: v1(), title: newTitle, isDone: false}, ...tasks])
  }
  const changeTaskStatus = (taskId: string, value: boolean) => {
    // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: value} : t))
  }


  const removeTodolist = (todolistId:string) => {
    setTodolists(todolists.filter(tl=>tl.todolistId!==todolistId))
  }
  const changeFilter = (todolistId: string, value: ChangeFilterType) => {
    setTodolists(todolists.map(tl => tl.todolistId ? {...tl, filter: value} : tl))
    console.log('ok')
  }


  return (
    <div className="App">
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
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              removeTodolist={removeTodolist}
            />
          }
        )
      }

    </div>
  );
}

export default App;

