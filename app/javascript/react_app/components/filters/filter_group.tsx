import React from 'react'

import SearchBar from './search_bar'
import SeenSpeciesFilter from './seen_species_filter'
import FamilyAndOrderFilter from './family_and_order_filter'
import { useAppDispatch } from '../../hooks'
import { resetFilters } from '../../features/speciesSlice'

const FilterGroup: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleReset = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault()
    void dispatch(resetFilters())
  }

  return (
    <>
      <SeenSpeciesFilter />
      <FamilyAndOrderFilter />
      <SearchBar />
      <div className='d-flex justify-content-end'>
        <button id='reset-filter' onClick={handleReset}>Reset filters</button>
      </div>
    </>
  )
}

export default FilterGroup
