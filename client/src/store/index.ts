import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import fileReducer from './reducers/fileReducer'
import uploadReducer from './reducers/uploadReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
  files: fileReducer,
  upload: uploadReducer,
  user: userReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof rootReducer>
export default store