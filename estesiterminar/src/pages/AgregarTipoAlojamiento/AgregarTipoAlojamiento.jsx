import React from 'react'
import { AddTipoAlojamiento } from '../../components/form/AddTipoAlojamiento/AddTipoAlojamiento'

export const AgregarAlojamiento = () => {


    return (
        <div className='contalojamiento'>
            <h2>Agregar tipo de Alojamiento</h2>
            <p>Ingresa alojamiento que quieras agregar</p>
            < AddTipoAlojamiento />
        </div>
    )
}

