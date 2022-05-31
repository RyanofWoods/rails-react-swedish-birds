import React, { useState } from 'react'
import Modal from '../shared/modal'
import { BirdWithOrWithoutObservation, UserSettings } from '../../types'
import { useAppDispatch } from '../../hooks'
import { createObservation } from '../../api'
import getNameAttribute from '../../helpers/name_helper'

interface ObservationModalProps {
  close: () => void
  bird: BirdWithOrWithoutObservation
  userSettings: UserSettings
}

const ObservationModal: React.FC<ObservationModalProps> = ({ close, bird, userSettings }) => {
  const today = new Date().toLocaleDateString('en-CA')

  const dispatch = useAppDispatch()

  const [observedAt, setObservedAt] = useState(today)
  const [note, setNote] = useState('')
  const [dateUnknown, setDateUnknown] = useState(false)

  const handleMarkSeen = (): void => {
    const observationDate = (observedAt === '') ? 0 : observedAt
    void dispatch(createObservation({
      birdScientificName: bird.scientificName,
      observedAt: observationDate,
      note
    }))
  }

  const handleDateUnknown = (): void => {
    const inputDate = (dateUnknown) ? today : ''
    setObservedAt(inputDate)
    setDateUnknown((prevState) => !prevState)
  }

  const handleDatePicked = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setObservedAt(event.target.value)
  }

  const handleNoteChanged = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNote(event.target.value)
  }

  const handleConfirm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    handleMarkSeen()
    close()
  }

  return (
    <Modal title='Mark as seen' close={close}>
      <form onSubmit={handleConfirm}>
        <div className='modal-body'>
          <h4 className='mt-2'>Name</h4>
          <p className='bold-600 m-0'>{getNameAttribute(bird, userSettings.primaryNameLanguage)}</p>
          <p className='m-0'>{getNameAttribute(bird, userSettings.secondaryNameLanguage)}</p>
          <div className='d-flex align-items-end'>
            <div className='form-group'>
              <label>Date of observation</label>
              <input type='date' className='form-control' value={observedAt} max={today} disabled={dateUnknown} onChange={handleDatePicked} />
            </div>
            <div className='form-check' id='date-unknown'>
              <input type='checkbox' className='form-check-input checkbox-input' onClick={handleDateUnknown} />
              <label className='form-check-label' style={{ lineHeight: '1.2rem', fontSize: '1rem' }}>I don&#39;t know</label>
            </div>
          </div>
          <div className='form-group mt-0'>
            <label>Note</label>
            <textarea onChange={handleNoteChanged} className='form-control' placeholder='Add a note about your observation...' />
          </div>
        </div>
        <div className='modal-footer'>
          <button type='submit' className='btn btn-primary'>
            Confirm
          </button>
          <button type='button' className='btn btn-dark' onClick={close}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ObservationModal
