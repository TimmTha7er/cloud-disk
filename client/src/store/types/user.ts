import { ThunkAction } from 'redux-thunk';
import { IUser } from '../../models/IUser';
import { RootState } from '../store';


// action types
export enum UserActionTypes {
	SET_USER = 'SET_USER',
	LOGOUT = 'LOGOUT',
}

// reducer
export interface UserState {
	currentUser: IUser | {},
  isAuth: Boolean,
}

// actions
interface SetUser {
  type: typeof UserActionTypes.SET_USER;
	payload: UserState['currentUser'];
}

interface Logout {
  type: typeof UserActionTypes.LOGOUT;
}

export type UserAction =
  | SetUser
  | Logout;

export type UserThunkAction = ThunkAction<void, RootState, null, UserAction>;