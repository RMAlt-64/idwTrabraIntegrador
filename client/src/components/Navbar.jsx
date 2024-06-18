import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './img/globo.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary text-secondary text-uppercase fw-medium">
      <div className="container-fluid">
        <Link to="/" className="titulo">
          <div className="d-flex justify-content-between align-items-center">
            <img src={Logo}alt="Logo" width="88" height="80"></img>
            <h2>IDW Alojamiento</h2>
          </div>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-1">
            <li className="nav-item me-3"><Link to="/" className='item'>Inicio</Link></li>
            <li className="nav-item me-3"><a href="/reservar" className='item'>Reserva</a></li>
            <li className="nav-item me-3"><Link to="/informacion" className='item'>Información</Link></li>
            <li className="nav-item me-3"><Link to="/contacto" className='item'>Contacto</Link></li>
            <li className="nav-item me-3"><a href="/AdministrarAlojamientos" className='item'>Administración</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
