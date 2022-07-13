import { ThunkAction } from 'redux-thunk'
import { IUploadFile } from '../../models/file'
import { RootState } from '..'

// action types
export enum UploadActionTypes {
  SHOW_UPLOADER = 'upload/SHOW_UPLOADER',
  HIDE_UPLOADER = 'upload/HIDE_UPLOADER',
  ADD_UPLOAD_FILE = 'upload/ADD_UPLOAD_FILE',
  REMOVE_UPLOAD_FILE = 'upload/REMOVE_UPLOAD_FILE',
  CHANGE_UPLOAD_FILE = 'upload/CHANGE_UPLOAD_FILE',
}

// reducer
export interface UploadState {
  isVisible: Boolean
  files: IUploadFile[]
}

// actions
interface ShowLoader {
  type: typeof UploadActionTypes.SHOW_UPLOADER
}

interface HideLoader {
  type: typeof UploadActionTypes.HIDE_UPLOADER
}

interface AddUploadFile {
  type: typeof UploadActionTypes.ADD_UPLOAD_FILE
  payload: IUploadFile
}

interface RemoveUploadFile {
  type: typeof UploadActionTypes.REMOVE_UPLOAD_FILE
  payload: IUploadFile['id']
}

interface ChangeUploadFile {
  type: typeof UploadActionTypes.CHANGE_UPLOAD_FILE
  payload: IUploadFile
}

export type UploadAction =
  | ShowLoader
  | HideLoader
  | AddUploadFile
  | RemoveUploadFile
  | ChangeUploadFile

export type UploadThunkAction = ThunkAction<void, RootState, null, UploadAction>
