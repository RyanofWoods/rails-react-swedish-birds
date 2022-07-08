import React from 'react'

const Navbar = (): JSX.Element => (
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
        <a href='/users/sign_out' data-method='delete' className='dropdown-item'>Log out</a>
      </li>
    </ul>
  </div>
)

export default Navbar
