import { createSlice } from '@reduxjs/toolkit'

import { fetchBirds } from '../api'
import { State } from '../types'

const initialState: State = {
  birds: []
}

export const birdSlice = createSlice({
  name: 'bird',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBirds.fulfilled, (state, { payload }) => {
      state.birds = payload.birds
    })
  }
})

export default birdSlice
