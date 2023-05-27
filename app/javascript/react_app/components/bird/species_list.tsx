import React from 'react'
import SpeciesCard from './species_card'
import { useAppSelector } from '../../hooks'
import SpeciesListHeader from './species_list_header'
import { Observation } from '../../types/speciesData'

const SpeciesList: React.FC = () => {
  const species = useAppSelector(state => state.speciesData.sortedSpecies)
  const observations = useAppSelector(state => state.speciesData.observations)
  const userSettings = useAppSelector(state => state.speciesData.userSettings)
  const isUserLoggedIn = useAppSelector(state => state.userData.isLoggedIn) === true

  return (
    <>
      <SpeciesListHeader />

      <ul className='species-list'>
        {
          species.map((speciesData) => {
            const observation: Observation | undefined = observations[speciesData.scientificName]
            return <SpeciesCard key={speciesData.scientificName} species={speciesData} observation={observation} userSettings={userSettings} isUserLoggedIn={isUserLoggedIn} />
          })
        }
      </ul>
    </>
  )
}

export default SpeciesList
