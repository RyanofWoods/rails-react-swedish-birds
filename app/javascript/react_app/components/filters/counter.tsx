import React from 'react'
import { useAppSelector } from '../../hooks'
import calculateObservedSpeciesCount from '../../helpers/calculate_observed_species_count'

const Counter = (): JSX.Element => {
  const species = useAppSelector(state => state.speciesData.sortedSpecies)
  const observations = useAppSelector(state => state.speciesData.observations)
  const speciesTotal = species.length
  const speciesSeen = calculateObservedSpeciesCount(species, observations)

  return (
    <div className='counter-section'>
      <div className='counter-item'>
        <p>Number of species:</p>
        <p className='counter-number'>{speciesTotal}</p>
      </div>
      <div className='counter-item'>
        <p>Species seen:</p>
        <p className='counter-number'>{speciesSeen}</p>
      </div>
    </div>
  )
}

export default Counter
