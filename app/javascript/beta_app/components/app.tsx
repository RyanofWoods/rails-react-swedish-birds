import React from 'react'
import ReactDOM from 'react-dom'
import { fetchBirds } from '../api'
import { useAppDispatch } from '../hooks'
import BirdList from './bird/bird_list'

import Navbar from './shared/navbar'

const navbarContainer = document.getElementById('navbar-container') as HTMLElement

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  void dispatch(fetchBirds())

  return (
    <>
      {ReactDOM.createPortal(<Navbar />, navbarContainer)}
      <BirdList />
    </>
  )
}

export default App
