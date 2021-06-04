import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/transparent_64.png';

const Navbar = () => (
  <div className="navbar navbar-expand-sm navbar-light">
    <Link to="/" className="navbar-brand hover-pointer hover-opacity">
      <img src={logo} className="avatar" alt="logo" />
      <p>Swedish Birds</p>
    </Link>

    <span className="navbar-toggler-icon ml-auto hover-pointer hover-opacity" id="dropdownMenuLink" data-toggle="dropdown" />

    <ul className="navbar-nav nav-collapse">
      <li className="nav-item dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
        <Link to="/lifelist" className="dropdown-item">Lifelist</Link>
        <Link to="/settings" className="dropdown-item">Settings</Link>

        <a href="/users/sign_out" data-method="delete" className="dropdown-item">Log out</a>
      </li>
    </ul>
  </div>
);

export default Navbar;
