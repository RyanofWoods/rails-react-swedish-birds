import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadSettings } from "../actions";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import GroupList from './group_list';
import BirdList from './bird_list';
import Settings from './settings';

class App extends Component {
  componentDidMount () {
    this.props.loadSettings();
  }

  render () {
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loadSettings }, dispatch);
};

export default connect(null, mapDispatchToProps)(App);
