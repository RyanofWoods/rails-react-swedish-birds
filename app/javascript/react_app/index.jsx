// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise';

// internal modules;
import App from './components/app';
import groupsReducer from './reducers/groups_reducer';
import selectedGroupReducer from './reducers/selected_group_reducer';

// reducers
const reducers = combineReducers({
  groupsData: groupsReducer,
  selectedGroupData: selectedGroupReducer,
});

const initialState = {
  groupsData: {
    groups: []
  },
  selectedGroupData: {
    birds: []
  }
};

// root, store and middlewares
const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(logger, reduxPromise));
const store = createStore(reducers, initialState, middlewares);

const root = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)

