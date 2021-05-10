import React, { Component } from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import GroupList from './group_list';
import BirdList from './bird_list';
import Settings from './settings';

class App extends Component {
  render () {
    return (
      <div className="container my-4">
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/groups/:groupName" component={BirdList} />
          <Route exact path="/">
            <Redirect to="/groups" />
          </Route>
          <Route path="/groups" component={GroupList} />
        </Switch>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    groupBy: state.settingsData.groupBy
  };
};

export default connect(mapStateToProps)(App);
