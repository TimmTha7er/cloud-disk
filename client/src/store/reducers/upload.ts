import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUploadFile } from '../../models/file'

export interface UploadState {
  isVisible: Boolean
  files: IUploadFile[]
}

const initialState: UploadState = {
  isVisible: false,
  files: [],
}

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    showUploader(state: UploadState) {
      state.isVisible = true
    },
    hideUploader(state: UploadState) {
      state.isVisible = false
    },
    addUploadFile(state: UploadState, action: PayloadAction<IUploadFile>) {
      state.files.push(action.payload)
    },
    removeUploadFile(
      state: UploadState,
      action: PayloadAction<IUploadFile['id']>
    ) {
      state.files = state.files.filter((file) => file.id !== action.payload)
    },
    changeUploadFile(state: UploadState, action: PayloadAction<IUploadFile>) {
      state.files = state.files.map((file) =>
        file.id === action.payload.id
          ? { ...file, progress: action.payload.progress }
          : { ...file }
      )
    },
  },
})

export const {
  showUploader,
  hideUploader,
  addUploadFile,
  removeUploadFile,
  changeUploadFile,
} = uploadSlice.actions

export default uploadSlice.reducer
