import React, { useState } from 'react';
import './DeleteTipoAlojamiento.css';
import Alert from '../../Alert/Alert';

export const DeleteTipoAlojamiento = () => {
    const [alojamientoId, setAlojamientoId] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleInputChange = (e) => {
        setAlojamientoId(e.target.value);
        if (alertMessage) {
            setAlertMessage('');
            setAlertType('');
        }
    };

    const eliminarAlojamiento = async () => {
        try {
            const response = await fetch(`http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${alojamientoId}`, {
                method: 'DELETE',
            });

            console.log('Response status:', response.status);

            if (response.status === 204 || response.status === 200) {
                const responseData = await response.json();
                if (responseData.message === "Tipo de alojamiento eliminado correctamente") {
                    setAlertMessage('Alojamiento eliminado');
                    setAlertType('success');
                } else {
                    const errorText = await response.text();
                    console.error('Error al eliminar el alojamiento:', errorText);
                    setAlertMessage('Error al eliminar el alojamiento');
                    
                }
            } else {
                const errorText = await response.text();
                console.error('Error al eliminar el alojamiento:', errorText);
                setAlertMessage('Error al eliminar el alojamiento');
                
            }
        } catch (error) {
            console.error('Error: ', error);
            setAlertMessage('Error al establecer el servicio. Por favor, intente de nuevo.');
            
        }
    };

    return (
        <div className='eliminaralojcontenedor'>
            <input
                type="text"
                value={alojamientoId}
                onChange={handleInputChange}
                placeholder="Ingrese el ID del alojamiento a borrar"
                className='inputaloj'
            />
            {alertMessage && <Alert message={alertMessage} type={alertType} className="custom-style" />}
            <button className='deletealoj' onClick={eliminarAlojamiento}>
                Eliminar Alojamiento
            </button>
        </div>
    );
}

export default DeleteTipoAlojamiento;
