import React from 'react'

import { useAppSelector } from '../../hooks'

const Navbar = (): JSX.Element => {
  const isUserLoggedIn = useAppSelector(state => state.userData.isLoggedIn)
  let authenticationLink: string
  let authenticationLinkMethod: string
  let authenticationText: string

  if (isUserLoggedIn === true) {
    authenticationLink = '/users/sign_out'
    authenticationLinkMethod = 'delete'
    authenticationText = 'Log out'
  } else {
    authenticationLink = '/users/sign_in'
    authenticationLinkMethod = 'get'
    authenticationText = 'Log in'
  }

  return (
    <div className='navbar navbar-expand-sm navbar-light'>
      <div className='navbar-brand'>
        <p>Swedish Birds</p>
      </div>

      <span className='d-flex align-items-center navbar-toggler-icon ml-auto hover-pointer hover-opacity' id='dropdownMenuLink' data-toggle='dropdown'>
        <svg width='24' height='22' viewBox='0 0 24 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <line y1='1' x2='24' y2='1' stroke='#70997B' strokeWidth='2' />
          <line x1='6' y1='11' x2='24' y2='11' stroke='#70997B' strokeWidth='2' />
          <line x1='4.56119e-08' y1='21' x2='24' y2='21' stroke='#70997B' strokeWidth='2' />
        </svg>
      </span>

      <ul className='navbar-nav nav-collapse'>
        <li className='nav-item dropdown-menu dropdown-menu-right' aria-labelledby='dropdownMenuLink'>
          <a href={authenticationLink} data-method={authenticationLinkMethod} className='dropdown-item'>{authenticationText}</a>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
