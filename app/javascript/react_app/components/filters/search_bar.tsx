import React from 'react'
import { searchSpecies } from '../../api'
import { resetSearch } from '../../features/birdSlice'
import { useAppDispatch } from '../../hooks'

import Input from '../shared/input'

interface SearchBarProps {
  searchValue: string
}

const SearchBar: React.FC<SearchBarProps> = ({ searchValue }) => {
  const dispatch = useAppDispatch()

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
        ariaLabel='search for a bird'
        placeholder='Search for a bird...'
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
