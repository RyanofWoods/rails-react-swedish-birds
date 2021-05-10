import React, { Component } from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from "react-redux";

import GroupList from './group_list';
import BirdList from './bird_list';
import Settings from './settings';

class App extends Component {
  handleGroupRedirect () {
    switch (this.props.groupBy) {
      case 'order':
        return <Redirect to="/orders/" />
      default:
        return <Redirect to="/families" />
    }
  }

  render () {
    return (
      <div className="container my-4">
        <Switch>
          <Route exact path="/">
            {this.handleGroupRedirect()}
          </Route>

          <Route path="/settings" component={Settings} />

          <Route path="/families/" component={GroupList}>
            <GroupList groupPlural={"families"} groupSingular={"family"} />
          </Route>
          <Route path="/orders/" component={GroupList}>
            <GroupList groupPlural={"orders"} groupSingular={"order"} />
          </Route>

          <Route path="/groups/:groupName" component={BirdList} />

          <Route path="/">{this.handleGroupRedirect()}</Route>
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
