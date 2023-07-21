import React from 'react'
import FilterRadioButtonGroup, { RadioOption } from '../shared/filter_radio_group'
import { updateFilters } from '../../features/speciesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { SeenScope } from '../../types/speciesData'

const SeenSpeciesFilter: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedSeenValue = useAppSelector(state => state.speciesData.filters.seenScope)

  const options: Array<RadioOption<SeenScope>> = [
    { value: 'all', label: 'All species' },
    { value: 'seen', label: 'Species I have seen' },
    { value: 'unseen', label: "Species I haven't seen" }
  ]

  const handleChange = (value: SeenScope): void => {
    void dispatch(updateFilters({ seenScope: value }))
  }

  return (
    <FilterRadioButtonGroup<SeenScope> options={options} arialabel='label' selectedValue={selectedSeenValue} name='specieslist' handleOnChange={handleChange} />
  )
}

export default SeenSpeciesFilter
