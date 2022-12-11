import {TodolistType} from '../App';
import {v1} from 'uuid';

export type todolistsReducerType=
  | AddTodolistACType


export type AddTodolistACType = ReturnType<typeof addTodolistAC>

const initialState: TodolistType[] = []
export const todolistsReducer = (state = initialState, action: todolistsReducerType): TodolistType[] => {
  switch (action.type) {
    case'ADD-TODOLIST':
      const newTodolistId=v1()
      return [{todolistId: newTodolistId, title: action.payload.title, filter: 'all'}, ...state]

    default:
      // throw new Error ('I don\'t understand this type')
      return state
  }
}



export const addTodolistAC=(title:string)=>{
  return {
    type: 'ADD-TODOLIST',
    payload: {title}
  }
}