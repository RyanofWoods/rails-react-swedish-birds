import React from 'react'
import { searchBirds } from '../../api'
import { useAppDispatch } from '../../hooks'

import Input from '../shared/input'

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    void dispatch(searchBirds(event.target.value))
  }

  return (
    <>
      <Input
        id='search'
        type='text'
        ariaLabel='search for a bird'
        placeholder='Search for a bird...'
        handleChange={handleChange}
      />
    </>
  )
}

export default SearchBar
