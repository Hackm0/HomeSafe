import React from 'react';
import './Navbar.css';
import logo from './logo.png';

const Navbar = () => {
    return <nav className="navbar">
        <div className="navbar-logo spinner">
        <img src={logo} alt="Logo" width="auto" height="auto" />

        </div>
        <ul className="navbar-list">
            <a className="nav-item" href ="https://www.journalacces.ca/actualite/amiante-dans-les-batiments-une-carte-interactive-comme-outil-de-prevention/#:~:text=Amiante%20dans%20les%20b%C3%A2timents%20%3A%20Une%20carte%20interactive%20comme%20outil%20de%20pr%C3%A9vention&text=Une%20carte%20interactive%20produite%20par,qui%20contiennent%20de%20l'amiante."  rel="noopener noreferrer external" >Home</a>
            <li className="nav-item">About</li>
            <li className="nav-item">Contact</li>
            <li className="nav-item">Services</li>
        </ul>
    </nav>
}

export default Navbar