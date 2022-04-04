import React from 'react'

import { RadioValue } from './filter_radio_group'

interface FilterRadioButtonProps<T> {
  label: string
  name: string
  value: T
  onChangeHandler: (value: T) => void
  selectedRadio: T
}

const FilterRadioButton = <T extends RadioValue>(props: FilterRadioButtonProps<T>): JSX.Element => {
  const { label, value, name, onChangeHandler, selectedRadio } = props

  const onRadioChange = (): void => {
    onChangeHandler(value)
  }

  return (
    <div className='radio-item'>
      <input
        id={String(value)}
        className='form-check-input'
        type='radio'
        role='radio'
        name={name}
        aria-checked={value === selectedRadio}
        onChange={onRadioChange}
      />
      <label className='form-check-label' htmlFor={String(value)}>
        {label}
      </label>
    </div>
  )
}

export default FilterRadioButton
