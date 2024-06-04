import React from 'react';

function Map() {
  return (
    <div className="mapa">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13624.
        672418354274!2d-58.0226992!3d-31.381928!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ade8161e0ef8c
        7%3A0x732306b63f61c0e2!2sFacultad%20de%20Ciencias%20de%20la%20Administraci%C3%B3n%20(UNER)!5e0!3m2!1ses-419!2sar!
        4v1682983247246!5m2!1ses-419!2sar"
        width="100%"
        height="200"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Map;
