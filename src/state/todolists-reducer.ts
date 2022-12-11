import {ChangeFilterType, TodolistsPropsType} from '../App';
import {v1} from 'uuid';
// //
// export type TodolistsReducerType = {
//   type: string
//   [key: string]: any
// }
export type TodolistsReducerType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitle
  | ChangeTodolistFilter

type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  todolistId: string
}
type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
}
type ChangeTodolistTitle ={
  type: 'CHANGE-TODOLIST-TITLE'
  todolistId: string
  title: string
}
type ChangeTodolistFilter ={
  type: 'CHANGE-TODOLIST-FILTER'
  todolistId: string
  filter: ChangeFilterType
}

export const todolistsReducer = (state: TodolistsPropsType[], action: TodolistsReducerType): TodolistsPropsType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.todolistId !== action.todolistId)
    case 'ADD-TODOLIST': {
      let newTodolistId = v1()
      let newTodolist: TodolistsPropsType = {todolistId: newTodolistId, title: action.title, filter: 'all'};
      return [newTodolist, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE':{
      return state.map(tl=>tl.todolistId===action.todolistId?{...tl, title:action.title}:tl)
    }
  case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl=>tl.todolistId===action.todolistId?{...tl, filter:action.filter}:tl)


    default:
      // throw new Error('I don\'t understand this type')
      return state
  }
}

export const RemoveTodolistAC=(todolistId:string):RemoveTodolistActionType =>{
  return {
    type: 'REMOVE-TODOLIST', todolistId} as const
}
export const AddTodolistAC=(title:string):AddTodolistActionType =>{
  return {
    type: 'ADD-TODOLIST', title} as const
}
export const ChangeTodolistTitleAC=(todolistId:string,title:string):ChangeTodolistTitle =>{
  return {
    type: 'CHANGE-TODOLIST-TITLE',todolistId, title} as const
}
export const ChangeTodolistFilterAC=(todolistId:string,filter:ChangeFilterType):ChangeTodolistFilter =>{
  return {
    type:'CHANGE-TODOLIST-FILTER',todolistId, filter
  }as const
}