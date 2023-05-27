import React, { useState } from 'react'
import Modal from '../shared/modal'

import { Species, Observation, UserSettings } from '../../types/speciesData'
import PopulationBars from './population_bars'
import { populationInfo, migrationText } from '../../helpers/population'
import BirdHouse from './bird_house'
import getNameAttribute from '../../helpers/name_helper'
import ObservationModal from './observation_modal'

interface DetailsModalProps {
  close: () => void
  bird: Species
  observation?: Observation
  userSettings: UserSettings
}

const DetailsModal: React.FC<DetailsModalProps> = ({ close, bird, observation, userSettings }) => {
  const [showObservationModal, setShowObservationModal] = useState(false)
  const seen = observation != null
  const toggleObservationModal = (): void => {
    setShowObservationModal((prevState) => !prevState)
  }

  const observationDetails = (): JSX.Element | undefined => {
    if (seen) {
      let dateText
      const { note, observedAt } = observation
      const noteText = (note === null) ? 'No note added' : note

      if (observedAt === null) {
        dateText = <p className='date'>Date unknown</p>
      } else {
        const parsedDate = new Date(observedAt)
        const monthFormatted = Intl.DateTimeFormat('en', { month: 'long' }).format(parsedDate)

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
          <h4 className='mt-4'>My first observation</h4>
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

        {seen && observationDetails()}
      </div>

      <div className='modal-footer'>
        {
          seen && (
            <button type='button' className='btn btn-primary' onClick={toggleObservationModal}>
              Edit my observation
            </button>
          )
        }
        <button type='button' className='btn btn-outline-dark' onClick={close}>
          Close
        </button>
      </div>
      {
        showObservationModal && (
          <ObservationModal close={toggleObservationModal} bird={bird} observation={observation} userSettings={userSettings} />
        )
      }
    </Modal>
  )
}

export default DetailsModal
