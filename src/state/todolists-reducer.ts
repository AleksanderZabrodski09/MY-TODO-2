import {ChangeFilterType, TodolistsPropsType} from '../App';
import {v1} from 'uuid';
import React from 'react';
// //
// export type TodolistsReducerType = {
//   type: string
//   [key: string]: any
// }
export type TodolistsReducerType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  // | ChangeTodolistTitle
  | ReturnType<typeof ChangeTodolistTitleAC>
  // | ChangeTodolistFilter
  | ReturnType<typeof ChangeTodolistFilterAC>

type RemoveTodolistActionType= ReturnType<typeof RemoveTodolistAC>
type AddTodolistActionType = ReturnType<typeof AddTodolistAC>

// type RemoveTodolistActionType = {
//   type: 'REMOVE-TODOLIST'
//   todolistId: string
// }
// type AddTodolistActionType = {
//   type: 'ADD-TODOLIST'
//   title: string
// }
// type ChangeTodolistTitle ={
//   type: 'CHANGE-TODOLIST-TITLE'
//   todolistId: string
//   title: string
// }
// type ChangeTodolistFilter ={
//   type: 'CHANGE-TODOLIST-FILTER'
//   todolistId: string
//   filter: ChangeFilterType
// }

export const todolistsReducer = (state: TodolistsPropsType[], action: TodolistsReducerType): TodolistsPropsType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.todolistId !== action.payload.todolistId)
    case 'ADD-TODOLIST': {
      let newTodolistId = v1()
      let newTodolist: TodolistsPropsType = {todolistId: newTodolistId, title: action.payload.title, filter: 'all'};
      return [newTodolist, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE':{
      return state.map(tl=>tl.todolistId===action.payload.todolistId?{...tl, title:action.payload.title}:tl)
    }
  case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl=>tl.todolistId===action.payload.todolistId?{...tl, filter:action.payload.filter}:tl)


    default:
      // throw new Error('I don\'t understand this type')
      return state
  }
}

export const RemoveTodolistAC=(todolistId:string) =>{
  return {
    type: 'REMOVE-TODOLIST',
    payload:{todolistId}} as const
}
export const AddTodolistAC=(title:string) =>{
  return {
    type: 'ADD-TODOLIST',
    payload:{title}} as const
}
export const ChangeTodolistTitleAC=(todolistId:string,title:string) =>{
  return {
    type: 'CHANGE-TODOLIST-TITLE',
  payload:{todolistId, title}
  } as const
}
export const ChangeTodolistFilterAC=(todolistId:string,filter:ChangeFilterType) =>{
  return {
    type:'CHANGE-TODOLIST-FILTER',
    payload:{todolistId, filter}
  }as const
}