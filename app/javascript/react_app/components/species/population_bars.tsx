import React from 'react'

import { PopulationCategory } from '../../types/speciesData'
import { isBreeding, populationCategoryToLevel } from '../../helpers/population'

interface PopulationBarsProps {
  population: PopulationCategory
}

const PopulationBars: React.FC<PopulationBarsProps> = ({ population }) => {
  const populationLevel = populationCategoryToLevel(population)
  const color = (isBreeding(population)) ? 'bar-orange' : 'bar-blue'

  return (
    <div className='population-bars'>
      {
        [...Array(5)].map((_, index) => (
          <div className={populationLevel >= index + 1 ? `bar-filled ${color}` : `bar ${color}`} key={index} />
        ))
      }
    </div>
  )
}

export default PopulationBars
