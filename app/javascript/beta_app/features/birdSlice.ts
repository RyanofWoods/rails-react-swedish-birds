import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchBirds, createObservation, searchBirds, fetchOrders, fetchFamilies } from '../api'
import filterBirds from '../helpers/filter_birds'
import clickSortingColumn from '../helpers/click_sorting_column'
import { sortBirds } from '../helpers/sort_birds'
import { BirdColumn, BirdFilters, BirdWithOrWithoutObservation, State } from '../types'

const initialState: State = {
  birds: [],
  families: [],
  orders: [],
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

export const birdSlice = createSlice({
  name: 'bird',
  initialState,
  reducers: {
    updateFilters (state, action: PayloadAction<Partial<BirdFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
      state.filteredBirds = filterBirds({ birds: state.birds, filters: state.filters })
      state.sortedBirds = sortBirds({ birds: state.filteredBirds, sorting: state.sorting, primaryNameLanguage: state.userSettings.primaryNameLanguage })
    },
    resetFilters (state) {
      state.filters = initialState.filters
      state.filteredBirds = filterBirds({ birds: state.birds, filters: state.filters })
      state.sortedBirds = sortBirds({ birds: state.filteredBirds, sorting: state.sorting, primaryNameLanguage: state.userSettings.primaryNameLanguage })
    },
    updateSorting (state, action: PayloadAction<BirdColumn>) {
      state.sorting = clickSortingColumn({ sorting: state.sorting, clickedHeader: action.payload })
      state.sortedBirds = sortBirds({ birds: state.filteredBirds, sorting: state.sorting, primaryNameLanguage: state.userSettings.primaryNameLanguage })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBirds.fulfilled, (state, { payload }) => {
      state.birds = payload.birds
      state.filteredBirds = filterBirds({ birds: state.birds, filters: state.filters })
      state.sortedBirds = sortBirds({ birds: state.filteredBirds, sorting: state.sorting, primaryNameLanguage: state.userSettings.primaryNameLanguage })
    })
    builder.addCase(fetchFamilies.fulfilled, (state, { payload }) => {
      state.families = payload.families
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
      updateBirds(state.sortedBirds)
    })
    builder.addCase(searchBirds.pending, (state, action) => {
      state.filters.searchValue = action.meta.arg
    })
    builder.addCase(searchBirds.fulfilled, (state, { payload }) => {
      state.filters.searchScope = payload.birds
      state.filteredBirds = filterBirds({ birds: state.birds, filters: state.filters })
      state.sortedBirds = sortBirds({ birds: state.filteredBirds, sorting: state.sorting, primaryNameLanguage: state.userSettings.primaryNameLanguage })
    })
  }
})

export const { resetFilters, updateFilters, updateSorting } = birdSlice.actions
export default birdSlice
