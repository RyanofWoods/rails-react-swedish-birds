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
      const updateBirds = (birds: BirdWithOrWithoutObservation[]): void => {
        const birdToUpdateIndex = birds.findIndex(bird => bird.scientificName === payload.scientificName)
        birds[birdToUpdateIndex] = payload
      }
      updateBirds(state.birds)
    })
  }
})

export default birdSlice
