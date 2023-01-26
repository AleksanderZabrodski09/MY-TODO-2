import axios from 'axios';


const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '5983a517-e387-4f12-ac5e-a15dd0cef3b7',
  }
}

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings

})

//api
export const todolistAPI = {
  getTodolist() {
    return instance.get<TodolistType[]>('todo-lists')
      .then((res) => res.data)
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
      .then((res) => res.data)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
      .then((res) => res.data)
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
      .then((res) => res.data)
  },
  getTask(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
      .then((res) => res.data)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
      .then((res) => res.data)
  },
  createTask(todolistId: string, taskTitle: string) {
    return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title:taskTitle})
      .then((res) => res.data)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`,  model)
      .then((res) => res.data)
  }
}


//type

export type TodolistType = {
  addedDate: string
  id: string
  order: number
  title: string
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export type TaskType = {
  todoListId: string
  id: string
  status: TaskStatuses
  description: string
  title: string
  // completed: boolean
  priority: TaskPriorities
  startDate: string
  deadline: string
  order: number
  addedDate: string
}

type ResponseType<D = {}> = {
  data: D
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}

type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export type UpdateTaskModel={
  title: string
  description: string
  // completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
}

