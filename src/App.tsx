import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type ChangeFilterType = 'all' | 'active' | 'completed'

function App() {

  const [tasks, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false}
  ])

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(t => t.id !== taskId))
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
      />

    </div>
  );
}

export default App;

