import React from 'react';

import Card from '../components/cards';
import Seccion1 from '../components/Seccion1';
import Seccion2 from '../components/Seccion2';
import '../components/Homepage.css'; // Asegúrate de que los estilos están en el mismo nivel de carpeta

const HomePage = () => {
  return (
    <div>
      <Seccion1 />

      <div className="container">
        <Card 
          imgSrc="img/cancunn.jpg" 
          title="CANCUN" 
          description="Los mejores alojamientos con actividades recreativas, como deportes acuáticos, excursiones en la naturaleza o entretenimiento en vivo. Te ofrecemos un seguimiento después de la reserva para asegurarte de que todo esté en orden y resolver cualquier problema que pueda surgir durante la estadía." 
        />
        <Card 
          imgSrc="img/miami.jpg" 
          title="MIAMI" 
          description="Amplia gama de alojamientos en Miami, incluyendo hoteles, resorts, apartamentos vacacionales, hostales y más. Asistencia a los clientes durante el proceso de reserva, ya sea a través de herramientas en línea, contacto directo con los proveedores de alojamiento o recomendaciones personalizadas." 
        />
        <Card 
          imgSrc="img/paris.jpg" 
          title="PARIS" 
          description="París es una ciudad famosa por su belleza, historia y cultura, y ofrece una amplia variedad de opciones de alojamiento para satisfacer los diferentes gustos y presupuestos de los viajeros. Tenemos toda la información para vos viajero, para que puedas tener la mejor experiencia en tu viaje." 
        />
        <Card 
          imgSrc="img/Riooo.jpg" 
          title="RIO DE JANEIRO" 
          description="Rio de Janeiro es una ciudad vibrante y emocionante en Brasil, famosa por sus playas icónicas, su cultura diversa y su belleza natural impresionante, ofrece una amplia variedad de hoteles que van desde lujosos resorts frente al mar hasta opciones más económicas en áreas céntricas de la ciudad. Los barrios de Copacabana, Ipanema, Leblon y Barra da Tijuca son especialmente populares entre los turistas." 
        />
      </div>

      <Seccion2 />
      
    </div>
  );
};

export default HomePage;
