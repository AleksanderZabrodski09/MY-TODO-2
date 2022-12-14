import {TaskPropsType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

type TasksReducerActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof changeTaskStatusAC>
  | AddTodolistActionType
  | RemoveTodolistActionType


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
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.askId ? {
          ...t,
          title: action.payload.title
        } : t)
      }

    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.askId ? {
          ...t,
          isDone: action.payload.isDone
        } : t)
      }

    case 'REMOVE-TODOLIST':
      delete state[action.payload.todolistId]
      return {...state}
    case 'ADD-TODOLIST':
      return {...state, [action.payload.todolistId]: []}
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
  } as const
}
export const changeTaskStatusAC = (todolistId: string, askId: string, isDone: boolean) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {todolistId, askId, isDone}
  } as const
}
