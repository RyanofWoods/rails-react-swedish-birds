import React from 'react'

import SearchBar from './search_bar'
import SeenBirdsFilter from './seen_birds_filter'
import FamilyAndOrderFilter from './family_and_order_filter'
import { useAppSelector } from '../../hooks'

const FilterGroup: React.FC = () => {
  const orders = useAppSelector(state => state.birdsData.orders)
  const families = useAppSelector(state => state.birdsData.families)
  const userSettings = useAppSelector(state => state.birdsData.userSettings)
  const selectedSeenValue = useAppSelector(state => state.birdsData.filters.seenScope)
  const searchValue = useAppSelector(state => state.birdsData.filters.searchValue)

  return (
    <>
      <SearchBar searchValue={searchValue} />
      <SeenBirdsFilter selectedValue={selectedSeenValue} />
      <FamilyAndOrderFilter orders={orders} families={families} userSettings={userSettings} />
    </>
  )
}

export default FilterGroup
