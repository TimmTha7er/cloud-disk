import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/user'
import fileReducer from './reducers/file'
import uploadReducer from './reducers/upload'

const rootReducer = combineReducers({
  files: fileReducer,
  upload: uploadReducer,
  user: userReducer,
})

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default setupStore
