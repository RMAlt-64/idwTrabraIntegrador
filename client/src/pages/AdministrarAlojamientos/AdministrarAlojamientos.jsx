import React from 'react'
import './AdministrarAlojamientos.css'
import '../AgregarAlojamientos/agregarAlojamiento.css'
import { NavLink } from 'react-router-dom';

export const AdministrarAlojamientos = () => {
    return (
       
        <div className='contenedoradmin'>
            <h2 class="text-primary">ADMINISTRACIÓN</h2>
            <div className='contenedorDeLinks'>
                <NavLink to="/AgregarTipoAlojamiento" className='adminAlojamiento'>Agregar tipo de alojamiento</NavLink>
                <NavLink to="/EditarTipoAlojamiento" className='adminAlojamiento'>Editar tipo de alojamientos</NavLink>
                <NavLink to="/EliminarTipoAlojamiento" className='adminAlojamiento'>Eliminar tipo de alojamientos</NavLink>
                <NavLink to="/GetTipoAlojamiento" className='adminAlojamiento'>Buscar por id</NavLink>
                <NavLink to="/AllTiposAlojamientos" className='adminAlojamiento'>Obtener todos los tipos de alojamientos</NavLink>
            </div>
            
            <div className='container-fluid p-3'>
                <NavLink to ="/AgregarAlojamiento" className = 'agregarAlojamiento'><button type="button" className="btn btn-dark d-flex justify-content-center align-items-center">Agregar Alojamiento</button></NavLink>
            </div>
            
           
        </div>
       
        
    )
}
