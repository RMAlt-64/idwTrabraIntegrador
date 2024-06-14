import React, { useState } from 'react';
import './EditarTipoAlojamiento.css';
import Alert from '../../components/Alert/Alert';
import { NavLink } from 'react-router-dom';
import { GetAllTiposAlojamiento } from '../../components/form/GetAllTiposAlojamiento/GetAllTiposAlojamiento';

export const EditarTipoAlojamiento = () => {
    const [alojamientoId, setAlojamientoId] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'alojamientoId') {
            setAlojamientoId(value);
        } else if (name === 'descripcion') {
            setDescripcion(value);
        }
        if (alertMessage) {
            setAlertMessage('');
            setAlertType('');
        }
    };

    const editarAlojamiento = async () => {
        try {
            const response = await fetch(`http://localhost:3001/tiposAlojamiento/putTipoAlojamiento/${alojamientoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Descripcion: descripcion }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setAlertMessage('Alojamiento actualizado con éxito.');
                    setAlertType('success');
                } else {
                    setAlertMessage(result.message || 'Error al actualizar el alojamiento.');
                    setAlertType('error');
                }
            } else {
                const errorText = await response.text();
                console.error('Error al actualizar el alojamiento:', errorText);
                setAlertMessage('Error al actualizar el alojamiento');
                setAlertType('error');
            }
        } catch (error) {
            console.error('Error: ', error);
            setAlertMessage('Error al establecer el servicio. Por favor, intente de nuevo.');
            setAlertType('error');
        }
    };

    const actualizarLista = () => {
        setRefreshTrigger(!refreshTrigger);
    };

    return (
        <div className='contalojamiento'>
            <h2>Editar Alojamiento</h2>
            <div className='tipoalojamiento'>
                <GetAllTiposAlojamiento refreshTrigger={refreshTrigger} />
            </div>
            <input
                type="text"
                name="alojamientoId"
                value={alojamientoId}
                onChange={handleInputChange}
                placeholder="Ingrese el ID del alojamiento"
                className='entradadetex'
            />
            <input
                type="text"
                name="descripcion"
                value={descripcion}
                onChange={handleInputChange}
                placeholder="Ingrese la nueva descripción"
                className='entradadetex'
            />
            {alertMessage && <Alert message={alertMessage} type={alertType} className="custom-style" />}

            <div className="botonesContainer">
                <button className='enviarform d-flex align-items-center justify-content-center' onClick={editarAlojamiento}>
                    Editar alojamiento
                </button>
                <button className='actualizarLista' onClick={actualizarLista}>
                    Actualizar lista
                </button>
                <button className='volver'>
                    <NavLink to="/AdministrarAlojamientos" className='volveradmin'>Volver</NavLink>
                </button>
            </div>
        </div>
    );
};
