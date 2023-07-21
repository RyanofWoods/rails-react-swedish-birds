import React from 'react'
import { searchSpecies } from '../../api'
import { resetSearch } from '../../features/speciesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

import Input from '../shared/input'

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const searchValue = useAppSelector(state => state.speciesData.filters.searchValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    void dispatch(searchSpecies(event.target.value))
  }

  const resetSearchBar = (): void => {
    void dispatch(resetSearch())
  }

  return (
    <>
      <Input
        formGroupClasses='mt-0 search-container'
        id='search'
        type='text'
        ariaLabel='search for a species'
        placeholder='Search for a species...'
        handleChange={handleChange}
        value={searchValue}
      >
        <button type='button' className='close' aria-label='Reset search bar' onClick={resetSearchBar}>
          <span aria-hidden='true'>&times;</span>
        </button>
      </Input>
    </>
  )
}

export default SearchBar
