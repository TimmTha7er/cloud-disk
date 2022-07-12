import { AppAction, AppActionTypes, AppState } from '../types/app'

const initialState: AppState = {
  loader: false,
}

export default function appReducer(
  state = initialState,
  action: AppAction
): AppState {
  switch (action.type) {
    case AppActionTypes.SHOW_LOADER: {
      return { ...state, loader: true }
    }
    case AppActionTypes.HIDE_LOADER: {
      return { ...state, loader: false }
    }
    default:
      return state
  }
}
