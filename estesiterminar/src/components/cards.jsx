import React from 'react';
import './cards.css'; // Asegúrate de que los estilos están en el mismo nivel de carpeta

const Card = ({ imgSrc, title, description }) => {
  return (
    <div className="card">
      <img src={imgSrc} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Reservar</button>
    </div>
  );
};

export default Card;
