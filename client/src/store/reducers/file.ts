import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilesView, IFile } from '../../models/file'

export interface FileState {
  files: IFile[]
  currentDir: string | null
  popupDisplay: 'none' | 'flex'
  view: FilesView
  loading: boolean
  error: { value: string; msg: string }[]
  success: string
}

const initialState: FileState = {
  files: [],
  currentDir: null,
  popupDisplay: 'none',
  view: FilesView.list,
  loading: true,
  error: [],
  success: '',
}

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFiles(state: FileState, action: PayloadAction<FileState['files']>) {
      state.files = action.payload
      state.loading = false
      state.error = []
    },
    setCurrentDir(
      state: FileState,
      action: PayloadAction<FileState['currentDir']>
    ) {
      state.currentDir = action.payload
    },
    addFile(state: FileState, action: PayloadAction<IFile>) {
      state.files.push(action.payload)
    },
    setPopupDisplay(
      state: FileState,
      action: PayloadAction<FileState['popupDisplay']>
    ) {
      state.popupDisplay = action.payload
    },
    deleteFile(state: FileState, action: PayloadAction<IFile['id']>) {
      state.files = state.files.filter((file) => file.id !== action.payload)
    },
    setView(state: FileState, action: PayloadAction<FileState['view']>) {
      state.view = action.payload
    },
    setDefault: () => initialState,
    setLoading(state: FileState, action: PayloadAction<FileState['loading']>) {
      state.loading = action.payload
      state.error = []
    },
    setError(state: FileState, action: PayloadAction<FileState['error']>) {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  setFiles,
  setCurrentDir,
  addFile,
  setPopupDisplay,
  deleteFile,
  setView,
  setDefault,
  setLoading,
  setError,
} = fileSlice.actions

export default fileSlice.reducer
