import { createSlice } from '@reduxjs/toolkit'

import { fetchBirds, createObservation } from '../api'
import { BirdWithOrWithoutObservation, State } from '../types'

const initialState: State = {
  birds: [],
  filteredBirds: [],
  filters: {
    searchScope: [],
    seenScope: 'all',
    orderScientificNameScope: null,
    familyScientificNameScope: null
  }
}

export const birdSlice = createSlice({
  name: 'bird',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBirds.fulfilled, (state, { payload }) => {
      state.birds = payload.birds
      state.filteredBirds = state.birds
    })
    builder.addCase(createObservation.fulfilled, (state, { payload }) => {
      const updateBirds = (birds: BirdWithOrWithoutObservation[]): void => {
        const birdToUpdateIndex = birds.findIndex(bird => bird.scientificName === payload.scientificName)
        birds[birdToUpdateIndex] = payload
      }
      updateBirds(state.birds)
      updateBirds(state.filteredBirds)
    })
  }
})

export default birdSlice
