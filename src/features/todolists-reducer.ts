import {ResultCode, todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppActionsType, setAppErrorAC, setLoadingStatusAC} from '../app/app-reducer';


// export type SetTodolistActionType = {
//   type: 'SET-TODOLIST'
//   todolists: TodolistType[]
// }

//  Reducer
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
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.getTodolist()
      .then((res) => {
        // dispatch(setTodolistsAC(res.data))
        dispatch(setTodolistsAC(res))
        dispatch(setLoadingStatusAC('succeeded'))
      })
  }
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setLoadingStatusAC('loading'))
  todolistAPI.deleteTodolist(todolistId)
    .then((res) => {
      dispatch(removeTodolistAC(todolistId))
      dispatch(setLoadingStatusAC('succeeded'))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setLoadingStatusAC('loading'))
  todolistAPI.createTodolist(title)
    .then((res) => {
      if(res.resultCode===ResultCode.SUCCEEDED){
        dispatch(addTodolistAC(res.data.item))
        dispatch(setLoadingStatusAC('succeeded'))
      }else {
        if(res.messages.length){
          dispatch(setAppErrorAC(res.messages[0]))
        } else {
          dispatch(setAppErrorAC('Some error occurred'))
        }
        dispatch(setLoadingStatusAC('failed'))
      }

    })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
      .then((res) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
        dispatch(setLoadingStatusAC('succeeded'))
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
  | AppActionsType


export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>

export type ChangeFilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: ChangeFilterType
}