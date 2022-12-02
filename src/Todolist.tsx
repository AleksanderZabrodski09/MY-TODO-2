import React from 'react';


type TaskType = {
  id: number
  title: string
  isDone: boolean
}
type TodolistType = {
  title: string
  tasks: TaskType[]
  removeTask:(taskId:number)=>void
}
export const Todolist: React.FC<TodolistType> = (props) => {

  const removeTaskHandler=(tID:number)=>{
    props.removeTask(tID)
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input/>
      <button>+</button>
    </div>
    <ul>
      {
        props.tasks.map(t=>{

          return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
            <button onClick={()=>removeTaskHandler(t.id)}>✖️</button>
          </li>
        })
      }
    </ul>
    <div>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  </div>
}