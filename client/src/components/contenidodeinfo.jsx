// src/components/MainContent.js
import React from 'react';
import Card from './Card';
import './MainContent.css';

const MainContent = () => (
  <div className="conteiner2">
    <Card 
      image="img/compromiso.png"
      title="Compromiso"
      text="Esperamos que tengas puesta la camiseta de IDW alojamiento, ofrecemos una amplia gama de opciones de alojamiento para adaptarnos a las necesidades y preferencias del cliente, desde hoteles de lujo hasta hostales económicos. Nos esforzamos por personalizar las experiencias de alojamiento para cada cliente, ofreciendo servicios a medida y adaptándose a las solicitudes especiales."
    />
    <Card 
      image="img/flixibilidad.png"
      title="Flexibilidad"
      text="Comprendemos la naturaleza cambiante de los planes de viaje y ofrecemos políticas de cancelación flexibles para brindar tranquilidad a los clientes en caso de cambios de último minuto. Podemos ir más allá y ser mejores en lo que hacemos."
    />
    <Card 
      image="img/trabajo en equipo.jpg"
      title="Trabajo en equipo"
      text="Trabajamos juntos aportando nuestra pasión y experiencia para hacer lo mejor de tu viaje en IDW alojamiento. Con un equipo dedicado a la atención del cliente disponible para ayudar en todo momento, brindando asistencia rápida y soluciones efectivas ante cualquier problema o solicitud."
    />
    <div className="mapa">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13624.672418354274!2d-58.0226992!3d-31.381928!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ade8161e0ef8c7%3A0x732306b63f61c0e2!2sFacultad%20de%20Ciencias%20de%20la%20Administraci%C3%B3n%20(UNER)!5e0!3m2!1ses-419!2sar!4v1682983247246!5m2!1ses-419!2sar"
        width="100%"
        height="200"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
      ></iframe>
    </div>
  </div>
);

export default MainContent;
