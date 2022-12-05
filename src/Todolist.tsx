import React from 'react';


type TasksType = {
  id: number
  title: string
  isDone: boolean
}

type TodolistType = {
  title: string
  tasks: TasksType[]
}
export const Todolist: React.FC<TodolistType> = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {
          props.tasks.map(t=>{
            return(
              <li key={t.id}>
                <input
                  type="checkbox"
                  checked={t.isDone}/>
                <span>{t.title}</span>
              </li>)

          })
        }

      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}