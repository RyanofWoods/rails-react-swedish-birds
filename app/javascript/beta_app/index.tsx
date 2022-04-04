import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import reduxPromise from 'redux-promise'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './components/app'

const reducers = combineReducers({
})

const initialState = {
}

// root, store and middlewares
const middlewares = composeWithDevTools(applyMiddleware(logger, reduxPromise))
const store = createStore(reducers, initialState, middlewares)

const root = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  root
)
