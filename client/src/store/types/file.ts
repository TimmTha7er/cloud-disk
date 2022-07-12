import { ThunkAction } from 'redux-thunk';
import { IFile } from '../../models/IFile';
import { RootState } from '../store';
import { AppAction } from './app';


// action types
export enum FileActionTypes {
	SET_FILES = 'SET_FILES',
	SET_CURRENT_DIR = 'SET_CURRENT_DIR',
	ADD_FILE = 'ADD_FILE',
	SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY',
	PUSH_TO_STACK = 'PUSH_TO_STACK',
	DELETE_FILE = 'DELETE_FILE',
	SET_VIEW = 'SET_VIEW',
	SET_DEFAULT = 'SET_DEFAULT',
}

// reducer
export interface FileState {
	files: IFile[],
  currentDir: String | null,
	popupDisplay: 'none' | 'flex',
  // TODO : ??
  dirStack: String[] | [],
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
	// TODO
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