import React from 'react'

import FilterRadioButton from './filter_radio_button'

export type RadioValue = string | number

export interface RadioOption<T> {
  value: T
  label: string
}

interface FilterRadioGroupProps<T> {
  arialabel?: string
  name: string
  options: Array<RadioOption<T>>
  selectedValue: T
  handleOnChange: (value: T) => void
}

const FilterRadioGroup = <T extends RadioValue>(props: FilterRadioGroupProps<T>): JSX.Element => {
  const { arialabel, options, name, selectedValue, handleOnChange } = props

  const onChangeHandler = (value: T): void => {
    handleOnChange(value)
  }

  return (
    <div className='radio-section' role='radiogroup' id='filterradiogroup' aria-label={arialabel}>
      {
        options.map(option => {
          return (
            <FilterRadioButton<T> key={option.value} value={option.value} label={option.label} name={name} selectedRadio={selectedValue} onChangeHandler={onChangeHandler} />
          )
        })
      }
    </div>
  )
}

export default FilterRadioGroup
