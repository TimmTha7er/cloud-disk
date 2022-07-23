import { FilesView } from '../../models/file'
import { FileAction, FileState, FileActionTypes } from '../types/file'

const initialState: FileState = {
  files: [],
  currentDir: null,
  popupDisplay: 'none',
  dirStack: [],
  view: FilesView.list,
  loading: true,
  error: [],
  success: '',
}

export default function fileReducer(
  state = initialState,
  action: FileAction
): FileState {
  switch (action.type) {
    case FileActionTypes.SET_FILES: {
      return { 
        ...state, 
        files: action.payload,
        loading: false,
        error: [],
      }
    }

    case FileActionTypes.SET_CURRENT_DIR: {
      return { ...state, currentDir: action.payload }
    }

    case FileActionTypes.ADD_FILE: {
      return { ...state, files: [...state.files, action.payload] }
    }

    case FileActionTypes.SET_POPUP_DISPLAY: {
      return { ...state, popupDisplay: action.payload }
    }

    case FileActionTypes.PUSH_TO_STACK: {
      // @ts-ignore: Unreachable code error
      return { ...state, dirStack: [...state.dirStack, action.payload] }
    }

    case FileActionTypes.DELETE_FILE: {
      return {
        ...state,
        files: [...state.files.filter((file) => file.id !== action.payload)],
      }
    }
    
    case FileActionTypes.SET_VIEW: {
      return { ...state, view: action.payload }
    }

    case FileActionTypes.SET_DEFAULT: {
      return initialState
    }

    case FileActionTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
        error: [],
      }
    }

    case FileActionTypes.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    }

    default:
      return state
  }
}
