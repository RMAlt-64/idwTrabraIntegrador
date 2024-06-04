import React from 'react';
import './ContactForm.css';

const ContactForm = () => {
  return (
    <section className="formul">
      <h1 className="contac">¡Contáctanos!</h1>
      <form action="#" method="post">
        <p>
          <label htmlFor="nombre" className="name">Nombre
            <span className="obligatorio">*</span>
          </label>
          <input type="text" name="introNom" id="nombre" placeholder="Escribe tu nombre" />
        </p>
        <p>
          <label htmlFor="email" className="correo">Email
            <span className="obligatorio">*</span>
          </label>
          <input type="email" name="introEm" id="email" placeholder="Escribe tu Email" />
        </p>
        <p>
          <label htmlFor="telefono" className="phone">Teléfono </label>
          <input type="tel" name="introTel" id="telefono" placeholder="Escribe tu teléfono" />
        </p>
        <p>
          <label htmlFor="asunto">Asunto
            <span className="obligatorio">*</span>
          </label>
          <input type="text" name="asunto" id="asunto" placeholder="Escribe un asunto" />
        </p>
        <p>
          <label htmlFor="mensaje" className="mesagge">Mensaje
            <span className="obligatorio">*</span>
          </label>
          <textarea name="introMen" className="texto_mensaje" id="mensaje" placeholder="Deja aquí tu comentario..."></textarea>
        </p>
        <button>Enviar</button>
        <p className="aviso">
          <span className="obligatorio"> *</span>Los campos son obligatorios.
        </p>
      </form>
    </section>
  );
};

export default ContactForm;
