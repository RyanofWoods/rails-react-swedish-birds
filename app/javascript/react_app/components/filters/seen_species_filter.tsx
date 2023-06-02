import React from 'react'
import FilterRadioButtonGroup, { RadioOption } from '../shared/filter_radio_group'
import { updateFilters } from '../../features/speciesSlice'
import { useAppDispatch } from '../../hooks'
import { SeenScope } from '../../types/speciesData'

interface SeenSpeciesFilterProps {
  selectedValue: SeenScope
}

const SeenSpeciesFilter: React.FC<SeenSpeciesFilterProps> = ({ selectedValue }) => {
  const dispatch = useAppDispatch()

  const options: Array<RadioOption<SeenScope>> = [
    { value: 'all', label: 'All species' },
    { value: 'seen', label: 'Species I have seen' },
    { value: 'unseen', label: "Species I haven't seen" }
  ]

  const handleChange = (value: SeenScope): void => {
    void dispatch(updateFilters({ seenScope: value }))
  }

  return (
    <FilterRadioButtonGroup<SeenScope> options={options} arialabel='label' selectedValue={selectedValue} name='specieslist' handleOnChange={handleChange} />
  )
}

export default SeenSpeciesFilter
