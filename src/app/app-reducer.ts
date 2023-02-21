export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'faild'

const initialState = {
  status: 'loading' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    default:
      return {...state}
  }
}


export const setLoadingStatusAC = (status:RequestStatusType) => ({type: 'APP/SET-STATUS', status } as const)

type AppActionsType = | SetLoadingStatusType

type SetLoadingStatusType = ReturnType<typeof setLoadingStatusAC>
