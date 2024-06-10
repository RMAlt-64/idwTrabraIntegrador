import React, { useState } from 'react';
import './AddTipoAlojamiento.css';
import { NavLink } from 'react-router-dom';
import { Alert } from '../../Alert/Alert';

export const AddTipoAlojamiento = () => {
    const [descripcion, setDescripcion] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const enviar = async (e) => {
        e.preventDefault();

        try {
            const obtenerResponse = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
            if (obtenerResponse.ok) {
                const alojamientos = await obtenerResponse.json();
                console.log('Tipos de alojamientos obtenidos:', alojamientos);

                const existealojamiento = alojamientos.some(alojamiento => alojamiento.Descripcion.toLowerCase() === descripcion.toLowerCase());

                if (existealojamiento) {
                    setAlertMessage('Este alojamiento ya se encuentra registrado');
                    return;
                }
            } else {
                console.error('Error al obtener los tipos de alojamientos');
                setAlertMessage('Error al verificar el tipo de alojamiento');                return;
            }

            const newAlojamiento = { Descripcion: descripcion };
            console.log('Nuevo alojamiento a agregar:', newAlojamiento);

            const response = await fetch('http://localhost:3001/tiposAlojamiento/createTipoAlojamiento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAlojamiento)
            });

            if (response.ok) {
                setAlertMessage('El alojamiento fue agregado');
                
            } else {
                const errorResponse = await response.json();
                console.error('Error al agregar el alojamiento', errorResponse);
                setAlertMessage('Error al agregar el alojamiento');
                
            }
        } catch (error) {
            console.error('Error: ', error);
            setAlertMessage('Error al establecer el servicio. Por favor, intente de nuevo.');
        }
    };

    const handleInputChange = (e) => {
        setDescripcion(e.target.value);
        if (alertMessage) {
            setAlertMessage('');
            setAlertType('');
        }
    };

    return (
        <form className='contenedorform' onSubmit={enviar}>
            <div>
                <label htmlFor="descripcion"></label>
                <input
                    type="text"
                    id='descripcion'
                    name='descripcion'
                    placeholder='Ingresa tu alojamiento'
                    className='inaloj'
                    required
                    value={descripcion}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                {alertMessage && <Alert message={alertMessage} type={alertType} className="custom-style" />}
            </div>
            <div className="botonesContainer">
                <button className='enviarform' type='submit'>
                    Enviar
                </button>
                <button className='volver'>
                    <NavLink to="/AdministrarAlojamientos" className='volveradmin'>Volver</NavLink>
                </button>
            </div>
        </form>
    );
};

export default AddTipoAlojamiento;
