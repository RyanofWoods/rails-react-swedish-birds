import React from 'react';

const Wrapper = ({children}) => (
  <div className="row justify-content-center">
    <div className="col-12 col-lg-8">
      {children}
    </div>
  </div>
);

export default Wrapper;
