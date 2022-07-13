import { ThunkAction } from 'redux-thunk'
import { RootState } from '..'

// action types
export enum AppActionTypes {
  SHOW_LOADER = 'app/SHOW_LOADER',
  HIDE_LOADER = 'app/HIDE_LOADER',
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
