import {Dispatch} from 'redux';
import {AppActionsType, setAppErrorAC, setLoadingStatusAC} from '../app/app-reducer';
import {ResponseType} from '../api/todolist-api';


export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppErrorAC(error.message))
  dispatch(setLoadingStatusAC('failed'))
}


//  generic function

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setLoadingStatusAC('failed'))
}
type ErrorUtilsDispatchType = Dispatch<AppActionsType>
