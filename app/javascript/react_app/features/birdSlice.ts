import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchBirds, createObservation, editObservation, searchBirds, fetchObservations, fetchOrders, fetchFamilies } from '../api'
import filterBirds from '../helpers/filter_birds'
import clickSortingColumn from '../helpers/click_sorting_column'
import { sortBirds } from '../helpers/sort_birds'
import { SpeciesColumn, SpeciesFilters, SpeciesDataState, SpeciesScientificName, Observation } from '../types/birdData'

const initialState: SpeciesDataState = {
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

const refilterBirds = (state: SpeciesDataState): void => {
  state.filteredBirds = filterBirds({ birds: state.birds, filters: state.filters, observations: state.observations })
  resortBirds(state)
}

const resortBirds = (state: SpeciesDataState): void => {
  state.sortedBirds = sortBirds({ birds: state.filteredBirds, observations: state.observations, sorting: state.sorting, primaryNameLanguage: state.userSettings.primaryNameLanguage })
}

const insertOrReplaceObservation = (state: SpeciesDataState, birdScientificName: SpeciesScientificName, observation: Observation): void => {
  state.observations[birdScientificName] = observation
}

export const birdSlice = createSlice({
  name: 'bird',
  initialState,
  reducers: {
    updateFilters (state, action: PayloadAction<Partial<SpeciesFilters>>) {
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
    updateSorting (state, action: PayloadAction<SpeciesColumn>) {
      state.sorting = clickSortingColumn({ sorting: state.sorting, clickedHeader: action.payload })
      resortBirds(state)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBirds.fulfilled, (state, { payload }) => {
      state.birds = payload.species
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
      insertOrReplaceObservation(state, payload.birdScientificName, payload.observation)
    })
    builder.addCase(editObservation.fulfilled, (state, { payload }) => {
      insertOrReplaceObservation(state, payload.birdScientificName, payload.observation)
    })
    builder.addCase(searchBirds.pending, (state, action) => {
      state.filters.searchValue = action.meta.arg
    })
    builder.addCase(searchBirds.fulfilled, (state, { payload }) => {
      state.filters.searchScope = payload.species
      refilterBirds(state)
    })
  }
})

export const { resetFilters, resetSearch, updateFilters, updateSorting } = birdSlice.actions
export default birdSlice
