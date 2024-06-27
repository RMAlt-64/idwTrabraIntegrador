import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <section className="secEnd">
        <div className="contenedorFlex">
          <div className="caja2">
            <h4>Contacto</h4>
            <p>para hacer su reserva através del telefono  +55 (82) 2123-4822 | WhatsApp: +55 (82) 3435-8322</p>
          </div>
          <div className="caja2">
            <h4>Dirección</h4>
            <p>Rod. AL 101 Norte, Praia de Antunes,  1840 – Maragogi – Cep 57955-000. Caixa Postal 35.</p>
          </div>
          <div className="caja2">
            <h4>E-mail</h4>
            <p>Envie sus dudas a siguientes E-mail: ruben.manuel.almiron@gmail.com</p>
          </div>
        </div>
      </section>
      <div className="footer">
        <p>&copy; IDW 2024. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
