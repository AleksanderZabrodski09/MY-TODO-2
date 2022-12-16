import {ChangeFilterType, TaskPropsType, TodolistsPropsType} from '../App';
import {v1} from 'uuid';

export type TodolistsReducerType =
  |  RemoveTodolistActionType
  | AddTodolistActionType
  // | ChangeTodolistTitle
  | ReturnType<typeof ChangeTodolistTitleAC>
  // | ChangeTodolistFilter
  | ReturnType<typeof ChangeTodolistFilterAC>

export type RemoveTodolistActionType= ReturnType<typeof RemoveTodolistAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>

const initialState: TodolistsPropsType[] = []

export const todolistsReducer = (state = initialState, action: TodolistsReducerType): TodolistsPropsType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.todolistId !== action.payload.todolistId)
    case 'ADD-TODOLIST': {
      // let newTodolistId = v1()
      let newTodolist: TodolistsPropsType = {todolistId: action.payload.todolistId, title: action.payload.title, filter: 'all'};
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
    payload:{title, todolistId:v1()}
  } as const
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