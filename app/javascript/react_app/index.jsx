// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line object-curly-newline
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise';
import { BrowserRouter } from 'react-router-dom';

// internal modules;
import App from './containers/app';

import groupsReducer from './reducers/groups_reducer';
import selectedGroupReducer from './reducers/selected_group_reducer';
import settingsReducer from './reducers/settings_reducer';

// modules for loading the app with setting defaults and then user settings
import SETTING_DEFAULTS from './setting_defaults';
import { loadSettings } from './actions';

// reducers
const reducers = combineReducers({
  groupsData: groupsReducer,
  selectedGroupData: selectedGroupReducer,
  settingsData: settingsReducer,
});

const initialState = {
  groupsData: {
    groups: [],
  },
  selectedGroupData: {
    birds: [],
  },
  settingsData: SETTING_DEFAULTS,
};

// root, store and middlewares
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(logger, reduxPromise));
const store = createStore(reducers, initialState, middlewares);

// override default settings with user settings
store.dispatch(loadSettings());

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  root,
);
