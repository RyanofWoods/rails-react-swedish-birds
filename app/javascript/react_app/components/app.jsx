import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import FamilyList from '../containers/family_list';
import Family from '../containers/family';

const App = () => {

  return (
    <div className="container my-4">
      <BrowserRouter>
        <Switch>
          <Route path="/families/:familyName" component={Family} />
          <Route path="/" component={FamilyList} />
          <Route path="/families" component={FamilyList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
