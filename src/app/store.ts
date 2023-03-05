import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {todolistsReducer} from '../features/todolists-reducer';
import {tasksReducer} from '../features/tasks-reducer';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';



const rootReducer = combineReducers({
  auth:authReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootReducerType = ReturnType<typeof rootReducer>


type AppDispatchType=ThunkDispatch<AppRootReducerType, any, AnyAction>
export const AppDispatch = () => useDispatch<AppDispatchType>()
  
export const useAppSelector:TypedUseSelectorHook<AppRootReducerType>=useSelector

// @ts-ignore
window.store = store