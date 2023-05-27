import React, { useState } from 'react'

import { Species, Observation, UserSettings } from '../../types/speciesData'
import PopulationBars from './population_bars'

import ObservationModal from './observation_modal'
import DetailsModal from './details_modal'
import PopulationTooltip from './population_tooltip'
import CheckboxAndDate from './checkbox_and_date'
import { setFlashMessage } from '../../features/flashMessageSlice'
import getNameAttribute from '../../helpers/name_helper'
import { useAppDispatch } from '../../hooks'

interface SpeciesProps {
  species: Species
  observation: Observation
  userSettings: UserSettings
  isUserLoggedIn: boolean
}

const SpeciesCard: React.FC<SpeciesProps> = ({ species, observation, userSettings, isUserLoggedIn }) => {
  const dispatch = useAppDispatch()
  const [showSeenModal, setShowSeenModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [restrictedAccessAttempted, setRestrictedAccessAttempted] = useState(false)

  const toggleSeenModal = (): void => {
    if (isUserLoggedIn) {
      setShowSeenModal((prevState) => !prevState)
      setRestrictedAccessAttempted(false)
    } else {
      setRestrictedAccessAttempted(true)
    }
  }

  const toggleDetailsModal = (): void => {
    setShowDetailsModal((prevState) => !prevState)
  }

  const handleMouseIn = (): void => {
    setShowInfoBox(true)
  }

  const handleMouseOut = (): void => {
    setShowInfoBox(false)
  }

  if (restrictedAccessAttempted) {
    void dispatch(setFlashMessage({ message: 'You must log in to make an observation', type: 'error' }))
  }

  return (
    <li className='bird-card'>
      {showInfoBox && <PopulationTooltip species={species} />}
      <CheckboxAndDate species={species} observation={observation} handleChange={toggleSeenModal} />
      <div className='bird-names'>
        <p className='bold-600 m-0'>{getNameAttribute(species, userSettings.primaryNameLanguage)}</p>
        <p>{getNameAttribute(species, userSettings.secondaryNameLanguage)}</p>
        <button className='link details-link' onClick={toggleDetailsModal}>Details</button>
      </div>
      <div onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} className='position-relative'>
        <PopulationBars population={species.populationCategory} />
      </div>
      {
        showSeenModal && (
          <ObservationModal close={toggleSeenModal} species={species} observation={observation} userSettings={userSettings} />
        )
      }
      {
        showDetailsModal && (
          <DetailsModal close={toggleDetailsModal} species={species} observation={observation} userSettings={userSettings} />
        )
      }
    </li>
  )
}

export default SpeciesCard
