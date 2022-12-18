import {combineReducers, legacy_createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';



const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const store = legacy_createStore(rootReducer)

export type AppRootReducerType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store