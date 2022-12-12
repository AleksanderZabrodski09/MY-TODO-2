import {ChangeFilterType, TodolistType} from '../App';
import {v1} from 'uuid';

export type tasksReducerType =
  | AddTodolistACType
  // | RemoveTodolistACType
  // | ReturnType<typeof changeTodolistTitleAC>
  // | ReturnType<typeof changeTodolistFilterAC>

//
// export type AddTodolistACType = ReturnType<typeof addTodolistAC>
// export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

const initialState: TodolistType[] = []
export const tasksReducer = (state = initialState, action: tasksReducerType): TodolistType[] => {
  switch (action.type) {
    case'ADD-TASK':
      // const newTodolistId = v1()
      return state
    case 'REMOVE-TASK':
      return state
    case 'CHANGE-TASK-TITLE':
      return state
    case 'CHANGE-TASK-FILTER':
      return state

    default:
      // throw new Error ('I don\'t understand this type')
      return state
  }
}


// export const addTodolistAC = (title: string) => {
//   return {
//     type: 'ADD-TODOLIST',
//     payload: {title}
//   } as const
// }
// export const removeTodolistAC = (todolistId: string) => {
//   return {
//     type: 'REMOVE-TODOLIST',
//     payload: {todolistId}
//   } as const
// }
// export const changeTodolistTitleAC = (todolistId: string, title: string) => {
//   return {
//     type: 'CHANGE-TODOLIST-TITLE',
//     payload: {todolistId, title}
//   } as const
// }
// export const changeTodolistFilterAC=(todolistId: string, filter: ChangeFilterType)=>{
//   return {
//     type: 'CHANGE-TODOLIST-FILTER',
//     payload:{todolistId, filter}
//   }as const
// }