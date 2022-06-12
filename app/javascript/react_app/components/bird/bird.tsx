import React, { useState } from 'react'

import { BirdWithOrWithoutObservation, UserSettings } from '../../types'
import PopulationBars from './population_bars'

import ObservationModal from './observation_modal'
import DetailsModal from './details_modal'
import PopulationTooltip from './population_tooltip'
import CheckboxAndDate from './checkbox_and_date'
import getNameAttribute from '../../helpers/name_helper'

interface BirdProps {
  bird: BirdWithOrWithoutObservation
  userSettings: UserSettings
}

const Bird: React.FC<BirdProps> = ({ bird, userSettings }) => {
  const [showSeenModal, setShowSeenModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)

  const toggleSeenModal = (): void => {
    setShowSeenModal((prevState) => !prevState)
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

  return (
    <li className='bird-card'>
      {showInfoBox && <PopulationTooltip bird={bird} />}
      <CheckboxAndDate bird={bird} toggleSeenModal={toggleSeenModal} />
      <div className='bird-names'>
        <p className='bold-600 m-0'>{getNameAttribute(bird, userSettings.primaryNameLanguage)}</p>
        <p>{getNameAttribute(bird, userSettings.secondaryNameLanguage)}</p>
        <a id='details-link' className='link' onClick={toggleDetailsModal}>Details</a>
      </div>
      <div onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} className='position-relative' role='button'>
        <PopulationBars population={bird.populationCategory} />
      </div>
      {
        showSeenModal && (
          <ObservationModal close={toggleSeenModal} bird={bird} userSettings={userSettings} />
        )
      }
      {
        showDetailsModal && (
          <DetailsModal close={toggleDetailsModal} bird={bird} userSettings={userSettings} />
        )
      }
    </li>
  )
}

export default Bird
