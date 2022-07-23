import React, { useState } from 'react'
import Modal from '../shared/modal'

import { BirdWithOrWithoutObservation, UserSettings } from '../../types/birdData'
import PopulationBars from './population_bars'
import { populationInfo, migrationText } from '../../helpers/population_info'
import BirdHouse from './bird_house'
import getNameAttribute from '../../helpers/name_helper'
import ObservationModal from './observation_modal'

interface DetailsModalProps {
  close: () => void
  bird: BirdWithOrWithoutObservation
  userSettings: UserSettings
}

const DetailsModal: React.FC<DetailsModalProps> = ({ close, bird, userSettings }) => {
  const [showObservationModal, setShowObservationModal] = useState(false)

  const toggleObservationModal = (): void => {
    setShowObservationModal((prevState) => !prevState)
  }

  const observationDetails = (): JSX.Element | undefined => {
    if (bird.observation != null) {
      let dateText
      const { note, observedAt } = bird.observation
      const noteText = (note === null) ? 'No note added' : note

      if (observedAt === null) {
        dateText = <p className='date'>Date unknown</p>
      } else {
        const month = observedAt.substring(5, 7)
        const monthFormatted = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(month))
        dateText = (
          <div className='d-flex'>
            <p className='date'>{observedAt.substring(8, 10)}</p>
            <p className='date'>{monthFormatted}</p>
            <p className='date'>{observedAt.substring(0, 4)}</p>
          </div>
        )
      }

      return (
        <>
          <h4 className='mt-4 d-inline'>My first observation</h4>
          <a className='ml-3 link' onClick={toggleObservationModal}>Edit</a>
          {dateText}
          <h4 className='mt-4'>Note</h4>
          <p>{noteText}</p>
        </>
      )
    }
  }

  const migrationSection = (): JSX.Element => (
    <div className='population-bars-container'>
      <BirdHouse population={bird.populationCategory} />
      <p>{migrationText(bird)}</p>
    </div>
  )

  return (
    <Modal title='Bird details' close={close}>
      <div className='detailsModalContent modal-body'>

        <h4>Name</h4>
        <p className='bold-600 m-0'>{getNameAttribute(bird, userSettings.primaryNameLanguage)}</p>
        <p className='m-0'>{getNameAttribute(bird, userSettings.secondaryNameLanguage)}</p>

        <h4 className='mt-4'>Information</h4>
        <p className='mb-3'>Information regarding to Sweden</p>

        {migrationSection()}

        <div className='population-bars-container'>
          <PopulationBars population={bird.populationCategory} />
          <p>{populationInfo(bird)}</p>
        </div>

        {bird.seen && observationDetails()}
      </div>

      <div className='modal-footer'>
        <button type='button' className='btn btn-outline-dark' onClick={close}>
          Close
        </button>
      </div>
      {
        showObservationModal && (
          <ObservationModal close={toggleObservationModal} bird={bird} userSettings={userSettings} />
        )
      }
    </Modal>
  )
}

export default DetailsModal
