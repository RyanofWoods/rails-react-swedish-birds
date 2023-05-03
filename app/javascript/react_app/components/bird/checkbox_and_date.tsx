import React, { useState } from 'react'
import { BirdWithOrWithoutObservation } from '../../types/birdData'
import Checkbox from './checkbox'

interface CheckboxAndDateProps {
  bird: BirdWithOrWithoutObservation
  handleChange: () => void
}

const CheckboxAndDate: React.FC<CheckboxAndDateProps> = ({ bird, handleChange }) => {
  const [showDate, setShowDate] = useState(bird.seen)

  const birdDateStyled = (): JSX.Element | null => {
    if (bird.observation === undefined) return null

    const dateContents = (): JSX.Element => {
      if (bird.observation.observedAt === null) {
        return <p>Seen</p>
      } else {
        const parsedDate = new Date(bird.observation.observedAt)
        const monthFormatted = Intl.DateTimeFormat('en', { month: 'short' }).format(parsedDate)

        return (
          <>
            <p>{bird.observation.observedAt.substring(8, 10)}</p>
            <p>{monthFormatted}</p>
            <p>{bird.observation.observedAt.substring(0, 4)}</p>
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
    classes: 'checkbox-checked-hover-pointer-none',
    checked: bird.seen,
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
