import React from 'react'
import './AdministrarAlojamientos.css'
import '../AgregarAlojamientos/buttonAlojamiento.css'
import { NavLink } from 'react-router-dom';

export const AdministrarAlojamientos = () => {
    return (
       
        <div className='contenedoradmin'>
            <h2 className="text-primary">ADMINISTRACIÓN</h2>
            <div className='contenedorDeLinks'>
                <NavLink to="/AgregarTipoAlojamiento" className='adminAlojamiento'>Agregar tipo de alojamiento</NavLink>
                <NavLink to="/EditarTipoAlojamiento" className='adminAlojamiento'>Editar tipo de alojamientos</NavLink>
                <NavLink to="/EliminarTipoAlojamiento" className='adminAlojamiento'>Eliminar tipo de alojamientos</NavLink>
                <NavLink to="/GetTipoAlojamiento" className='adminAlojamiento'>Buscar por id</NavLink>
                <NavLink to="/AllTiposAlojamientos" className='adminAlojamiento'>Obtener todos los tipos de alojamientos</NavLink>
            </div>
            
            <div className='container-fluid d-flex justify-content-center align-items-center p-3'>
                <NavLink to ="/AgregarAlojamiento" className= 'buttonAlojamiento'><button type="button" className="btn btn-dark d-flex justify-content-center align-items-center m-2">Agregar Alojamiento</button></NavLink>
                <NavLink to ="/ListaAlojamiento" className= 'buttonAlojamiento'><button type="button" className="btn btn-dark d-flex justify-content-center align-items-center m-2">Lista de Alojamientos</button></NavLink>
                <NavLink to ="/AgregarServicio" className= 'buttonAlojamiento'><button type="button" className="btn btn-warning d-flex justify-content-center align-items-center m-2">Agregar Servicios</button></NavLink>
                <NavLink to ="/AlojamientosYServicios" className= 'buttonAlojamiento'><button type="button" className="btn btn-warning d-flex justify-content-center align-items-center m-2">Alojamientos Y Servicios</button></NavLink>
                <NavLink to ="/AdministracionImagenes" className= 'buttonAlojamiento'><button type="button" className="btn btn-danger d-flex justify-content-center align-items-center m-2">Administración de Imagenes</button></NavLink>
            </div>
            
           
        </div>
       
        
    )
}
