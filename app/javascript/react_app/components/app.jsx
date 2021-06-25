import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setPrevLocation } from '../actions';

import GroupList from './group/group_list';
import BirdList from './bird/bird_list';
import Settings from './settings/settings';
import Navbar from './shared/navbar';
import FlashMessage from './shared/flash_message';
import Lifelist from './lifelist/lifelist';

class App extends Component {
  componentDidUpdate(prevProps) {
    const oldLoc = prevProps.location.pathname;
    const newLoc = this.props.location.pathname;

    if (oldLoc !== newLoc) {
      this.props.setPrevLocation(oldLoc);
    }
  }

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

        <Switch>
          <Route path="/lifelist" component={Lifelist} />

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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  groupBy: state.settingsData.groupBy,
  flashMessage: state.flashMessage,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setPrevLocation }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
