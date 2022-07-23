import { UserAction, UserActionTypes, UserState } from '../types/user'

const initialState: UserState = {
  currentUser: null,
  isAuth: false,
  loading: true,
  error: [],
  success: '',
}

export default function userReducer(
  state = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case UserActionTypes.SET_USER: {
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
        loading: false,
        error: [],
      }
    }

    case UserActionTypes.LOGOUT: {
      localStorage.removeItem('token')

      return {
        ...initialState,
        loading: false,
        error: [],
      }
    }
    
    case UserActionTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
        error: [],
      }
    }

    case UserActionTypes.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    }

    default:
      return state
  }
}
