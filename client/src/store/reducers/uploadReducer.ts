import { UploadAction, UploadActionTypes, UploadState } from '../types/upload'

const initialState: UploadState = {
  isVisible: false,
  files: [],
}

export default function userReducer(
  state = initialState,
  action: UploadAction
): UploadState {
  switch (action.type) {
    case UploadActionTypes.SHOW_UPLOADER: {
      return { ...state, isVisible: true }
    }

    case UploadActionTypes.HIDE_UPLOADER: {
      return { ...state, isVisible: false }
    }

    case UploadActionTypes.ADD_UPLOAD_FILE: {
      return {
        ...state,
        files: [...state.files, action.payload],
      }
    }

    case UploadActionTypes.REMOVE_UPLOAD_FILE: {
      return {
        ...state,
        files: [...state.files.filter((file) => file.id !== action.payload)],
      }
    }

    case UploadActionTypes.CHANGE_UPLOAD_FILE: {
      return {
        ...state,
        files: [
          ...state.files.map((file) =>
            file.id === action.payload.id
              ? { ...file, progress: action.payload.progress }
              : { ...file }
          ),
        ],
      }
    }

    default:
      return state
  }
}
