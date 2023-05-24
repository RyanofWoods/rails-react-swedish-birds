import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchBirds, createObservation, editObservation, searchBirds, fetchObservations, fetchOrders, fetchFamilies } from '../api'
import filterBirds from '../helpers/filter_birds'
import clickSortingColumn from '../helpers/click_sorting_column'
import { sortBirds } from '../helpers/sort_birds'
import { BirdColumn, BirdFilters, BirdWithOrWithoutObservation, BirdDataState, BirdScientificName, Observation } from '../types/birdData'

const initialState: BirdDataState = {
  birds: [],
  families: [],
  orders: [],
  observations: {},
  filteredBirds: [],
  filters: {
    searchScope: [],
    seenScope: 'all',
    orderScientificNameScope: null,
    familyScientificNameScope: null,
    searchValue: ''
  },
  sorting: {
    column: null,
    ordering: 'asc'
  },
  sortedBirds: [],
  userSettings: {
    primaryNameLanguage: 'SE',
    secondaryNameLanguage: 'EN'
  }
}

const refilterBirds = (state: BirdDataState): void => {
  state.filteredBirds = filterBirds({ birds: state.birds, filters: state.filters, observations: state.observations })
  resortBirds(state)
}

const resortBirds = (state: BirdDataState): void => {
  state.sortedBirds = sortBirds({ birds: state.filteredBirds, observations: state.observations, sorting: state.sorting, primaryNameLanguage: state.userSettings.primaryNameLanguage })
}

const updateAllBirds = (state: BirdDataState, updatedBird: BirdWithOrWithoutObservation): void => {
  updateBirds(state.birds, updatedBird)
  updateBirds(state.filteredBirds, updatedBird)
  updateBirds(state.sortedBirds, updatedBird)
}

const insertOrReplaceObservation = (state: BirdDataState, birdScientificName: BirdScientificName, observation: Observation): void => {
  state.observations[birdScientificName] = observation
}

const updateBirds = (birds: BirdWithOrWithoutObservation[], updatedBird: BirdWithOrWithoutObservation): void => {
  const birdToUpdateIndex = birds.findIndex(bird => bird.scientificName === updatedBird.scientificName)
  birds[birdToUpdateIndex] = updatedBird
}

export const birdSlice = createSlice({
  name: 'bird',
  initialState,
  reducers: {
    updateFilters (state, action: PayloadAction<Partial<BirdFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
      refilterBirds(state)
    },
    resetFilters (state) {
      state.filters = initialState.filters
      refilterBirds(state)
    },
    resetSearch (state) {
      state.filters.searchValue = ''
      state.filters.searchScope = []
      refilterBirds(state)
    },
    updateSorting (state, action: PayloadAction<BirdColumn>) {
      state.sorting = clickSortingColumn({ sorting: state.sorting, clickedHeader: action.payload })
      resortBirds(state)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBirds.fulfilled, (state, { payload }) => {
      state.birds = payload.birds
      refilterBirds(state)
    })
    builder.addCase(fetchFamilies.fulfilled, (state, { payload }) => {
      state.families = payload.families
    })
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      state.orders = payload.orders
    })
    builder.addCase(fetchObservations.fulfilled, (state, { payload }) => {
      state.observations = payload.observations
    })
    builder.addCase(createObservation.fulfilled, (state, { payload }) => {
      updateAllBirds(state, payload)
      insertOrReplaceObservation(state, payload.scientificName, payload.observation)
    })
    builder.addCase(editObservation.fulfilled, (state, { payload }) => {
      updateAllBirds(state, payload)
      insertOrReplaceObservation(state, payload.scientificName, payload.observation)
    })
    builder.addCase(searchBirds.pending, (state, action) => {
      state.filters.searchValue = action.meta.arg
    })
    builder.addCase(searchBirds.fulfilled, (state, { payload }) => {
      state.filters.searchScope = payload.birds
      refilterBirds(state)
    })
  }
})

export const { resetFilters, resetSearch, updateFilters, updateSorting } = birdSlice.actions
export default birdSlice
