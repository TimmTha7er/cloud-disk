import { ThunkAction } from 'redux-thunk'
import { IUser } from '../../models/user'
import { RootState } from '..'

// action types
export enum UserActionTypes {
  SET_USER = 'user/SET_USER',
  LOGOUT = 'user/LOGOUT',
  SET_LOADING = 'user/SET_LOADING',
  SET_ERROR = 'user/SET_ERROR',
  SET_SUCCESS = 'user/SET_SUCCESS',
}

// reducer
export interface UserState {
  currentUser: IUser | null
  isAuth: Boolean
  loading: boolean
  error: []
  success: string
}

// actions
interface SetUser {
  type: typeof UserActionTypes.SET_USER
  payload: UserState['currentUser']
}

interface Logout {
  type: typeof UserActionTypes.LOGOUT
}

interface SetLoading {
  type: typeof UserActionTypes.SET_LOADING;
  payload: UserState['loading'];
}

interface SetError {
  type: typeof UserActionTypes.SET_ERROR;
  payload: UserState['error'];
}

interface SetSuccess {
  type: typeof UserActionTypes.SET_SUCCESS;
  payload: UserState['success'];
}

export type UserAction = SetUser | Logout | SetLoading | SetError | SetSuccess

export type UserThunkAction = ThunkAction<void, RootState, null, UserAction>
