/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import GroupList from './group_list';
import BirdList from './bird_list';
import Settings from './settings';
import Navbar from '../components/navbar';
import FlashMessage from './flash_message';
import Wrapper from '../components/wrapper';

class App extends Component {
  handleGroupRedirect() {
    switch (this.props.groupBy) {
      case 'order':
        return <Redirect to="/orders/" />;
      default:
        return <Redirect to="/families" />;
    }
  }

  render() {
    const { flashMessage } = this.props;

    return (
      <>
        {ReactDOM.createPortal(<Navbar />, document.getElementById('navbar-container'))}
        {flashMessage && <FlashMessage message={flashMessage} />}

        <Wrapper>
          <Switch>
            <Route path="/settings" component={Settings} />

            <Route path="/:groupedBy/:groupName" component={BirdList} />

            <Route path="/families/">
              <GroupList groupPlural="families" groupSingular="family" />
            </Route>
            <Route path="/orders/">
              <GroupList groupPlural="orders" groupSingular="order" />
            </Route>

            <Route path="/">{this.handleGroupRedirect()}</Route>
          </Switch>
        </Wrapper>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  groupBy: state.settingsData.groupBy,
  flashMessage: state.flashMessage,
});

export default connect(mapStateToProps)(App);
