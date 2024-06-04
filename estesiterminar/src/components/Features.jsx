import React from 'react';
import './Features.css';
function Features() {
  return (
    <div className="conteiner2">
      <div className="can">
        <figure>
          <img src="img/compromiso.png" alt="compromiso" className="imagen2" />
        </figure>
        <div className="contenido">
          <h2>Compromiso</h2>
          <p>
            Esperamos que tengas puesta la camiseta de IDW alojamiento, ofrecemos una 
            amplia gama de opciones de alojamiento para adaptarnos a las necesidades y 
            preferencias del cliente, desde hoteles de lujo hasta hostales económicos.
            Nos esforzamos por personalizar las experiencias de alojamiento para cada 
            cliente, ofreciendo servicios a medida y adaptándose a las solicitudes especiales
          </p>
        </div>
      </div>
      <div className="can">
        <figure>
          <img src="img/flixibi...png" alt="Flexibilidad" className="imagen3" />
        </figure>
        <div className="contenido">
          <h2>Flexibilidad</h2>
          <p>
            Flexibilidad comprendemos la naturaleza cambiante de los planes de viaje y ofrecemos políticas 
            de cancelación flexibles para brindar tranquilidad a los clientes 
            en caso de cambios de último minuto.
            podemos ir más allá y ser mejores en lo que hacemos.
          </p>
        </div>
      </div>
      <div className="can">
        <figure>
          <img src="img/trabajo en quipo.jpg" alt="trabajo en equipo" className="imagen4" />
        </figure>
        <div className="contenido">
          <h2>Trabajo en equipo</h2>
          <p>
            Trabajamos juntos aportando nuestra pasión y experiencia para hacer 
            lo mejor de tu viaje en IDW alojamiento. con un equipo dedicado ala atención
            del cliente disponible para ayudar en todo momento, brindando asistencia 
            rápida y soluciones efectivas ante cualquier problema o solicitud.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;
