import React from 'react'
import ReactDOM from 'react-dom'
import { fetchBirds, fetchFamilies, fetchOrders, isUserLoggedIn } from '../api'
import { useAppDispatch } from '../hooks'
import BirdList from './bird/bird_list'

import Navbar from './shared/navbar'
import FilterGroup from './filters/filter_group'
import Counter from './filters/counter'
import FlashMessage from './shared/flash_message'

const navbarContainer = document.getElementById('navbar-container') as HTMLElement

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  void dispatch(isUserLoggedIn())
  void dispatch(fetchBirds())
  void dispatch(fetchFamilies())
  void dispatch(fetchOrders())

  return (
    <>
      {ReactDOM.createPortal(<Navbar />, navbarContainer)}
      <FilterGroup />
      <Counter />
      <BirdList />
      <FlashMessage />
    </>
  )
}

export default App
