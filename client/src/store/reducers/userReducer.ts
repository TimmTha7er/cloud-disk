import { UserAction, UserActionTypes, UserState } from '../types/user'

const initialState: UserState = {
  currentUser: null,
  isAuth: false,
  loading: true,
  error: { message: '' },
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
        loading: false
      }
    }
    case UserActionTypes.LOGOUT: {
      localStorage.removeItem('token')

      return {
        ...initialState,
        loading: false,
      }
    }
    case UserActionTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    default:
      return state
  }
}
