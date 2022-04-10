import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import { BrowserRouter } from 'react-router-dom'

import App from './components/app'
import birdSlice from './features/birdSlice'

const reducer = {
  birdsData: birdSlice.reducer
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  root
)
