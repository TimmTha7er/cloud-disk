import FileService from '../../services/FileService'
import {
  FileActionTypes,
  FileThunkAction,
  FileState,
  FileAction,
} from '../types/file'
import { IFile, FilesSort } from '../../models/file'
import { AxiosError } from 'axios'

export const setFiles = (files: FileState['files']): FileAction => ({
  type: FileActionTypes.SET_FILES,
  payload: files,
})

export const setCurrentDir = (dir: FileState['currentDir']): FileAction => ({
  type: FileActionTypes.SET_CURRENT_DIR,
  payload: dir,
})

export const addFile = (file: IFile): FileAction => ({
  type: FileActionTypes.ADD_FILE,
  payload: file,
})

export const setPopupDisplay = (display: FileState['popupDisplay']): FileAction => ({
  type: FileActionTypes.SET_POPUP_DISPLAY,
  payload: display,
})

export const pushToStack = (dir: FileState['currentDir']): FileAction => ({
  type: FileActionTypes.PUSH_TO_STACK,
  payload: dir,
})

export const deleteFileAction = (dirId: IFile['id']): FileAction => ({
  type: FileActionTypes.DELETE_FILE,
  payload: dirId,
})

export const setFileView = (view: FileState['view']): FileAction => ({
  type: FileActionTypes.SET_VIEW,
  payload: view,
})

export const setDefault = (): FileAction => ({ type: FileActionTypes.SET_DEFAULT })

export const getFiles = (dirId: IFile['id'] | null, sort?: FilesSort): FileThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const response = await FileService.getFiles(dirId, sort)

      dispatch(setFiles(response.data))
    } catch (error) {
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`);
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const createDir = (dirId: IFile['id'] | null, name: IFile['name']): FileThunkAction => {
  return async (dispatch) => {
    try {
      const response = await FileService.createDir(dirId, name)

      dispatch(addFile(response.data))
    } catch (error) {
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`);
    }
  }
}

export const uploadFile = (file: File, dirId: IFile['id']  | null): FileThunkAction => {
  return async (dispatch) => {
    try {
      const response = await FileService.uploadFile(file, dirId, dispatch)

      dispatch(addFile(response.data))
    } catch (error) {
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`);
    }
  }
}

export const downloadFile = async (file: IFile) => {
  await FileService.downloadFile(file)
}

export const deleteFile = (file: IFile): FileThunkAction => {
  return async (dispatch) => {
    try {
      const response = await FileService.deleteFile(file.id)

      dispatch(deleteFileAction(file.id))
      console.error(response.data.message)
    } catch (error: any) {
      console.log('dfd', {...error})
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`);
    }
  }
}

export const searchFiles = (search: string): FileThunkAction => {
  return async (dispatch) => {
    try {
      const response = await FileService.searchFiles(search)

      dispatch(setFiles(response.data))
    } catch (error) {
      dispatch(setError((error as AxiosError)?.response?.data?.errors))
      console.warn(`Error: ${(error as AxiosError)?.response?.data?.message}`);
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const setLoading = (value: FileState['loading']): FileAction => {
  return {
    type: FileActionTypes.SET_LOADING,
    payload: value,
  };
};

export const setError = (msg: FileState['error']): FileAction => {
  return {
    type: FileActionTypes.SET_ERROR,
    payload: msg,
  };
};

export const setSuccess = (msg: FileState['success']): FileAction => {
  return {
    type: FileActionTypes.SET_SUCCESS,
    payload: msg,
  };
};