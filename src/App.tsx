import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';


export type ChangeFilterType = 'all' | 'active' | 'completed'

function App() {

  const [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false}
  ])

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }
  const addTask=(newTitle:string)=>{
    setTasks([{id: v1(), title: newTitle, isDone: false}, ...tasks])
  }

  const [filter, setFilter] = useState<ChangeFilterType>('all')

  const changeFilter = (value: ChangeFilterType) => {
    setFilter(value)
  }
  let tasksForTodolist = tasks
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }


  return (
    <div className="App">
      <Todolist
        title='What to learn?'
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />

    </div>
  );
}

export default App;

