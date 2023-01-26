import { TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistACType, RemoveTodolistACType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

export type tasksReducerType =
  | ReturnType<typeof addTaskAC>
  |  ReturnType<typeof removeTaskAC>
  | ReturnType<typeof changeTasksTitleAC>
  | ReturnType<typeof changeTasksStatusAC>
| AddTodolistACType
| RemoveTodolistACType



const initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: tasksReducerType): TasksStateType => {
  switch (action.type) {
    case'ADD-TASK':
      return {...state, [action.payload.todolistId]:[{id: v1(), title: action.payload.title, status: TaskStatuses.New,  order: 0, addedDate: '', todoListId:action.payload.todolistId, priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},...state[action.payload.todolistId]]}
    case 'REMOVE-TASK':
      return {...state, [action.payload.todolistId]:state[action.payload.todolistId].filter(t=>t.id!==action.payload.taskId)}
    case 'CHANGE-TASK-TITLE':
      return {...state, [action.payload.todolistId]:state[action.payload.todolistId].map(t=>t.id===action.payload.taskId ? {...t, title: action.payload.title} :t)}
    case 'CHANGE-TASK-FILTER':
      return {...state, [action.payload.todolistId]:state[action.payload.todolistId].map(t=>t.id===action.payload.taskId ? {...t, status: action.payload.status} :t)}
    case 'ADD-TODOLIST':
      return {...state, [action.payload.todolistId]:[]}
    case 'REMOVE-TODOLIST':{
      delete state[action.payload.todolistId]
      return {...state}
    }

    default:
      // throw new Error ('I don\'t understand this type')
      return state
  }
}

export const removeTaskAC = (todolistId: string, taskId:string,) => {
  return {
    type: 'REMOVE-TASK',
    payload: {todolistId, taskId}
  } as const
}

export const addTaskAC = (todolistId: string,title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {todolistId,title}
  } as const
}

export const changeTasksTitleAC = (todolistId: string, taskId: string, title: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {todolistId, taskId, title}
  } as const
}
export const changeTasksStatusAC=(todolistId: string, taskId: string,status: TaskStatuses)=>{
  return {
    type: 'CHANGE-TASK-FILTER',
    payload:{todolistId,taskId, status}
  }as const
}