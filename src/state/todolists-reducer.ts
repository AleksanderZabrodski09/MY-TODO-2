import {v1} from 'uuid';
import {TodolistType} from '../api/todolist-api';

export type todolistsReducerType =
  | AddTodolistACType
  | RemoveTodolistACType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistActionType


export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>

export type ChangeFilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: ChangeFilterType
}


// export type SetTodolistActionType = {
//   type: 'SET-TODOLIST'
//   todolists: TodolistType[]
// }

//Reducer
const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state = initialState, action: todolistsReducerType): TodolistDomainType[] => {
  switch (action.type) {

    case'ADD-TODOLIST':
      return [{...action.payload.todolist, filter:'all'}]
    //   const newTodolistId = action.payload.todolistId
    //   return [{
    //     id: newTodolistId,
    //     title: action.payload.title,
    //     filter: 'all',
    //     addedDate: '',
    //     order: 0
    //   },
    //     ...state]
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.payload.todolistId)
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
    case 'SET-TODOLIST':
      return action.payload.todolists.map(tl=>({...tl, filter: 'all'}))
    default:
      // throw new Error ('I don\'t understand this type')
      return state
  }
}


export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: 'ADD-TODOLIST',
    // payload: {title, todolistId: v1()}
    payload: {todolist}
  } as const
}
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {todolistId}
  } as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {todolistId, title}
  } as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: ChangeFilterType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {todolistId, filter}
  } as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
  return {
    type: 'SET-TODOLIST',
    payload: {todolists}

  } as const
}
