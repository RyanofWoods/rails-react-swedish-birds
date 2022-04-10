import React from 'react'
import Bird from './bird'

import { useAppSelector } from '../../hooks'

const BirdList: React.FC = () => {
  const birds = useAppSelector(state => state.birdsData.birds)

  return (
    <ul className='list-group'>
      {
        birds.map((birdData) => (
          <Bird key={birdData.scientificName} bird={birdData} />
        ))
      }
    </ul>
  )
}

export default BirdList
