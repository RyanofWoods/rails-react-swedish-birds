import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'

import App from './components/app'
import birdSlice from './features/birdSlice'
import flashMessageSlice from './features/flashMessageSlice'

const reducer = {
  birdsData: birdSlice.reducer,
  flashMessageData: flashMessageSlice.reducer
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const root = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)
