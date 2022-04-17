import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchBirds, createObservation, searchBirds, fetchOrders } from '../api'
import filterBirds from '../helpers/filter_birds'
import { BirdFilters, BirdWithOrWithoutObservation, State } from '../types'

const initialState: State = {
  birds: [],
  orders: [],
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
  reducers: {
    updateFilters (state, action: PayloadAction<Partial<BirdFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters (state) {
      state.filters = initialState.filters
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBirds.fulfilled, (state, { payload }) => {
      state.birds = payload.birds
      state.filteredBirds = filterBirds({ birds: state.birds, filters: state.filters })
    })
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      state.orders = payload.orders
    })
    builder.addCase(createObservation.fulfilled, (state, { payload }) => {
      const updateBirds = (birds: BirdWithOrWithoutObservation[]): void => {
        const birdToUpdateIndex = birds.findIndex(bird => bird.scientificName === payload.scientificName)
        birds[birdToUpdateIndex] = payload
      }
      updateBirds(state.birds)
      updateBirds(state.filteredBirds)
    })
    builder.addCase(searchBirds.fulfilled, (state, { payload }) => {
      state.filters.searchScope = payload.birds
      state.filteredBirds = filterBirds({ birds: state.birds, filters: state.filters })
    })
  }
})

export default birdSlice
