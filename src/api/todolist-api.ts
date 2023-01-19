import axios from 'axios';

// const settings = {
//   withCredentials: true,
//   headers: {
//     'API-KEY': '5983a517-e387-4f12-ac5e-a15dd0cef3b7',
//   }
// }

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '5983a517-e387-4f12-ac5e-a15dd0cef3b7'
  },

})


export const todolistAPI = {
  getTodolist() {
    return instance.get<TodolistType[]>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<CreateTodolistResponseType>('todo-lists', {title})
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistId}`, {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<DeleteTodolistResponseType>(`todo-lists/${todolistId}`)
  }
}

type TodolistType = {
  addedDate: string
  id: string
  order: number
  title: string
}
type CreateTodolistResponseType  = {
  data: { item: TodolistType }
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}
type UpdateTodolistResponseType   = {
  data: {}
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}
type DeleteTodolistResponseType    = {
  data: {}
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}

