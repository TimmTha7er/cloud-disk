import { IFile } from '../../models/IFile'
import { IUser } from '../../models/IUser'
import AuthService from '../../services/AuthService'
import UserService from '../../services/UserService'
import { UserAction, UserActionTypes, UserThunkAction } from '../types/user'

export const setUser = (user: IUser): UserAction => ({
  type: UserActionTypes.SET_USER,
  payload: user,
})

export const logout = (): UserAction => ({ type: UserActionTypes.LOGOUT })

export const registration = (
  email: string,
  password: string
): UserThunkAction => {
  return async (dispatch) => {
    try {
      const response = await AuthService.registration(email, password)

      dispatch(setUser(response.data))
      localStorage.setItem('token', response.data.accessToken)
      console.log(response.data)
    } catch (error) {
      // @ts-ignore: Unreachable code error
      console.error(error.response.data.message)
    }
  }
}

export const login = (email: string, password: string): UserThunkAction => {
  return async (dispatch) => {
    try {
      const response = await AuthService.login(email, password)

      dispatch(setUser(response.data))
      localStorage.setItem('token', response.data.accessToken)
      console.log(response.data)
    } catch (error) {
      // @ts-ignore: Unreachable code error
      console.error(error.response.data.message)
    }
  }
}

export const checkAuth = (): UserThunkAction => {
  return async (dispatch) => {
    try {
      const response = await AuthService.checkAuth()

      dispatch(setUser(response.data))
      localStorage.setItem('token', response.data.accessToken)
    } catch (error) {
      // @ts-ignore: Unreachable code error
      console.error(error.response.data.message)
      localStorage.removeItem('token')
    }
  }
}

export const uploadAvatar = (file: IFile): UserThunkAction => {
  return async (dispatch) => {
    try {
      const response = await UserService.uploadAvatar(file)

      dispatch(setUser(response.data))
    } catch (error) {
      console.error(error)
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
