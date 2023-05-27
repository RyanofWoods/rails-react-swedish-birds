import React from 'react'

import { Species } from '../../types/speciesData'
import { isBreeding, populationInfo } from '../../helpers/population'
import PopulationBars from './population_bars'

interface PopulationTooltipProps {
  species: Species
}

const PopulationTooltip: React.FC<PopulationTooltipProps> = ({ species }) => {
  const { populationCategory: population } = species

  return (
    <div className='population-tooltip-container'>
      <div className={`population-tooltip-header-container ${isBreeding(population) ? 'tooltip-orange' : 'tooltip-blue'}`}>
        {!isBreeding(population) && <p className='population-tooltip-header'>Occasional guest in Sweden</p>}
        {isBreeding(population) && <p className='population-tooltip-header'>Breeds in Sweden</p>}
      </div>
      <div className='population-bars-container m-0 p-2'>
        <PopulationBars population={species.populationCategory} />
        <p>{populationInfo(species)}</p>
      </div>
    </div>
  )
}

export default PopulationTooltip
