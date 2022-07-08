import React, { useState } from 'react'
import Modal from '../shared/modal'
import { BirdWithOrWithoutObservation, UserSettings } from '../../types'
import { useAppDispatch } from '../../hooks'
import { createObservation, editObservation } from '../../api'
import getNameAttribute from '../../helpers/name_helper'

interface ObservationModalProps {
  close: () => void
  bird: BirdWithOrWithoutObservation
  userSettings: UserSettings
}

const ObservationModal: React.FC<ObservationModalProps> = ({ close, bird, userSettings }) => {
  const today = new Date().toLocaleDateString('en-CA')

  const dispatch = useAppDispatch()

  const initialState = (): { observedAt: string, note: string, dateUnknown: boolean } => {
    if (bird.seen) {
      return {
        observedAt: bird.observation.observedAt ?? today,
        note: bird.observation.note ?? '',
        dateUnknown: bird.observation.observedAt === null
      }
    } else {
      return { observedAt: today, note: '', dateUnknown: false }
    }
  }

  const [dateUnknown, setDateUnknown] = useState(initialState().dateUnknown)
  const [observedAt, setObservedAt] = useState((dateUnknown) ? '' : initialState().observedAt)
  const [note, setNote] = useState(initialState().note)

  const handleObservation = (): void => {
    const observationDate = (dateUnknown) ? 0 : observedAt
    const action = (bird.seen) ? editObservation : createObservation

    void dispatch(action({
      birdScientificName: bird.scientificName,
      observedAt: observationDate,
      note
    }))
  }

  const handleDateUnknown = (): void => {
    const inputDate = (dateUnknown) ? initialState().observedAt : ''
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
    handleObservation()
    close()
  }

  const title = (bird.seen) ? 'Edit your observation' : 'Mark as seen'

  return (
    <Modal title={title} close={close}>
      <form onSubmit={handleConfirm}>
        <div className='modal-body'>
          <h4>Name</h4>
          <p className='bold-600 m-0'>{getNameAttribute(bird, userSettings.primaryNameLanguage)}</p>
          <p className='m-0'>{getNameAttribute(bird, userSettings.secondaryNameLanguage)}</p>
          <div className='d-flex align-items-end'>
            <div className='form-group'>
              <label>Date of observation</label>
              <input type='date' className='form-control' value={observedAt} max={today} disabled={dateUnknown} onChange={handleDatePicked} />
            </div>
            <div className='form-check' id='date-unknown'>
              <input defaultChecked={dateUnknown} type='checkbox' className='form-check-input checkbox-input' onClick={handleDateUnknown} />
              <label className='form-check-label' style={{ lineHeight: '1.2rem', fontSize: '1rem' }}>I don&#39;t know</label>
            </div>
          </div>
          <div className='form-group mt-0'>
            <label>Note</label>
            <textarea value={note} onChange={handleNoteChanged} className='form-control' placeholder='Add a note about your observation...' />
          </div>
        </div>
        <div className='modal-footer'>
          <button type='submit' className='btn btn-primary'>
            Confirm
          </button>
          <button type='button' className='btn btn-outline-dark' onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ObservationModal
