import React from 'react';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';

const ContactPage = () => {
  return (
    <div className="contenedorformularito">
      <ContactForm />
      <ContactInfo />
    </div>
  );
};

export default ContactPage;
