import { AxiosError } from 'axios'
import { IUser } from '../../models/user'
import AuthService from '../../services/AuthService'
import UserService from '../../services/UserService'
import { UserAction, UserActionTypes, UserState, UserThunkAction } from '../types/user'

export const setUser = (user: UserState['currentUser']): UserAction => ({
  type: UserActionTypes.SET_USER,
  payload: user,
})

export const logout = (): UserAction => ({ type: UserActionTypes.LOGOUT })

export const registration = (
  email: IUser['email'],
  password: string
): UserThunkAction => {
  return async (dispatch) => {
    try {
      const response = await AuthService.registration(email, password)

      dispatch(setUser(response.data))
      localStorage.setItem('token', response.data.accessToken)
    } catch (error) {
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
    }
  }
}

export const login = (email: IUser['email'], password: string): UserThunkAction => {
  return async (dispatch) => {
    try {
      const response = await AuthService.login(email, password)

      dispatch(setUser(response.data))
      localStorage.setItem('token', response.data.accessToken)
    } catch (error) {
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
    }
  }
}

export const checkAuth = (): UserThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await AuthService.checkAuth()

      dispatch(setUser(response.data))
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setLoading(false))
    } catch (error) {
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`);
      localStorage.removeItem('token')
    }
  }
}

export const uploadAvatar = (file: File): UserThunkAction => {
  return async (dispatch) => {
    try {
      const response = await UserService.uploadAvatar(file)

      dispatch(setUser(response.data))
    } catch (error) {
      console.warn(error);
    }
  }
}

export const deleteAvatar = (): UserThunkAction => {
  return async (dispatch) => {
    try {
      const response = await UserService.deleteAvatar()

      dispatch(setUser(response.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const setLoading = (value: UserState['loading']): UserAction => {
  return {
    type: UserActionTypes.SET_LOADING,
    payload: value,
  };
};

export const setError = (msg: UserState['error']): UserAction => {
  return {
    type: UserActionTypes.SET_ERROR,
    payload: msg,
  };
};

export const setSuccess = (msg: UserState['success']): UserAction => {
  return {
    type: UserActionTypes.SET_SUCCESS,
    payload: msg,
  };
};