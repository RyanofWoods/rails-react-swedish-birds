import React from 'react'
import { useAppSelector } from '../../hooks'
import calculateObservedBirdsCount from '../../helpers/calculate_observed_birds_count'

const Counter = (): JSX.Element => {
  const birds = useAppSelector(state => state.speciesData.sortedSpecies)
  const observations = useAppSelector(state => state.speciesData.observations)
  const birdsTotal = birds.length
  const birdsSeen = calculateObservedBirdsCount(birds, observations)

  return (
    <div className='counter-section'>
      <div className='counter-item'>
        <p>Number of birds:</p>
        <p className='counter-number'>{birdsTotal}</p>
      </div>
      <div className='counter-item'>
        <p>Birds seen:</p>
        <p className='counter-number'>{birdsSeen}</p>
      </div>
    </div>
  )
}

export default Counter
