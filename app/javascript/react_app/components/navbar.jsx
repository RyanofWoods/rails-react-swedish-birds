import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/owl.png';

const Navbar = () => (
  <div className="navbar navbar-expand-sm navbar-light navbar-lewagon">
    <Link to="/" className="navbar-brand hover-pointer hover-opacity">Swedish Birds</Link>

    <img src={logo} alt="logo" id="dropdownMenuLink" className="avatar ml-auto hover-pointer hover-opacity" data-toggle="dropdown" />

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
