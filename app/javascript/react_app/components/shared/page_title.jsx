import React from 'react';

const PageTitle = ({ title, totalSeen, totalAmount }) => (
  <div id="page-title">
    <h1>{title}</h1>

    {
      totalSeen !== undefined && totalAmount !== undefined && (
        <h3>
          <span>{totalSeen}</span>/{totalAmount}
        </h3>
      )
    }
  </div>
);

export default PageTitle;
