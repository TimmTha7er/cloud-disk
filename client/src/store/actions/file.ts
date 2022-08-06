import { AxiosError } from 'axios'

import FileService from '../../services/FileService'
import { IFile, FilesSort } from '../../models/file'
import { AppDispatch } from '..'
import {
  setLoading,
  setFiles,
  setError,
  addFile,
  deleteFile as deleteFileAction,
} from '../reducers/file'

export const getFiles = (dirId: IFile['id'] | null, sort?: FilesSort) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true))

      const response = await FileService.getFiles(dirId, sort)

      console.log('response', response)

      dispatch(setFiles(response.data))
    } catch (error) {
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const createDir = (dirId: IFile['id'] | null, name: IFile['name']) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await FileService.createDir(dirId, name)

      dispatch(addFile(response.data))
    } catch (error) {
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
    }
  }
}

export const uploadFile = (file: File, dirId: IFile['id'] | null) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await FileService.uploadFile(file, dirId, dispatch)

      dispatch(addFile(response.data))
    } catch (error) {
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
    }
  }
}

export const downloadFile = async (file: IFile) => {
  await FileService.downloadFile(file)
}

export const deleteFile = (file: IFile) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await FileService.deleteFile(file.id)

      dispatch(deleteFileAction(file.id))
      console.error(response.data.message)
    } catch (error: any) {
      console.log('dfd', { ...error })
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
    }
  }
}

export const searchFiles = (search: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await FileService.searchFiles(search)

      dispatch(setFiles(response.data))
    } catch (error) {
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`)
    } finally {
      dispatch(setLoading(false))
    }
  }
}
