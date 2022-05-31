import React from 'react'
import { searchBirds } from '../../api'
import { useAppDispatch } from '../../hooks'

import Input from '../shared/input'

interface SearchBarProps {
  searchValue: string
}

const SearchBar: React.FC<SearchBarProps> = ({ searchValue }) => {
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    void dispatch(searchBirds(event.target.value))
  }

  return (
    <>
      <Input
        formGroupClasses='mt-0'
        id='search'
        type='text'
        ariaLabel='search for a bird'
        placeholder='Search for a bird...'
        handleChange={handleChange}
        value={searchValue}
      />
    </>
  )
}

export default SearchBar
