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
      .then((res)=>res.data)
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
      .then((res)=>res.data)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
      .then((res)=>res.data)
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
      .then((res)=>res.data)
  }
}

type TodolistType = {
  addedDate: string
  id: string
  order: number
  title: string
}
// type CreateTodolistResponseType  = {
//   data: { item: TodolistType }
//   fieldsErrors: string[]
//   messages: string[]
//   resultCode: number
// }
type ResponseType <D = {}>  = {
  data: D
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}
// type DeleteTodolistResponseType    = {
//   data: {}
//   fieldsErrors: string[]
//   messages: string[]
//   resultCode: number
// }

