import React from 'react'

import { Species } from '../../types/birdData'
import { isBreedingBird, populationInfo } from '../../helpers/population'
import PopulationBars from './population_bars'

interface PopulationTooltipProps {
  bird: Species
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
