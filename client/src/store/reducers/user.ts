import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '../../shared/models/user'

interface UserState {
  currentUser: IUser | null
}

const initialState: UserState = {
  currentUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<UserState['currentUser']>) {
      state.currentUser = action.payload
    },
    logout(state: UserState) {
      localStorage.removeItem('token')
      state.currentUser = null
    },
  },
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
