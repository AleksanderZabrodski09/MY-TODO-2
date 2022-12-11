import {TodolistType} from '../App';
import {v1} from 'uuid';

export type todolistsReducerType=
  | AddTodolistACType
  | RemoveTodolistACType


export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

const initialState: TodolistType[] = []
export const todolistsReducer = (state = initialState, action: todolistsReducerType): TodolistType[] => {
  switch (action.type) {
    case'ADD-TODOLIST':
      const newTodolistId=v1()
      return [{todolistId: newTodolistId, title: action.payload.title, filter: 'all'}, ...state]
    case 'REMOVE-TODOLIST':
      return state.filter(tl=>tl.todolistId!==action.payload.todolistId)

    default:
      // throw new Error ('I don\'t understand this type')
      return state
  }
}



export const addTodolistAC=(title:string)=>{
  return {
    type: 'ADD-TODOLIST',
    payload: {title}
  }as const
}
export const removeTodolistAC=(todolistId:string)=>{
  return {
    type: 'REMOVE-TODOLIST',
    payload: {todolistId}
  }as const
}
