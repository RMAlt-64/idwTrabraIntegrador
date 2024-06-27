import React from 'react'
import { NavLink } from 'react-router-dom';

import { GetAllTiposAlojamiento } from '../../components/form/GetAllTiposAlojamiento/GetAllTiposAlojamiento'

export const AllTiposAlojamientos = () => {


    return (
        <div className='contalojamiento '>
            <h2>Tipos de Alojamientos</h2>
            <GetAllTiposAlojamiento />
            <button className='volver'>
                    <NavLink to="/AdministrarAlojamientos" className='volveradmin'>Volver</NavLink>
                </button>

        </div>
    )
}

