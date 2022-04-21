import React from 'react'

import SearchBar from './search_bar'
import SeenBirdsFilter from './seen_birds_filter'

const FilterGroup: React.FC = () => {
  return (
    <>
      <SearchBar />
      <SeenBirdsFilter />
    </>
  )
}

export default FilterGroup
