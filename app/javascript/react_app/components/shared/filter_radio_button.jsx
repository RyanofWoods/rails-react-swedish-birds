import React from 'react';

const FilterRadioButton = ({ label, id, name }) => (
  <div className="form-check radio-item">
    <input className="form-check-input" type="radio" id={id} name={name} />
    <label className="form-check-label" htmlFor={id}>
      {label}
    </label>
  </div>
);

export default FilterRadioButton;
