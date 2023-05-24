import React, { useState } from 'react'
import { BirdWithOrWithoutObservation, Observation } from '../../types/birdData'
import Checkbox from './checkbox'

interface CheckboxAndDateProps {
  bird: BirdWithOrWithoutObservation
  observation?: Observation
  handleChange: () => void
}

const CheckboxAndDate: React.FC<CheckboxAndDateProps> = ({ bird, observation, handleChange }) => {
  const seen = observation !== undefined
  const [showDate, setShowDate] = useState(seen)

  const birdDateStyled = (): JSX.Element | null => {
    if (observation === undefined) return null

    const dateContents = (): JSX.Element => {
      if (observation.observedAt === null) {
        return <p>Seen</p>
      } else {
        const parsedDate = new Date(observation.observedAt)
        const monthFormatted = Intl.DateTimeFormat('en', { month: 'short' }).format(parsedDate)

        return (
          <>
            <p>{observation.observedAt.substring(8, 10)}</p>
            <p>{monthFormatted}</p>
            <p>{observation.observedAt.substring(0, 4)}</p>
          </>
        )
      }
    }

    return (
      <button className='bird-date' onClick={handleChange}>
        {dateContents()}
      </button>
    )
  }

  const checkboxProps = {
    ariaLabel: 'Create observation for bird',
    classes: 'checkbox-checked-hover-pointer-none',
    checked: seen,
    id: bird.scientificName,
    onChange: handleChange
  }

  const showDateHandler = (): void => {
    setShowDate(true)
  }

  return (
    <>
      {!showDate && <Checkbox showDateHandler={showDateHandler} {...checkboxProps} />}
      {showDate && birdDateStyled()}
    </>
  )
}

export default CheckboxAndDate
