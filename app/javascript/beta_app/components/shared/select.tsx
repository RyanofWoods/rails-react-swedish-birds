import React from 'react'

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
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    defaultText, options, ariaLabel, label, id, handleChange
  } = props

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value
    handleChange(value === defaultValue ? null : value)
  }

  return (
    <div className='form-group'>
      {(label !== undefined) && <label htmlFor={id}>{label}</label>}
      <select
        className='form-control custom-select'
        id={id}
        aria-label={ariaLabel}
        defaultValue={defaultText}
        onChange={onSelectChange}
      >
        <option value={defaultValue}>{defaultText}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.text}</option>)}
      </select>
    </div>
  )
}

export default Select
