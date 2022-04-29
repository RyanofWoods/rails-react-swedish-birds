import React from 'react'
import ReactDOM from 'react-dom'
import { fetchBirds, fetchFamilies, fetchOrders } from '../api'
import { useAppDispatch } from '../hooks'
import BirdList from './bird/bird_list'

import Navbar from './shared/navbar'
import FilterGroup from './filters/filter_group'
import Counter from './filters/counter'

const navbarContainer = document.getElementById('navbar-container') as HTMLElement

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  void dispatch(fetchBirds())
  void dispatch(fetchFamilies())
  void dispatch(fetchOrders())

  return (
    <>
      {ReactDOM.createPortal(<Navbar />, navbarContainer)}
      <FilterGroup />
      <Counter />
      <BirdList />
    </>
  )
}

export default App
