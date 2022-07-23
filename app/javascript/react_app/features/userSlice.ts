import { createSlice } from '@reduxjs/toolkit'

import { UserDataState } from '../types/userData'

const initialState: UserDataState = {
  isLoggedIn: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})

export default userSlice
