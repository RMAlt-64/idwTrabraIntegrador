import React, { useState } from 'react';
import './EliminarTipoAlojamiento.css';
import { DeleteTipoAlojamiento } from '../../components/form/DeleteTipoAlojamiento/DeleteTipoAlojamiento';
import { NavLink } from 'react-router-dom';
import { GetAllTiposAlojamiento } from '../../components/form/GetAllTiposAlojamiento/GetAllTiposAlojamiento';

export const EliminarTipoAlojamiento = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const actualizarLista = () => {
        setRefreshTrigger(!refreshTrigger);
    };

    return (
        <div className='contalojamiento'>
            <h2>Eliminar Alojamiento por ID</h2>
            <div className='tipodealojamiento'>
                <GetAllTiposAlojamiento refreshTrigger={refreshTrigger} />
            </div>
            <div className='eliminarAlojamiento'>
                <DeleteTipoAlojamiento />
            </div>
            <div className="botonesContainer">
            <button className='volver'>
                    <NavLink to="/AdministrarAlojamientos" className='volveradmin'>Volver</NavLink>
                </button>
                <button className='actualizalista' onClick={actualizarLista}>
                    Actualizar lista
                </button>
                
            </div>
        </div>
    );
}
