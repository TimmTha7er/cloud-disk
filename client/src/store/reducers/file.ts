import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilesView, FilesSort } from '../../shared/models/file'

export interface FileState {
  currentDir: string | null
  popupDisplay: 'none' | 'flex'
  view: FilesView
  sort: FilesSort
}

const initialState: FileState = {
  currentDir: null,
  popupDisplay: 'none',
  view: FilesView.list,
  sort: FilesSort.name
}

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setCurrentDir(
      state: FileState,
      action: PayloadAction<FileState['currentDir']>
    ) {
      state.currentDir = action.payload
    },
    setPopupDisplay(
      state: FileState,
      action: PayloadAction<FileState['popupDisplay']>
    ) {
      state.popupDisplay = action.payload
    },
    setView(state: FileState, action: PayloadAction<FileState['view']>) {
      state.view = action.payload
    },
    setSort(state: FileState, action: PayloadAction<FileState['sort']>) {
      state.sort = action.payload
    },
    setDefault: () => initialState,
  },
})

export const {
  setCurrentDir,
  setPopupDisplay,
  setView,
  setDefault,
  setSort,
} = fileSlice.actions

export default fileSlice.reducer
