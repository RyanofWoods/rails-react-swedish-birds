import React from 'react'

import SearchBar from './search_bar'
import SeenBirdsFilter from './seen_birds_filter'
import FamilyAndOrderFilter from './family_and_order_filter'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { resetFilters } from '../../features/birdSlice'

const FilterGroup: React.FC = () => {
  const orders = useAppSelector(state => state.birdsData.orders)
  const families = useAppSelector(state => state.birdsData.families)
  const userSettings = useAppSelector(state => state.birdsData.userSettings)
  const selectedOrderOption = useAppSelector(state => state.birdsData.filters.orderScientificNameScope)
  const selectedFamilyOption = useAppSelector(state => state.birdsData.filters.familyScientificNameScope)
  const selectedSeenValue = useAppSelector(state => state.birdsData.filters.seenScope)
  const searchValue = useAppSelector(state => state.birdsData.filters.searchValue)

  const dispatch = useAppDispatch()

  const handleReset = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault()
    void dispatch(resetFilters())
  }

  return (
    <>
      <SeenBirdsFilter selectedValue={selectedSeenValue} />
      <FamilyAndOrderFilter orders={orders} families={families} userSettings={userSettings} selectedOrderOption={selectedOrderOption} selectedFamilyOption={selectedFamilyOption} />
      <SearchBar searchValue={searchValue} />
      <div className='d-flex justify-content-end'>
        <button id='reset-filter' onClick={handleReset}>Reset filters</button>
      </div>
    </>
  )
}

export default FilterGroup
