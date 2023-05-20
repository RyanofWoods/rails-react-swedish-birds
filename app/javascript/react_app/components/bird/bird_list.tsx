import React from 'react'
import Bird from './bird'

import { useAppSelector } from '../../hooks'
import BirdListHeader from './bird_list_header'
import { Observation } from '../../types/birdData'

const BirdList: React.FC = () => {
  const birds = useAppSelector(state => state.birdsData.sortedBirds)
  const observations = useAppSelector(state => state.birdsData.observations)
  const userSettings = useAppSelector(state => state.birdsData.userSettings)
  const isUserLoggedIn = useAppSelector(state => state.userData.isLoggedIn) === true

  return (
    <>
      <BirdListHeader />

      <ul className='bird-list'>
        {
          birds.map((birdData) => {
            const observation: Observation | undefined = observations[birdData.scientificName]
            return <Bird key={birdData.scientificName} bird={birdData} observation={observation} userSettings={userSettings} isUserLoggedIn={isUserLoggedIn} />
          })
        }
      </ul>
    </>
  )
}

export default BirdList
