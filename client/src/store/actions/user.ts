import { AxiosError } from 'axios'

import { AppDispatch } from '..'
import { IUser } from '../../models/user'
import AuthService from '../../services/AuthService'
import UserService from '../../services/UserService'
import { setUser, setError, setLoading } from '../reducers/user'

export const registration = (email: IUser['email'], password: string) => {
  return async (dispatch: AppDispatch) => {
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

export const login = (email: IUser['email'], password: string) => {
  return async (dispatch: AppDispatch) => {
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

export const checkAuth = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await AuthService.checkAuth()

      dispatch(setUser(response.data))
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setLoading(false))
    } catch (error) {
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
      localStorage.removeItem('token')
    }
  }
}

export const uploadAvatar = (file: File) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.uploadAvatar(file)

      dispatch(setUser(response.data))
    } catch (error) {
      console.warn(error)
    }
  }
}

export const deleteAvatar = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.deleteAvatar()

      dispatch(setUser(response.data))
    } catch (error) {
      console.error(error)
    }
  }
}
