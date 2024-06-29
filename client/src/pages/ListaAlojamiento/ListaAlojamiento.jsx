import React, { useState, useEffect } from 'react';
import { Modal,Button, Form } from 'react-bootstrap';

const ListaAlojamiento = () => {
    const [alojamientos, setAlojamientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentAlojamiento, setCurrentAlojamiento] = useState(null);
    const [tipoFiltro, setTipoFiltro] = useState("");

    useEffect(() => {
        const fetchAlojamientos = async () => {
            try {
                
                const alojamientosResponse = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
                if (alojamientosResponse.ok) {
                    const data = await alojamientosResponse.json();
                    
                    const alojamientosConTipoDescripcion = await Promise.all(
                        data.map(async alojamiento => {
                            const tipoResponse = await fetch(`http://localhost:3001/tiposAlojamiento/getTipoAlojamiento/${alojamiento.TipoAlojamiento}`);
                            if (tipoResponse.ok) {
                                const dataTipo = await tipoResponse.json();
                                
                                return { ...alojamiento, tipoAlojamientoDescripcion: dataTipo.Descripcion};
                            } else {
                                console.log('Error al obtener el tipo de alojamiento');
                                return { ...alojamiento, tipoAlojamientoDescripcion: 'Tipo Desconocido' };
                            }
                        })
                    );
                    

                    setAlojamientos(alojamientosConTipoDescripcion);
                } else {
                    console.log('Error al obtener los alojamientos');
                }
            } catch (error) {
                console.log('Error al conectarse con la API', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlojamientos();
    }, []);
    const handleEdit = (alojamiento) => {
        console.log("Modificar alojamiento", alojamiento);
        setCurrentAlojamiento(alojamiento);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/alojamiento/deleteAlojamiento/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setAlojamientos(alojamientos.filter(alojamiento => alojamiento.idAlojamiento !== id));
            } else {
                console.error('Error al eliminar el alojamiento');
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
        }
    };
    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:3001/alojamiento/putAlojamiento/${currentAlojamiento.idAlojamiento}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Titulo: currentAlojamiento.Titulo,
                    PrecioPorDia: currentAlojamiento.PrecioPorDia,
                    Estado: currentAlojamiento.Estado
                })
            });
            if (response.ok) {
                const updatedAlojamientos = alojamientos.map(alojamiento =>
                    alojamiento.idAlojamiento === currentAlojamiento.idAlojamiento ? currentAlojamiento : alojamiento
                );
                setAlojamientos(updatedAlojamientos);
                setShowModal(false);
            } else {
                console.error('Error al actualizar el alojamiento');
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentAlojamiento({ ...currentAlojamiento, [name]: value });
    };
    
    const handleFilterChange = (e) => {
        setTipoFiltro(e.target.value);
    };
    const alojamientosFiltrados = tipoFiltro
        ? alojamientos.filter(alojamiento => alojamiento.tipoAlojamientoDescripcion === tipoFiltro)
        : alojamientos;
    

    if (loading) {
        return <p>Cargando alojamientos...</p>;
    }

    return (
        <><div className='container-fluid'>
            <h1>Lista de Alojamientos</h1>
            <div className="row justify-content-right mb-3">
                <div className="col-md-6">
                    <Form.Group controlId="filtroTipoAlojamiento">
                        <Form.Label> <h5>Filtrar por Tipo de Alojamiento</h5></Form.Label>
                        <Form.Control as="select" value={tipoFiltro} onChange={handleFilterChange}>
                            <option value="">Todos</option>
                            {Array.from(new Set(alojamientos.map(alojamiento => alojamiento.tipoAlojamientoDescripcion)))
                                .map((tipo, index) => (
                                    <option key={index} value={tipo}>{tipo}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>
            </div>
        
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Tipo de Alojamiento</th>
                        <th scope="col">Latitud</th>
                        <th scope="col">Longitud</th>
                        <th scope="col">Precio por Día</th>
                        <th scope="col">Cantidad de Dormitorios</th>
                        <th scope="col">Cantidad de Baños</th>
                        <th scope="col">Estado</th>
                        <th scope="col" className= 'text-center align-middle' >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alojamientosFiltrados.map((alojamiento, index) => (
                        <tr key={alojamiento.idAlojamiento}>
                            <th scope="row" className= 'text-center align-middle'>{index + 1}</th>
                            <td className= 'text-center align-middle'>{alojamiento.Titulo}</td>
                            <td className= 'text-center align-middle'>{alojamiento.Descripcion}</td>
                            <td className= 'text-center align-middle'>{alojamiento.tipoAlojamientoDescripcion}</td>
                            <td className= 'text-center align-middle'>{alojamiento.Latitud}</td>
                            <td className= 'text-center align-middle'>{alojamiento.Longitud}</td>
                            <td className= 'text-center align-middle'>{alojamiento.PrecioPorDia}</td>
                            <td className= 'text-center align-middle'>{alojamiento.CantidadDormitorios}</td>
                            <td className= 'text-center align-middle'>{alojamiento.CantidadBanios}</td>
                            <td className= 'text-center align-middle'>{alojamiento.Estado}</td>
                            <td>
                                <div className='container-fluid d-flex justify-content-center align-items-center'>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(alojamiento)}>Modificar</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(alojamiento.idAlojamiento)}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {currentAlojamiento && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modificar Alojamiento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       
                        <Form>
                            <Form.Group controlId="formTitulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Titulo"
                                    value={currentAlojamiento.Titulo}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPrecioPorDia">
                                <Form.Label>Precio por Día</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="PrecioPorDia"
                                    value={currentAlojamiento.PrecioPorDia}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEstado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="Estado"
                                    value={currentAlojamiento.Estado}
                                    onChange={handleChange}
                                >
                                    <option value="Disponible">Disponible</option>
                                    <option value="Reservado">Reservado</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                       
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                        <Button className='btn btn-primary d-flex justify-content-center align-items-center m-2' onClick={handleSaveChanges}>Guardar Cambios</Button>
                    </Modal.Footer>
                </Modal>
            )}
   
        </div>   
        </>
    );
};

export default ListaAlojamiento;


