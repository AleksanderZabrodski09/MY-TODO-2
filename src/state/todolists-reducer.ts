import {todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';


// export type SetTodolistActionType = {
//   type: 'SET-TODOLIST'
//   todolists: TodolistType[]
// }

//Reducer
const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state = initialState, action: TodolistsReducerType): TodolistDomainType[] => {
  switch (action.type) {

    case'ADD-TODOLIST':
      return [{...action.payload.todolist, filter: 'all'}, ...state]
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
      return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
    default:
      // throw new Error ('I don\'t understand this type')
      return state
  }
}

// actions
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', payload: {todolist}} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', payload: {todolistId}} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
  ({type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, title}} as const)
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


//  thunks

export const fetchTodolistTC = () => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
      .then((res) => {
        // dispatch(setTodolistsAC(res.data))
        dispatch(setTodolistsAC(res))
      })
  }
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTodolist(todolistId)
    .then((res) => {
      dispatch(removeTodolistAC(todolistId))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistAPI.createTodolist(title)
    .then((res) => {
      dispatch(addTodolistAC(res.data.item))
    })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistId, title)
      .then((res) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
      })
  }
}

//  types

export type TodolistsReducerType =
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