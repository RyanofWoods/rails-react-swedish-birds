import React from 'react'
import Modal from '../shared/modal'

import { BirdWithOrWithoutObservation } from '../../types'
import PopulationBars from './population_bars'
import { populationInfo, migrationText } from '../../helpers/population_info'
import BirdHouse from './bird_house'

interface DetailsModalProps {
  close: () => void
  bird: BirdWithOrWithoutObservation
}

const DetailsModal: React.FC<DetailsModalProps> = ({ close, bird }) => {
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

        <h4 className='mt-2'>Name</h4>
        <p className='main-name'>{bird.swedishName}</p>
        <p>{bird.englishName}</p>

        <h4 className='mt-4'>Information</h4>
        <p>Information regarding to Sweden</p>
        <p>{bird.details}</p>

        {migrationSection()}

        <div className='population-bars-container'>
          <PopulationBars population={bird.populationCategory} />
          <p>{populationInfo(bird)}</p>
        </div>

        {bird.seen && observationDetails()}

        <button type='button' className='btn btn-dark hover-pointer mt-4' onClick={close}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default DetailsModal
