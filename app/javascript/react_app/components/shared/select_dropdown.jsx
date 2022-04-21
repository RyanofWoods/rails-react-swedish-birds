import React from 'react';

const SelectDropDown = (props) => {
  const {
    defaultText, values, ariaLabel, label,
  } = props;

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <select className="form-control custom-select" aria-label={ariaLabel} defaultValue={defaultText}>
        <option value={defaultText}>{defaultText}</option>
        {values.map((value) => <option key={value} value={value}>{value}</option>)}
      </select>
    </div>
  );
};

export default SelectDropDown;
