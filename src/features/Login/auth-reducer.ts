import {Dispatch} from 'redux';
import {AppActionsType, setLoadingStatusAC} from '../../app/app-reducer';
import {authAPI, LoginType, ResultCode} from '../../api/todolist-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;


const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}

//  actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//  thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch) => {
  dispatch(setLoadingStatusAC('loading'))

  try {
    const res = await authAPI.login(data)

    if (res.resultCode === ResultCode.SUCCEEDED) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setLoadingStatusAC('succeeded'))

    }else{
      handleServerAppError(res, dispatch)
    }
  } catch (e) {
    //@ts-ignore
    handleServerNetworkError(error, dispatch)
  }
}

//  types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType