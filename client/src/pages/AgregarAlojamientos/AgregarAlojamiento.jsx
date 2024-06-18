
import React, {useEffect,useState} from "react";

const AgregarAlojamiento = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoAlojamiento, setTipoAlojamiento] = useState('');
    const [tiposAlojamientos, setTiposAlojamientos] = useState([]);
    const [latitud, setLatitud] = useState('');
    const [longuitud, setLonguitud] = useState('');
    const [precioPorDia, setPrecioPorDia] = useState('');
    const [cantidadDormitorios, setCantidadDormitorios] = useState('');
    const [cantidadBanios, setCantidadBanios] = useState('');
    const [estado, setEstado] = useState('Disponible');
    useEffect(() =>{
        const tipoAlojamientos = async()=>{
            try{
                const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
                if (response.ok){
                    const data = await response.json();
                    setTiposAlojamientos(data);
                }else{
                    console.error('Error al elcrear el alojamiento');
                    alert('Error al obtener los tipos de alojamientos')
                }
            }catch (error){
                console.error('Error al conectarse con la API', error);
                alert('Error al conectarse con la API')
            }   
        }
        tipoAlojamientos();
    }, []);

    const handleSumit = async (e) => {
        e.preventDefault();
        const data = {
        
            Titulo: titulo,
            Descripción: descripcion,
            TipoAlojamiento: tipoAlojamiento,
            Latitud: parseFloat(latitud),
            Longitud: parseFloat(longuitud),
            PrecioPorDia: parseFloat(precioPorDia),
            CantidadDormitorios: parseFloat(cantidadDormitorios, 10),
            CantidadBanios: parseFloat(cantidadBanios, 10),
            Estado: estado
        };
        

        try {
            const response = await fetch ('http://localhost:3001/alojamiento/createAlojamiento',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                }, 
                body: JSON.stringify(data),
            });
            if (response.ok){
                alert('Alojamiento creado exitasamente.');
            } else{
                console.error('Error al crear el alojamiento');
                alert('Error al crear el alojamiento')
            }
        } catch (error){
            console.error('Error al conectarse con la API', error);
            alert('Error al conectarse con la API')
        }
    };

  return (
    <div className="container-fluid mb-2">
        <h2>Agregar Nuevo Alojamiento</h2>
        <form className="row gy-2 gx-3 align-items-center" onSubmit={handleSumit} >
            <div className="col-auto">
                <label htmlfor="titulo" className="form-label"><h5>Titulo</h5></label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="titulo"
                    placeholder=""
                    value = {titulo}
                    onChange= {(e) => setTitulo(e.target.value)}>   
                </input>
            </div>
            <div className="col-auto">
                <label htmlfor="descripcion" className="form-label"><h5>Descripción</h5></label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="descripcion"
                    placeholder=""
                    value = {descripcion}
                    onChange= {(e) => setDescripcion(e.target.value)}>   
                </input>
            </div>
            
            <div className="col-auto">
                <label htmlfor="tipoAlojamiento" className="form-label"><h5>Tipo de Alojamiento</h5></label>
                <select id="tipoAlojamiento" class="form-select" value = {descripcion}
                onChange= {(e) => setTipoAlojamiento(e.target.value)}>   
                    <option value={''}>Seleccione el Tipo de Alojamiento</option>
                    {tiposAlojamientos.map((tipo) => 
                    <option key= {tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>{tipo.Descripcion}</option>
                    )}
                    
                </select>
            </div>
            <div className="col-auto">
                <label htmlfor="latitud" className="form-label"><h5>Latitud</h5></label>
                <input 
                    type="number" 
                    className="form-control col-3" 
                    id="latitud"
                    placeholder="Número"
                    value = {latitud}
                    onChange= {(e) => setLatitud(e.target.value)}>   
                </input>
            </div>
            <div className="col-auto">
                <label htmlfor="longuitud" className="form-label"><h5>Longuitud</h5></label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="longuitud"
                    placeholder="Número"
                    value = {longuitud}
                    onChange= {(e) => setLonguitud(e.target.value)}>   
                </input>
            </div>
            <div className="col-auto">
                <label htmlfor="cantidadDormitorios" className="form-label"><h5>Cantidad de dormitorios</h5></label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="cantidadDormitorios"
                    placeholder="Número"
                    value = {cantidadDormitorios}
                    onChange= {(e) => setCantidadDormitorios(e.target.value)}>   
                </input>
            </div>
            <div className="col-auto">
                <label htmlfor="cantidadBanios" className="form-label"><h5>Cantidad de Baños</h5></label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="cantidadBanios"
                    placeholder="Número"
                    value = {cantidadBanios}
                    onChange= {(e) => setCantidadBanios(e.target.value)}>   
                </input>
            </div>
            <div className="col-auto">
                <label htmlFor="estado" class="form-label">Estado</label>
                <select id="estado" class="form-select"
                value = {estado}
                onChange= {(e) => setEstado(e.target.value)}>
                    <option>Disponible</option>
                    <option>Reservado</option>
                </select>
            </div>
            <div className="col-auto">
                <label htmlFor="precioPorDia" class="form-label">Precio por dia</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="precioPorDia"
                    placeholder="Número"
                    value = {precioPorDia}
                    onChange= {(e) => setPrecioPorDia(e.target.value)}>   
                </input>
            </div>
            <button type="submit" className="btn btn-primary col-md-1 m-2">Enviar</button>

        </form>
    </div>
  )
}

export default AgregarAlojamiento





