// import {ChangeFilterType, TodolistsPropsType} from '../App';
// import {v1} from 'uuid';
//
// export type TodolistsReducerType =
//   | RemoveTodolistActionType
//   | AddTodolistActionType
//   // | ChangeTodolistTitle
//   | ReturnType<typeof ChangeTodolistTitleAC>
//   // | ChangeTodolistFilter
//   | ReturnType<typeof ChangeTodolistFilterAC>
//
// type RemoveTodolistActionType= ReturnType<typeof RemoveTodolistAC>
// type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
//
// export const todolistsReducer = (state: TodolistsPropsType[], action: TodolistsReducerType): TodolistsPropsType[] => {
//   switch (action.type) {
//     case 'REMOVE-TODOLIST':
//       return state.filter(tl => tl.todolistId !== action.payload.todolistId)
//     case 'ADD-TODOLIST': {
//       let newTodolistId = v1()
//       let newTodolist: TodolistsPropsType = {todolistId: newTodolistId, title: action.payload.title, filter: 'all'};
//       return [newTodolist, ...state]
//     }
//     case 'CHANGE-TODOLIST-TITLE':{
//       return state.map(tl=>tl.todolistId===action.payload.todolistId?{...tl, title:action.payload.title}:tl)
//     }
//   case 'CHANGE-TODOLIST-FILTER':
//       return state.map(tl=>tl.todolistId===action.payload.todolistId?{...tl, filter:action.payload.filter}:tl)
//
//
//     default:
//       // throw new Error('I don\'t understand this type')
//       return state
//   }
// }
//
// export const RemoveTodolistAC=(todolistId:string) =>{
//   return {
//     type: 'REMOVE-TODOLIST',
//     payload:{todolistId}} as const
// }
// export const AddTodolistAC=(title:string) =>{
//   return {
//     type: 'ADD-TODOLIST',
//     payload:{title}} as const
// }
// export const ChangeTodolistTitleAC=(todolistId:string,title:string) =>{
//   return {
//     type: 'CHANGE-TODOLIST-TITLE',
//   payload:{todolistId, title}
//   } as const
// }
// export const ChangeTodolistFilterAC=(todolistId:string,filter:ChangeFilterType) =>{
//   return {
//     type:'CHANGE-TODOLIST-FILTER',
//     payload:{todolistId, filter}
//   }as const
// }

import {TaskPropsType} from '../App';
import {v1} from 'uuid';

type TasksReducerActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof changeTaskStatusAC>


const initialState: TaskPropsType = {}
export const tasksReducer = (state = initialState, action: TasksReducerActionType): TaskPropsType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.payload.todolistId]: [{
          id: v1(),
          title: action.payload.title,
          isDone: false
        }, ...state[action.payload.todolistId]]
      }
    case 'CHANGE-TASK-TITLE':
      return {...state,[action.payload.todolistId]: state[action.payload.todolistId].map(t=>t.id===action.payload.askId?{...t, title:action.payload.title}:t)}

    case 'CHANGE-TASK-STATUS':
      return {...state,[action.payload.todolistId]: state[action.payload.todolistId].map(t=>t.id===action.payload.askId?{...t, isDone:action.payload.isDone}:t)}
    default:
      return state
  }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {todolistId, taskId}
  } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {todolistId, title}
  } as const
}

export const changeTaskTitleAC = (todolistId: string, askId: string, title: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {todolistId, askId, title}
  }as const
}
export const changeTaskStatusAC = (todolistId: string, askId: string, isDone: boolean) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {todolistId, askId, isDone}
  }as const
}
