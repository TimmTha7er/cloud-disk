import { IUploadFile } from '../../models/file'
import { UploadAction, UploadActionTypes } from '../types/upload'

export const showUploader = (): UploadAction => ({
  type: UploadActionTypes.SHOW_UPLOADER,
})

export const hideUploader = (): UploadAction => ({
  type: UploadActionTypes.HIDE_UPLOADER,
})

export const addUploadFile = (file: IUploadFile): UploadAction => ({
  type: UploadActionTypes.ADD_UPLOAD_FILE,
  payload: file,
})

export const removeUploadFile = (fileId: IUploadFile['id']) => ({
  type: UploadActionTypes.REMOVE_UPLOAD_FILE,
  payload: fileId,
})

export const changeUploadFile = (payload: IUploadFile) => ({
  type: UploadActionTypes.CHANGE_UPLOAD_FILE,
  payload: payload,
})
