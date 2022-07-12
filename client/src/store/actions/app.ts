import { AppActionTypes, AppAction } from '../types/app'

export const showLoader = (): AppAction => ({
  type: AppActionTypes.SHOW_LOADER,
})

export const hideLoader = (): AppAction => ({
  type: AppActionTypes.HIDE_LOADER,
})
