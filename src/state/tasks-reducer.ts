import {TasksStateType} from '../App';
import {AddTodolistACType, RemoveTodolistACType, SetTodolistActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootReducerType} from './store';

export type TasksReducerType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  // | ReturnType<typeof changeTasksTitleAC>
  // | ReturnType<typeof changeTasksStatusAC>
  | AddTodolistACType
  | RemoveTodolistACType
  | SetTodolistActionType
  | SetTasksACType
  | ReturnType<typeof updateTasksAC>
export type SetTasksACType = ReturnType<typeof setTasksAC>


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
        ...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
      }
    // return {
    //   ...state,
    //   [action.payload.todolistId]: [{
    //     id: v1(),
    //     title: action.payload.title,
    //     status: TaskStatuses.New,
    //     order: 0,
    //     addedDate: '',
    //     todoListId: action.payload.todolistId,
    //     priority: TaskPriorities.Hi,
    //     startDate: '',
    //     deadline: '',
    //     description: ''
    //   }, ...state[action.payload.todolistId]]
    // }
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
      }
    // case 'CHANGE-TASK-TITLE':
    //   return {
    //     ...state,
    //     [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
    //       ...t,
    //       title: action.payload.title
    //     } : t)
    //   }
    // case 'CHANGE-TASK-FILTER':
    //   return {
    //     ...state,
    //     [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
    //       ...t,
    //       status: action.payload.status
    //     } : t)
    //   }
      case 'UPDATE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
          ...t,
         ... action.payload.model
        } : t)
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

export const removeTaskAC = (todolistId: string, taskId: string,) => {
  return {
    type: 'REMOVE-TASK',
    payload: {todolistId, taskId}
  } as const
}

export const addTaskAC = (task: TaskType) => {
  return {
    type: 'ADD-TASK',
    payload: {task}
  } as const
}

// export const changeTasksTitleAC = (todolistId: string, taskId: string, title: string) => {
//   return {
//     type: 'CHANGE-TASK-TITLE',
//     payload: {todolistId, taskId, title}
//   } as const
// }
// export const changeTasksStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
//   return {
//     type: 'CHANGE-TASK-FILTER',
//     payload: {todolistId, taskId, status}
//   } as const
// }
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

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTask(todolistId)
      .then((res) => {
        dispatch(setTasksAC(todolistId, res.items))
      })
  }
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTask(todolistId, taskId)
    .then((res) => {
      dispatch(removeTaskAC(todolistId, taskId))
    })
}
export const addTaskTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
      .then((res) => {
        const item = res.data.item
        dispatch(addTaskAC(item))
      })
  }
}

type UpdatePropertyModelType ={
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}


export const updateTaskTC = (todolistId: string, taskId: string,
                             // status: TaskStatuses
                             propertyModel:UpdatePropertyModelType
) => {
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

      todolistAPI.updateTask(todolistId, taskId, model)
        .then((res) => {
          dispatch(updateTasksAC(todolistId, taskId, propertyModel))
        })
    }
  }
}
