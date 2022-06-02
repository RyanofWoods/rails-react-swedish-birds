import React from 'react'

interface InputProps {
  label?: string
  id: string
  ariaLabel: string
  placeholder?: string
  type: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  handleFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  value: string
  formGroupClasses?: string
}

const Input: React.FC<InputProps> = (props) => {
  const { label, id, ariaLabel, placeholder, type, handleChange, handleBlur, handleFocus, value, formGroupClasses } = props

  return (
    <div className={`form-group ${formGroupClasses ?? ''}`}>
      {(label !== undefined) && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        aria-label={ariaLabel}
        className='form-control'
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={value}
      />
    </div>
  )
}

export default Input
