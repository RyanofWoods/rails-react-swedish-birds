import React from 'react'
import Bird from './bird'

import { useAppSelector } from '../../hooks'
import BirdListHeader from './bird_list_header'

const BirdList: React.FC = () => {
  const birds = useAppSelector(state => state.birdsData.sortedBirds)
  const userSettings = useAppSelector(state => state.birdsData.userSettings)
  const isUserLoggedIn = useAppSelector(state => state.userData.isLoggedIn) === true

  return (
    <>
      <BirdListHeader />

      <ul className='bird-list'>
        {
          birds.map((birdData) => (
            <Bird key={birdData.scientificName} bird={birdData} userSettings={userSettings} isUserLoggedIn={isUserLoggedIn} />
          ))
        }
      </ul>
    </>
  )
}

export default BirdList
