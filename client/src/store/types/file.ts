import { ThunkAction } from 'redux-thunk';
import { IFile } from '../../models/file';
import { RootState } from '..';
import { AppAction } from './app';


// action types
export enum FileActionTypes {
	SET_FILES = 'file/SET_FILES',
	SET_CURRENT_DIR = 'file/SET_CURRENT_DIR',
	ADD_FILE = 'file/ADD_FILE',
	SET_POPUP_DISPLAY = 'file/SET_POPUP_DISPLAY',
	PUSH_TO_STACK = 'file/PUSH_TO_STACK',
	DELETE_FILE = 'file/DELETE_FILE',
	SET_VIEW = 'file/SET_VIEW',
	SET_DEFAULT = 'file/SET_DEFAULT',
}

// reducer
export interface FileState {
	files: IFile[],
  currentDir: string | null,
	popupDisplay: 'none' | 'flex',
  dirStack: [],
  view: 'list' | 'plate',
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

interface PushToStack {
  type: typeof FileActionTypes.PUSH_TO_STACK;
	payload: FileState['currentDir'];
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

export type FileAction =
  | SetFiles
  | SetCurrentDir
  | AddFile
  | SetPopupDisplay
  | PushToStack
  | DeleteFile
  | SetView
  | SetDefault
  | AppAction;

export type FileThunkAction = ThunkAction<void, RootState, null, FileAction>;