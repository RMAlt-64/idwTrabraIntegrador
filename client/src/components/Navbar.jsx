import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './img/globo.png'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-info text-secondary text-uppercase fw-medium">
      <div className="container-fluid">
        <Link to="/" className="enlace">
          <div className="d-flex justify-content-between align-items-center">
            <img src={Logo}alt="Logo" width="88" height="80"></img>
            <h2>IDW Alojamiento</h2>
          </div>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-1">
            <li className="nav-item me-3"><Link to="/">Inicio</Link></li>
            <li className="nav-item me-3"><a href="/reservar">Reserva</a></li>
            <li className="nav-item me-3"><Link to="/informacion">Información</Link></li>
            <li className="nav-item me-3"><Link to="/contacto">Contacto</Link></li>
            <li className="nav-item me-3"><Link to="/login">Login</Link></li> {/* Cambiado de <a> a <Link> */}
            <li className="nav-item me-3"><a href="/AdministrarAlojamientos">CRUD</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
