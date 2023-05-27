import React, { useState } from 'react'
import { Species, Observation } from '../../types/speciesData'
import Checkbox from './checkbox'

interface CheckboxAndDateProps {
  species: Species
  observation?: Observation
  handleChange: () => void
}

const CheckboxAndDate: React.FC<CheckboxAndDateProps> = ({ species, observation, handleChange }) => {
  const seen = observation !== undefined
  const [showDate, setShowDate] = useState(seen)

  const speciesDateStyled = (): JSX.Element | null => {
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
    ariaLabel: 'Create observation for species',
    classes: 'checkbox-checked-hover-pointer-none',
    checked: seen,
    id: species.scientificName,
    onChange: handleChange
  }

  const showDateHandler = (): void => {
    setShowDate(true)
  }

  return (
    <>
      {!showDate && <Checkbox showDateHandler={showDateHandler} {...checkboxProps} />}
      {showDate && speciesDateStyled()}
    </>
  )
}

export default CheckboxAndDate
