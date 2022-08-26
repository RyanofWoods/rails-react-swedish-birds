import React from 'react'

import { BirdWithOrWithoutObservation } from '../../types/birdData'
import { isBreedingBird } from '../../helpers/population'
import PopulationBars from './population_bars'
import { populationInfo } from '../../helpers/population'

interface PopulationTooltipProps {
  bird: BirdWithOrWithoutObservation
}

const PopulationTooltip: React.FC<PopulationTooltipProps> = ({ bird }) => {
  const { populationCategory: population } = bird

  return (
    <div className='population-tooltip-container'>
      <div className={`population-tooltip-header-container ${isBreedingBird(population) ? 'tooltip-orange' : 'tooltip-blue'}`}>
        {!isBreedingBird(population) && <p className='population-tooltip-header'>Occasional guest in Sweden</p>}
        {isBreedingBird(population) && <p className='population-tooltip-header'>Breeds in Sweden</p>}
      </div>
      <div className='population-bars-container m-0 p-2'>
        <PopulationBars population={bird.populationCategory} />
        <p>{populationInfo(bird)}</p>
      </div>
    </div>
  )
}

export default PopulationTooltip
