import React from 'react'
import { useAppSelector } from '../../hooks'

const Counter = (): JSX.Element => {
  const birds = useAppSelector(state => state.birdsData.sortedBirds)
  const birdsTotal = birds.length
  const birdsSeen = birds.filter(bird => bird.seen).length

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
