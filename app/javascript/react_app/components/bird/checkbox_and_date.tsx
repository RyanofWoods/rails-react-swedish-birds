import React, { useState } from 'react'
import { BirdWithOrWithoutObservation } from '../../types/birdData'
import Checkbox from './checkbox'

interface CheckboxAndDateProps {
  bird: BirdWithOrWithoutObservation
  toggleSeenModal: () => void
}

const CheckboxAndDate: React.FC<CheckboxAndDateProps> = ({ bird, toggleSeenModal }) => {
  const [showDate, setShowDate] = useState(bird.seen)

  const birdDateStyled = (): JSX.Element | null => {
    if (bird.observation === undefined) return null

    const dateContents = (): JSX.Element => {
      if (bird.observation.observedAt === null) {
        return <p>Seen</p>
      } else {
        const month = bird.observation.observedAt.substring(5, 7)
        const monthFormatted = Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(month))

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
      <a className='bird-date' onClick={toggleSeenModal}>
        {dateContents()}
      </a>
    )
  }

  const checkboxProps = {
    classes: 'checkbox-checked-hover-pointer-none',
    checked: bird.seen,
    id: bird.scientificName,
    onChange: toggleSeenModal
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
