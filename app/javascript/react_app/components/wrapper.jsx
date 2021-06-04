import React from 'react';

const Wrapper = ({ children }) => (
  <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        {children}
      </div>
    </div>
  </div>
);

export default Wrapper;
