import React from 'react'
import Bird from './bird'

import { useAppSelector } from '../../hooks'

const BirdList: React.FC = () => {
  const birds = useAppSelector(state => state.birdsData.filteredBirds)

  return (
    <ul className='bird-list'>
      {
        birds.map((birdData) => (
          <Bird key={birdData.scientificName} bird={birdData} />
        ))
      }
    </ul>
  )
}

export default BirdList
