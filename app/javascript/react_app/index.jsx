// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise';

// internal modules;
import App from './components/app';
import familiesReducer from './reducers/families_reducer';

// reducers
const baseReducer = (state = null) => state;

const reducers = combineReducers({
  families: familiesReducer,
  selectedFamilyBirds: baseReducer,
});

const initialState = {
  families: [
    {
      scientific_name: "Anatidae",
      english_name: "Ducks, Geese and Swans",
      swedish_name: "Änder",
    },
    {
      scientific_name: "Phasianidae",
      english_name: "Pheasants and allies",
      swedish_name: "Fasanfåglar",
    },
    {
      scientific_name: "Caprimulgidae",
      english_name: "Nightjars",
      swedish_name: "Nattskärror",
    },
    {
      scientific_name: "Apodidae",
      english_name: "Swifts",
      swedish_name: "Seglare",
    },
    {
      scientific_name: "Otididae",
      english_name: "Bustards",
      swedish_name: "Trappar",
    },
    {
      scientific_name: "Cuculidae",
      english_name: "Cuckoos",
      swedish_name: "Gökar",
    },
  ],
  selectedFamilyBirds: [
    {
      scientific_name: "Branta bernicla",
      english_name: "Brant Goose",
      swedish_name: "Prutgås",
      seen: true,
    },
    {
      scientific_name: "Branta ruficollis",
      english_name: "Red-breasted Goose",
      swedish_name: "Rödhalsad Gås",
      seen: false,
    },
    {
      scientific_name: "Branta canadensis",
      english_name: "Canada Goose",
      swedish_name: "Kanadagås",
      seen: false,
    },
  ]
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

