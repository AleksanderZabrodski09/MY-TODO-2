import React from 'react';


type TasksType = {
  id: number
  title: string
  isDone: boolean
}

type TodolistType = {
  title: string
  tasks: TasksType[]
  removeTask: (taskId: number) => void
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
          props.tasks.map(t => {
            const removeTaskHandler = () => {
              props.removeTask(t.id)
            }
            return (

              <li key={t.id}>
                <input
                  type="checkbox"
                  checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTaskHandler}>x</button>
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