import React from 'react'

import { PopulationCategory } from '../../types/birdData'
import { isBreedingBird } from '../../helpers/breeding_bird'

interface PopulationBarsProps {
  population: PopulationCategory
}

const PopulationBars: React.FC<PopulationBarsProps> = ({ population }) => {
  let populationLevel = population
  if (!isBreedingBird(population)) populationLevel -= 5

  let color
  if (isBreedingBird(population)) {
    color = 'bar-orange'
  } else {
    color = 'bar-blue'
  }

  return (
    <div className='population-bars'>
      {isBreedingBird(population) && <div className={populationLevel <= 5 ? `bar-filled ${color}` : `bar ${color}`} />}
      <div className={populationLevel <= 4 ? `bar-filled ${color}` : `bar ${color}`} />
      <div className={populationLevel <= 3 ? `bar-filled ${color}` : `bar ${color}`} />
      <div className={populationLevel <= 2 ? `bar-filled ${color}` : `bar ${color}`} />
      <div className={populationLevel === 1 ? `bar-filled ${color}` : `bar ${color}`} />
      {!isBreedingBird(population) && <div className='bar-filled bg-white' />}
    </div>
  )
}

export default PopulationBars
