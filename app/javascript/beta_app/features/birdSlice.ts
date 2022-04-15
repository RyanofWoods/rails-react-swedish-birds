import { createSlice } from '@reduxjs/toolkit'

import { fetchBirds, createObservation } from '../api'
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
    builder.addCase(createObservation.fulfilled, (state, { payload }) => {
      const birdToUpdateIndex = state.birds.findIndex(bird => bird.scientificName === payload.scientificName)
      state.birds[birdToUpdateIndex] = payload
    })
  }
})

export default birdSlice
