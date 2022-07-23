import { createSlice } from '@reduxjs/toolkit'

import { isUserLoggedIn } from '../api'
import { UserDataState } from '../types/userData'

const initialState: UserDataState = {
  isLoggedIn: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(isUserLoggedIn.fulfilled, (state, { payload }) => {
      state.isLoggedIn = payload.isLoggedIn
    })
  }
})

export default userSlice
