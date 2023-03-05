import {Provider} from 'react-redux';
import {AppRootReducerType} from '../app/store';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../features/tasks-reducer';
import {todolistsReducer} from '../features/todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

const rootReducer=combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const initialGlobalState = {
  todolists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'all',addedDate: '', order: 0,entityStatus:'idle' },
    {id: 'todolistId2', title: 'What to buy', filter: 'all',addedDate: '', order: 0,entityStatus:'idle' }
  ],
  tasks: {
    ['todolistId1']: [
      {id: v1(), title: 'HTML&CSS', status:TaskStatuses.New ,   order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: v1(), title: 'JS', status: TaskStatuses.Completed,   order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ],
    ['todolistId2']: [
      {id: v1(), title: 'Milk', status: TaskStatuses.New,  order: 0, addedDate: '', todoListId: 'todolistId2', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: v1(), title: 'React Book', status: TaskStatuses.Completed,  order: 0, addedDate: '', todoListId: 'todolistId2', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ]
  },
  app:{
    status:'loading',
    error:null,
  },
  auth:{
    isLoggedIn: false
  }
}



export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootReducerType)



export const ReduxStoreProviderDecorator = (storyFn:()=>JSX.Element)=>{
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}