import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '../../models/user'

interface UserState {
  currentUser: IUser | null
  isAuth: Boolean
  loading: boolean
  error: { value: string; msg: string }[]
  success: string
}

const initialState: UserState = {
  currentUser: null,
  isAuth: false,
  loading: true,
  error: [],
  success: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<UserState['currentUser']>) {
      state.currentUser = action.payload
      state.isAuth = true
      state.loading = false
      state.error = []
    },
    logout(state: UserState) {
      localStorage.removeItem('token')

      // ??
      state.currentUser = null
      state.isAuth = false
      state.loading = false
      state.error = []
      state.success = ''
    },
    setLoading(state: UserState, action: PayloadAction<UserState['loading']>) {
      state.loading = action.payload
      state.error = []
    },
    setError(state: UserState, action: PayloadAction<UserState['error']>) {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setUser, logout, setLoading, setError } = userSlice.actions

export default userSlice.reducer
