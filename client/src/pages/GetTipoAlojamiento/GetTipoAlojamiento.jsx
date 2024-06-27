import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';

export const GetTipoAlojamiento = () => {
    const [alojamientoId, setAlojamientoId] = useState('');
    const [alojamientoData, setAlojamientoData] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleInputChange = (e) => {
        setAlojamientoId(e.target.value);
        if (alertMessage) {
            setAlertMessage('');
            setAlertType('');
        }
    };

    const obtenerAlojamiento = async () => {
        try {
            const response = await fetch(`http://localhost:3001/tiposAlojamiento/getTipoAlojamiento/${alojamientoId}`);
            
        
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setAlojamientoData(data);
                
            } else {
                console.error('Error al obtener el alojamiento');
                setAlertMessage('Error al obtener el alojamiento.');
                setAlertType('error');
            }
        } catch (error) {
            console.log('Error al establecer el servicio. Por favor, intente de nuevo.');
            setAlertType('error');
        }
    }

    return (
        <div className='contalojamiento'>
            <h2>Obtener Alojamiento por ID</h2>
            <input
                type="text"
                value={alojamientoId}
                onChange={handleInputChange}
                placeholder="Ingrese el ID del alojamiento"
                className='inputGetAlojamiento'
            />
            {alertMessage && <Alert message={alertMessage} type={alertType} className="custom-style" />}
        <div className="bottonaloj">
            <button className='btn btn-primary d-flex justify-content-center align-items-center m-2' onClick={obtenerAlojamiento}>
                Obtener Alojamiento
            </button>

            <button className='btn btn-primary d-flex justify-content-center align-items-center m-2 text-decoration-none' >
                <NavLink to="/AdministrarAlojamientos" className="link-warning link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">Volver</NavLink>
            </button>
            </div>
            {alojamientoData && (
                <div className='contalojamiento'>
                    <h3>Información del Alojamiento</h3>
                    <p>ID: <span>{alojamientoData.idTipoAlojamiento}</span></p>
                    <p>Descripción: <span>{alojamientoData.Descripcion}</span></p>
                </div>
            )}
        </div>
    );
}

export default GetTipoAlojamiento;
