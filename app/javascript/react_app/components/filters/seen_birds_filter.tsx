import React from 'react'
import FilterRadioButtonGroup, { RadioOption } from '../shared/filter_radio_group'
import { updateFilters } from '../../features/birdSlice'
import { useAppDispatch } from '../../hooks'
import { SeenScope } from '../../types/birdData'

interface SeenBirdsFilterProps {
  selectedValue: SeenScope
}

const SeenBirdsFilter: React.FC<SeenBirdsFilterProps> = ({ selectedValue }) => {
  const dispatch = useAppDispatch()

  const options: Array<RadioOption<SeenScope>> = [
    { value: 'all', label: 'All birds' },
    { value: 'seen', label: 'Birds I have seen' },
    { value: 'unseen', label: "Birds I haven't seen" }
  ]

  const handleChange = (value: SeenScope): void => {
    void dispatch(updateFilters({ seenScope: value }))
  }

  return (
    <FilterRadioButtonGroup<SeenScope> options={options} arialabel='label' selectedValue={selectedValue} name='birdlist' handleOnChange={handleChange} />
  )
}

export default SeenBirdsFilter
