import React, { useState, useEffect} from 'react';



const ListaAlojamiento = () => {
    const [alojamiento, setAlojamiento] = useState ([]);
    const [tipoAlojamiento, setTipoAlojamiento] = useState ([]);

    useEffect(()=> {
        const fetchAlojamiento = async () => {
            try{
                const alojamientoResponse = await fetch ('http://localhost:3001/alojamiento/getAlojamientos');
                if (alojamientoResponse.ok){
                    const data = await alojamientoResponse.json();
                    const alojamientosConTipoDeDescripcion = await Promise.all(
                        data.map( async alojamiento =>{
                            const tipoResponse = await fetch(`http:localhost:3001/tipoAlojamiento/getTipoAlojamiento/${alojamiento.idTipoAlojamiento}`)
                            if (tipoResponse.ok){
                                const dataTipo = await tipoResponse.json();
                                return {... alojamiento, tipoAlojamientoDescripcion: dataTipo.Descripcion}

                            }else{
                                console.log('Error');
                                return alojamiento
                            }
                        })
                    );
                    setAlojamiento(alojamientosConTipoDeDescripcion)
                } else {
                    console.log('Error')
                }
            } catch(error){
                console.log('Error',error);
            }

        };
        fetchAlojamiento();
    },[]);
    return (
        <>

        </>
    )
}