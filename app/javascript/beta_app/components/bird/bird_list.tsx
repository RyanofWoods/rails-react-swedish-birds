import React from 'react'
import Bird from './bird'

import { useAppSelector } from '../../hooks'

const BirdList: React.FC = () => {
  const birds = useAppSelector(state => state.birdsData.sortedBirds)
  const userSettings = useAppSelector(state => state.birdsData.userSettings)

  return (
    <ul className='bird-list'>
      {
        birds.map((birdData) => (
          <Bird key={birdData.scientificName} bird={birdData} userSettings={userSettings} />
        ))
      }
    </ul>
  )
}

export default BirdList
