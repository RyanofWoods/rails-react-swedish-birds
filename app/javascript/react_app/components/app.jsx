import React from 'react';
import FamilyList from '../containers/family_list';
import Family from '../containers/family';

const App = () => {
  return (
    <div className="container mt-4">
      <FamilyList />
      <Family />
    </div>
  );
};

export default App;
