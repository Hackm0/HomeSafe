import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Navbar.css";
import logo from './logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src={logo} alt="Logo" width="auto" height="auto" />

      </div>
      <ul className="navbar-list">
        {/* Internal links using React Router's Link */}
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/Radon">Radon</Link>
        </li>
        <li className="nav-item">
          <Link to="/Asbestos">Asbestos</Link>
        </li>
        <li className="nav-item">
          <Link to="/Lead">Lead</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="nav-item">
          <Link to="/services">Services</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
