import React, { Component } from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from "react-redux";

import GroupList from './group_list';
import BirdList from './bird_list';
import Settings from './settings';
import Navbar from '../components/navbar';

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
      <React.Fragment>
        <Navbar/>

        <div className="content-container">
          <div className="container my-4">
            <Switch>
              <Route exact path="/">
                {this.handleGroupRedirect()}
              </Route>

              <Route path="/settings" component={Settings} />

              <Route path="/:groupedBy/:groupName" component={BirdList} />

              <Route path="/families/">
                <GroupList groupPlural={"families"} groupSingular={"family"} />
              </Route>
              <Route path="/orders/">
                <GroupList groupPlural={"orders"} groupSingular={"order"} />
              </Route>

              <Route path="/">{this.handleGroupRedirect()}</Route>
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    groupBy: state.settingsData.groupBy
  };
};

export default connect(mapStateToProps)(App);
