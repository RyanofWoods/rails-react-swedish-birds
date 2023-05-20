import React, { useState } from 'react'

import { BirdWithOrWithoutObservation, UserSettings } from '../../types/birdData'
import PopulationBars from './population_bars'

import ObservationModal from './observation_modal'
import DetailsModal from './details_modal'
import PopulationTooltip from './population_tooltip'
import CheckboxAndDate from './checkbox_and_date'
import { setFlashMessage } from '../../features/flashMessageSlice'
import getNameAttribute from '../../helpers/name_helper'
import { useAppDispatch } from '../../hooks'

interface BirdProps {
  bird: BirdWithOrWithoutObservation
  userSettings: UserSettings
  isUserLoggedIn: boolean
}

const Bird: React.FC<BirdProps> = ({ bird, userSettings, isUserLoggedIn }) => {
  const dispatch = useAppDispatch()
  const [showSeenModal, setShowSeenModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [restrictedAccessAttempted, setRestrictedAccessAttempted] = useState(false)
  const observation = bird.observation

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
      {showInfoBox && <PopulationTooltip bird={bird} />}
      <CheckboxAndDate bird={bird} handleChange={toggleSeenModal} />
      <div className='bird-names'>
        <p className='bold-600 m-0'>{getNameAttribute(bird, userSettings.primaryNameLanguage)}</p>
        <p>{getNameAttribute(bird, userSettings.secondaryNameLanguage)}</p>
        <button className='link details-link' onClick={toggleDetailsModal}>Details</button>
      </div>
      <div onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} className='position-relative'>
        <PopulationBars population={bird.populationCategory} />
      </div>
      {
        showSeenModal && (
          <ObservationModal close={toggleSeenModal} bird={bird} userSettings={userSettings} />
        )
      }
      {
        showDetailsModal && (
          <DetailsModal close={toggleDetailsModal} bird={bird} observation={observation} userSettings={userSettings} />
        )
      }
    </li>
  )
}

export default Bird
