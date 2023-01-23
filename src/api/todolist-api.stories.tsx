import {useEffect, useState} from 'react';
import axios from 'axios';
import {todolistAPI} from './todolist-api';
//
export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodolist()
      .then((res) => {
        setState(res)
      })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let title = 'TODO-OOOO'
    todolistAPI.createTodolist(title)
      .then((res) => {
        setState(res)
      })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolists = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [newTitle, setNewTitle] = useState<string>('')


  const updateTitle = () => {
    todolistAPI.updateTodolist(todolistId, newTitle)
      .then((res) => {
        setState(res)
      })
  }
  // useEffect(() => {
  //   // let title = 'new title'
  //   // let todolistId = '7edc1831-438c-4864-a4c4-4b72a4f32c14';
  //   todolistAPI.updateTodolist(todolistId, title)
  //     .then((res) => {
  //       setState(res)
  //     })
  //
  // }, [])
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <input placeholder={'new Title'} value={newTitle} onChange={(e) => {
        setNewTitle(e.currentTarget.value)
      }}/>
      <button onClick={updateTitle}>update title</button>
    </div>
  </div>
}
export const DeleteTodolists = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTodolist = () => {
    todolistAPI.deleteTodolist(todolistId)
      .then((res) => {
        setState(res)
      })
  }

  // useEffect(() => {
  //   let todolistId = '73fb08b3-504b-4526-a58f-25a7737ff701';
  //   todolistAPI.deleteTodolist(todolistId)
  //     .then((res) => {
  //       setState(res)
  //     })
  // }, [])
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>

      <button onClick={deleteTodolist}>Delete todolist</button>
    </div>
  </div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

  const getTask = () => {
    todolistAPI.getTask(todolistId)
      .then((res) => {
        setState(res)
      })
  }
  //  useEffect(() => {
  // let todolistId = '7edc1831-438c-4864-a4c4-4b72a4f32c14'
  //   todolistAPI.getTask(todolistId)
  //     .then((res) => {
  //       setState(res)
  //     })
  //
  // }, [])
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <button onClick={getTask}>Create Task</button>
    </div>
  </div>
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')

  const deleteTask = () => {
    todolistAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        setState(res)
      })
  }
  //.......
  // useEffect(() => {
  //   let todolistId ='7edc1831-438c-4864-a4c4-4b72a4f32c14'
  //   let taskId=''
  //   todolistAPI.deleteTask(todolistId, taskId)
  //     .then((res)=>{
  //       setState(res)
  //     })
  //
  // }, [])
  // return <div>{JSON.stringify(state)}</div>
  //......
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={taskId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <input placeholder={'taskId'} value={todolistId} onChange={(e) => {
        setTaskId(e.currentTarget.value)
      }}/>
      <button onClick={deleteTask}>Delete task</button>
    </div>
  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [titleTask, setTitleTask] = useState<string>('')

  const createTask = () => {
    todolistAPI.createTask(todolistId, titleTask)
      .then((res) => {
        setState(res)
      })
  }

  //   let title: 'Angular'
  // useEffect(() => {
  //   let todolistId = '7edc1831-438c-4864-a4c4-4b72a4f32c14'
  //   todolistAPI.createTask(todolistId,title)
  //     .then((res) => {
  //       setState(res.data)
  //     })
  //
  // }, [])
  // return <div>{JSON.stringify(state)}</div>

  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <input placeholder={'title Task'} value={titleTask} onChange={(e) => {
        setTitleTask(e.currentTarget.value)
      }}/>
      <button onClick={createTask}>Create Task</button>
    </div>
  </div>
}

export const UpdateTask = () => {

  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const [title, setTitle] = useState<string>('title 1')
  const [description, setDescription] = useState<string>('description 1')
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('deadline 1')

  const updateTask = () => {
    todolistAPI.updateTask(todolistId, taskId, {
      deadline: '',
      description: description,
      priority: priority,
      startDate: '',
      status: status,
      title: title
    })
      .then((res) => {
        setState(res);
      })
  }

  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
      <input placeholder={'taskId'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
      <input placeholder={'task Title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
      <input placeholder={'task Description'} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
      <input placeholder={'task status'} value={status} type={'number'} onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
      <input placeholder={'task priority'} value={priority} type={'number'} onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
      <button onClick={updateTask}>update task</button>
    </div>
  </div>
}
