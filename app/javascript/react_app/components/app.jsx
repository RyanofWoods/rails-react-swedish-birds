import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import GroupList from '../containers/group_list';
import BirdList from '../containers/bird_list';

const App = () => {
  return (
    <div className="container my-4">
      <BrowserRouter>
        <Switch>
          <Route path="/groups/:groupName" component={BirdList} />
          <Route path="/" component={GroupList} />
          <Route path="/groups" component={GroupList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
