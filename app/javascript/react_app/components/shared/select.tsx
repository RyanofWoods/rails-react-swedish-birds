import React from 'react'
import { compareString } from '../../helpers/sort_helpers'

const defaultValue = 'default'

export interface Option {
  value: string
  text: string
}

interface SelectProps {
  label?: string
  id: string
  ariaLabel: string
  defaultText: string
  options: Option[]
  handleChange: (value: string | null) => void
  selectedValue: string | null
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    defaultText, options, ariaLabel, label, id, handleChange, selectedValue
  } = props

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value
    handleChange(value === defaultValue ? null : value)
  }

  const sortedOptions = options.sort((a, b) => compareString(a.text, b.text))

  return (
    <div className='form-group'>
      {(label !== undefined) && <label htmlFor={id}>{label}</label>}
      <select
        className='form-control custom-select'
        id={id}
        aria-label={ariaLabel}
        onChange={onSelectChange}
        value={selectedValue ?? defaultValue}
      >
        <option value={defaultValue}>{defaultText}</option>
        {sortedOptions.map((option) => <option key={option.value} value={option.value}>{option.text}</option>)}
      </select>
    </div>
  )
}

export default Select
