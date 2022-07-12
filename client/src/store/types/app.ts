import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'

// action types
export enum AppActionTypes {
  SHOW_LOADER = 'SHOW_LOADER',
  HIDE_LOADER = 'HIDE_LOADER',
}

// reducer
export interface AppState {
  loader: Boolean
}

// actions
export interface ShowLoader {
  type: typeof AppActionTypes.SHOW_LOADER
}

interface HideLoader {
  type: typeof AppActionTypes.HIDE_LOADER
}

export type AppAction = ShowLoader | HideLoader

export type AppThunkAction = ThunkAction<void, RootState, null, AppAction>
