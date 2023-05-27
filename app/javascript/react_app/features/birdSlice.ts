import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchSpecies, createObservation, editObservation, searchSpecies, fetchObservations, fetchOrders, fetchFamilies } from '../api'
import filterSpecies from '../helpers/filter_species'
import clickSortingColumn from '../helpers/click_sorting_column'
import { sortSpecies } from '../helpers/sort_species'
import { SpeciesColumn, SpeciesFilters, SpeciesDataState, SpeciesScientificName, Observation } from '../types/speciesData'

const initialState: SpeciesDataState = {
  species: [],
  families: [],
  orders: [],
  observations: {},
  filteredSpecies: [],
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
  sortedSpecies: [],
  userSettings: {
    primaryNameLanguage: 'SE',
    secondaryNameLanguage: 'EN'
  }
}

const refilterSpecies = (state: SpeciesDataState): void => {
  state.filteredSpecies = filterSpecies({ species: state.species, filters: state.filters, observations: state.observations })
  resortSpecies(state)
}

const resortSpecies = (state: SpeciesDataState): void => {
  state.sortedSpecies = sortSpecies({ species: state.filteredSpecies, observations: state.observations, sorting: state.sorting, primaryNameLanguage: state.userSettings.primaryNameLanguage })
}

const insertOrReplaceObservation = (state: SpeciesDataState, speciesScientificName: SpeciesScientificName, observation: Observation): void => {
  state.observations[speciesScientificName] = observation
}

export const birdSlice = createSlice({
  name: 'bird',
  initialState,
  reducers: {
    updateFilters (state, action: PayloadAction<Partial<SpeciesFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
      refilterSpecies(state)
    },
    resetFilters (state) {
      state.filters = initialState.filters
      refilterSpecies(state)
    },
    resetSearch (state) {
      state.filters.searchValue = ''
      state.filters.searchScope = []
      refilterSpecies(state)
    },
    updateSorting (state, action: PayloadAction<SpeciesColumn>) {
      state.sorting = clickSortingColumn({ sorting: state.sorting, clickedHeader: action.payload })
      resortSpecies(state)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSpecies.fulfilled, (state, { payload }) => {
      state.species = payload.species
      refilterSpecies(state)
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
      insertOrReplaceObservation(state, payload.speciesScientificName, payload.observation)
    })
    builder.addCase(editObservation.fulfilled, (state, { payload }) => {
      insertOrReplaceObservation(state, payload.speciesScientificName, payload.observation)
    })
    builder.addCase(searchSpecies.pending, (state, action) => {
      state.filters.searchValue = action.meta.arg
    })
    builder.addCase(searchSpecies.fulfilled, (state, { payload }) => {
      state.filters.searchScope = payload.species
      refilterSpecies(state)
    })
  }
})

export const { resetFilters, resetSearch, updateFilters, updateSorting } = birdSlice.actions
export default birdSlice
