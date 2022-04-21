import React from 'react';

const Input = ({ label, id, placeholder }) => (
  <div className="form-group">
    {label && <label htmlFor={id}>{label}</label>}
    <input id={id} className="form-control" placeholder={placeholder} />
  </div>
);

export default Input;
