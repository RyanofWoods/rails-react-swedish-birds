import React from 'react'

import SearchBar from './search_bar'
import SeenSpeciesFilter from './seen_species_filter'
import FamilyAndOrderFilter from './family_and_order_filter'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { resetFilters } from '../../features/speciesSlice'

const FilterGroup: React.FC = () => {
  const orders = useAppSelector(state => state.speciesData.orders)
  const families = useAppSelector(state => state.speciesData.families)
  const userSettings = useAppSelector(state => state.speciesData.userSettings)
  const selectedOrderOption = useAppSelector(state => state.speciesData.filters.orderScientificNameScope)
  const selectedFamilyOption = useAppSelector(state => state.speciesData.filters.familyScientificNameScope)
  const selectedSeenValue = useAppSelector(state => state.speciesData.filters.seenScope)
  const searchValue = useAppSelector(state => state.speciesData.filters.searchValue)

  const dispatch = useAppDispatch()

  const handleReset = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault()
    void dispatch(resetFilters())
  }

  return (
    <>
      <SeenSpeciesFilter selectedValue={selectedSeenValue} />
      <FamilyAndOrderFilter orders={orders} families={families} userSettings={userSettings} selectedOrderOption={selectedOrderOption} selectedFamilyOption={selectedFamilyOption} />
      <SearchBar searchValue={searchValue} />
      <div className='d-flex justify-content-end'>
        <button id='reset-filter' onClick={handleReset}>Reset filters</button>
      </div>
    </>
  )
}

export default FilterGroup
