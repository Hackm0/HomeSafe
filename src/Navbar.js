import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Navbar.css";
import logo from './logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
        <a className="navbar-logo spinner" href="/">
        <img src={logo} alt="Logo" width="250" height="auto" />
        </a>
      <ul className="navbar-list">
        {/* Internal links using React Router's Link */}
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/ressources">Ressources</Link>
        </li>
      </ul>
      
    </nav>
  );
};

export default Navbar;
