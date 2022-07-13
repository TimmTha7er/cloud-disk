import { ThunkAction } from 'redux-thunk'
import { IUser } from '../../models/user'
import { RootState } from '..'

// action types
export enum UserActionTypes {
  SET_USER = 'user/SET_USER',
  LOGOUT = 'user/LOGOUT',
}

// reducer
export interface UserState {
  currentUser: IUser | null
  isAuth: Boolean
}

// actions
interface SetUser {
  type: typeof UserActionTypes.SET_USER
  payload: UserState['currentUser']
}

interface Logout {
  type: typeof UserActionTypes.LOGOUT
}

export type UserAction = SetUser | Logout

export type UserThunkAction = ThunkAction<void, RootState, null, UserAction>
