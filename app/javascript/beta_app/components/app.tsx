import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './shared/navbar'

const navbarContainer = document.getElementById('navbar-container') as HTMLElement

const App: React.FC = () => (
  <>
    {ReactDOM.createPortal(<Navbar />, navbarContainer)}
    <div>Hello world</div>
  </>
)

export default App
