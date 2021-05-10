import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import GroupList from '../containers/group_list';
import BirdList from '../containers/bird_list';
import Settings from '../containers/settings';

const App = () => {
  return (
    <div className="container my-4">
      <Switch>
        <Route path="/settings" component={Settings} />
        <Route path="/groups/:groupName" component={BirdList} />
        <Route exact path="/">
          <Redirect to='/groups' />
        </Route>
        <Route path="/groups" component={GroupList} />
      </Switch>
  </div>
  );
};

export default App;
