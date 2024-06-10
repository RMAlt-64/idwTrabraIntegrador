import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="enlace">
        <div className="logo-container">
          <img src="/img/globo.png" alt="Logo" className="logo" />
          <h1>IDW Alojamiento</h1>
        </div>
      </Link>

      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><a href="/reservar">Reserva</a></li>
        <li><Link to="/informacion">Información</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/login">Login</Link></li> {/* Cambiado de <a> a <Link> */}
        <li><a href="/AdministrarAlojamientos">CRUD</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
