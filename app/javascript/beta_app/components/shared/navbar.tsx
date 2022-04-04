import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (): JSX.Element => (
  <div className='navbar navbar-expand-sm navbar-light'>
    <Link to='/beta' className='navbar-brand hover-pointer hover-opacity'>
      <p>Swedish Birds</p>
    </Link>

    <span className='navbar-toggler-icon ml-auto hover-pointer hover-opacity' id='dropdownMenuLink' data-toggle='dropdown' />

    <ul className='navbar-nav nav-collapse'>
      <li className='nav-item dropdown-menu dropdown-menu-right' aria-labelledby='dropdownMenuLink'>
        <a href='/users/sign_out' data-method='delete' className='dropdown-item'>Log out</a>
      </li>
    </ul>
  </div>
)

export default Navbar
