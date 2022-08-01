import { ThunkAction } from 'redux-thunk';
import { FilesView, IFile } from '../../models/file';
import { RootState } from '..';


// action types
export enum FileActionTypes {
	SET_FILES = 'file/SET_FILES',
	SET_CURRENT_DIR = 'file/SET_CURRENT_DIR',
	ADD_FILE = 'file/ADD_FILE',
	SET_POPUP_DISPLAY = 'file/SET_POPUP_DISPLAY',
	DELETE_FILE = 'file/DELETE_FILE',
	SET_VIEW = 'file/SET_VIEW',
	SET_DEFAULT = 'file/SET_DEFAULT',
  SET_LOADING = 'file/SET_LOADING',
  SET_ERROR = 'file/SET_ERROR',
  SET_SUCCESS = 'file/SET_SUCCESS',
}

// reducer
export interface FileState {
	files: IFile[],
  currentDir: string | null,
	popupDisplay: 'none' | 'flex',
  view: FilesView,
  loading: boolean
  error: { value: string, msg: string }[]
  success: string
}

// actions
interface SetFiles {
  type: typeof FileActionTypes.SET_FILES;
	payload: FileState['files'];
}

interface SetCurrentDir {
  type: typeof FileActionTypes.SET_CURRENT_DIR;
	payload: FileState['currentDir'];
}

interface AddFile {
  type: typeof FileActionTypes.ADD_FILE;
	payload: IFile;
}

interface SetPopupDisplay {
  type: typeof FileActionTypes.SET_POPUP_DISPLAY;
	payload: FileState['popupDisplay'];
}

interface DeleteFile {
  type: typeof FileActionTypes.DELETE_FILE;
	payload: String;
}

interface SetView {
  type: typeof FileActionTypes.SET_VIEW;
	payload: FileState['view'];
}

interface SetDefault {
  type: typeof FileActionTypes.SET_DEFAULT;
}

interface SetLoading {
  type: typeof FileActionTypes.SET_LOADING
  payload: FileState['loading']
}

interface SetError {
  type: typeof FileActionTypes.SET_ERROR;
  payload: FileState['error']
}

interface SetSuccess {
  type: typeof FileActionTypes.SET_SUCCESS;
  payload: FileState['success']
}

export type FileAction =
  | SetFiles
  | SetCurrentDir
  | AddFile
  | SetPopupDisplay
  | DeleteFile
  | SetView
  | SetDefault 
  | SetLoading 
  | SetError 
  | SetSuccess

export type FileThunkAction = ThunkAction<void, RootState, null, FileAction>;