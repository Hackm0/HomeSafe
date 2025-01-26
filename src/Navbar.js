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
        {/* External link for "Home" */}
        <li className="nav-item">
          <a
            href="https://www.journalacces.ca/actualite/amiante-dans-les-batiments-une-carte-interactive-comme-outil-de-prevention/#:~:text=Amiante%20dans%20les%20b%C3%A2timents%20%3A%20Une%20carte%20interactive%20produite%20par,qui%20contiennent%20de%20l'amiante."
            target="_blank"
            rel="noopener noreferrer"
          >
            Home
          </a>
        </li>
        {/* Internal links using React Router's Link */}
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
