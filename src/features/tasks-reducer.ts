
import {
  AddTodolistACType,
  changeEntityStatusAC,
  RemoveTodolistACType,
  SetTodolistActionType
} from './todolists-reducer';
import {
  ResultCode,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskModelType
} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootReducerType} from '../app/store';
import {AppActionsType, setAppErrorAC, setLoadingStatusAC} from '../app/app-reducer';


//  Reducer
const initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: TasksReducerType): TasksStateType => {
  switch (action.type) {
    case 'SET-TODOLIST': {
      let copyState: { [p: string]: TaskType[] }
      copyState = {...state}
      action.payload.todolists.forEach(tl => {
        copyState[tl.id] = []
      })
      return copyState
    }
    case 'SET-TASKS':
      return {...state, [action.payload.todolistId]: action.payload.tasks}
    case'ADD-TASK':
      return {
        ...state,
        [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
      }
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
      }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
      }
    case 'ADD-TODOLIST':
      return {...state, [action.payload.todolist.id]: []}
    case 'REMOVE-TODOLIST': {
      delete state[action.payload.todolistId]
      return {...state}
    }
    default:
      // throw new Error ('I don\'t understand this type')
      return state
  }
}


//  actions

export const removeTaskAC = (todolistId: string, taskId: string,) => ({type: 'REMOVE-TASK', payload: {todolistId, taskId}}as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', payload: {task}}as const)
export const updateTasksAC = (todolistId: string, taskId: string, model: UpdatePropertyModelType) => {
  return {
    type: 'UPDATE-TASK',
    payload: {todolistId, taskId, model}
  } as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
  return {
    type: 'SET-TASKS',
    payload: {todolistId, tasks}
  } as const
}

//  thunks
export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.getTask(todolistId)
      .then((res) => {
        dispatch(setTasksAC(todolistId, res.items))
        // dispatch(setLoadingStatusAC('succeeded'))
      })
      .finally(()=>{
        dispatch(setLoadingStatusAC('idle'))
      })
  }
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(setLoadingStatusAC('loading'))
  todolistAPI.deleteTask(todolistId, taskId)
    .then((res) => {
      dispatch(removeTaskAC(todolistId, taskId))
      dispatch(setLoadingStatusAC('succeeded'))
    })
}

export const addTaskTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
    todolistAPI.createTask(todolistId, title)
      .then((res) => {
        if(res.resultCode===ResultCode.SUCCEEDED){
          const item = res.data.item
          dispatch(addTaskAC(item))
          dispatch(setLoadingStatusAC('succeeded'))
          dispatch(changeEntityStatusAC(todolistId, 'succeeded'))

        }else{
          if(res.messages.length){
            dispatch(setAppErrorAC(res.messages[0]))
          }else{
            dispatch(setAppErrorAC('Some error occurred'))
          }
          dispatch(setLoadingStatusAC('failed'))
        }
      })
  }
}

type UpdatePropertyModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, propertyModel: UpdatePropertyModelType) => {
  return (dispatch: Dispatch, getState: () => AppRootReducerType) => {
    const tasks = getState().tasks
    const task = tasks[todolistId].find(t => t.id === taskId)
    if (task) {
      const model: UpdateTaskModelType = {
        // title: task.title,
        // description: task.description,
        // status: status,
        // priority: task.priority,
        // startDate: task.startDate,
        // deadline: task.deadline
        ...task,
        ...propertyModel
      }
      dispatch(setLoadingStatusAC('loading'))
      todolistAPI.updateTask(todolistId, taskId, model)
        .then((res) => {
          dispatch(updateTasksAC(todolistId, taskId, propertyModel))
          dispatch(setLoadingStatusAC('succeeded'))
        })
    }
  }
}


//  types

export type TasksStateType = {
  [key: string]: TaskType[]
}

export type TasksReducerType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | AddTodolistACType
  | RemoveTodolistACType
  | SetTodolistActionType
  | ReturnType<typeof updateTasksAC>
  | SetTasksACType
  | AppActionsType
export type SetTasksACType = ReturnType<typeof setTasksAC>