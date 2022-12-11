import {ChangeFilterType, TodolistsPropsType} from '../App';
import {v1} from 'uuid';

// export type ActionType = {
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
       case 'ADD-TODOLIST': {
      let newTodolistId = v1()
      let newTodolist: TodolistsPropsType = {todolistId: newTodolistId, title: action.title, filter: 'all'};
      return [newTodolist, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE':{
      return state.map(tl=>tl.todolistId===action.todolistId?{...tl, title:action.title}:tl)
    }
  case 'CHANGE-TODOLIST-FILTER':{
      return state.map(tl=>tl.todolistId===action.todolistId?{...tl, filter:action.filter}:tl)
    }

    default:
      // throw new Error('I don\'t understand this type')
      return state
  }
}
