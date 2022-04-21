import React from 'react'

interface SelectProps {
  label?: string
  id: string
  ariaLabel: string
  defaultText: string
  options: Array<{ value: string, text: string }>
  handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    defaultText, options, ariaLabel, label, id, handleChange
  } = props

  return (
    <div className='form-group'>
      {(label !== undefined) && <label htmlFor={id}>{label}</label>}
      <select
        className='form-control custom-select'
        id={id}
        aria-label={ariaLabel}
        defaultValue={defaultText}
        onChange={handleChange}
      >
        <option value='default'>{defaultText}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.text}</option>)}
      </select>
    </div>
  )
}

export default Select
