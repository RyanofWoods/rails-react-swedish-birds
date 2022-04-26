import React, { useState } from 'react'

import { BirdWithOrWithoutObservation } from '../../types'
import PopulationBars from './population_bars'

import ObservationModal from './observation_modal'
import DetailsModal from './details_modal'
import PopulationTooltip from './population_tooltip'
import CheckboxAndDate from './checkbox_and_date'

const Bird: React.FC<{bird: BirdWithOrWithoutObservation}> = ({ bird }) => {
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
        <p className='main-name'>{bird.swedishName}</p>
        <p>{bird.englishName}</p>
        <a id='details-link' onClick={toggleDetailsModal}>Details</a>
      </div>
      <div onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} className='position-relative' role='button'>
        <PopulationBars population={bird.populationCategory} />
      </div>
      {
        showSeenModal && (
          <ObservationModal close={toggleSeenModal} bird={bird} />
        )
      }
      {
        showDetailsModal && (
          <DetailsModal close={toggleDetailsModal} bird={bird} />
        )
      }
    </li>
  )
}

export default Bird
