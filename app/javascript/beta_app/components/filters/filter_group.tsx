import React from 'react'

import SearchBar from './search_bar'
import SeenBirdsFilter from './seen_birds_filter'
import FamilyAndOrderFilter from './family_and_order_filter'
import { useAppSelector } from '../../hooks'

const FilterGroup: React.FC = () => {
  const orders = useAppSelector(state => state.birdsData.orders)
  const families = useAppSelector(state => state.birdsData.families)

  return (
    <>
      <SearchBar />
      <SeenBirdsFilter />
      <FamilyAndOrderFilter orders={orders} families={families} />
    </>
  )
}

export default FilterGroup
