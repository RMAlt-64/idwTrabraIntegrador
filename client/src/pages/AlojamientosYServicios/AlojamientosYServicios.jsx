import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const GestionAlojamientoServicio = () => {
    const [alojamientosServicios, setAlojamientosServicios] = useState([]);
    const [alojamientos, setAlojamientos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentRelacion, setCurrentRelacion] = useState();
    const [modalMode, setModalMode] = useState('');
    const [selectedAlojamiento, setSelectedAlojamiento] = useState('');

    useEffect(() => {
        const fetchAlojamientosServicios = async () => {
            try {
                const response = await fetch('http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios');
                if (response.ok) {
                    const data = await response.json();
                    setAlojamientosServicios(data);
                } else {
                    console.error('Error al obtener las relaciones entre alojamientos y servicios');
                }
            } catch (error) {
                console.error('Error al conectarse con la API', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchAlojamientos = async () => {
            try {
                const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
                if (response.ok) {
                    const data = await response.json();
                    setAlojamientos(data);
                } else {
                    console.error('Error al obtener los alojamientos');
                }
            } catch (error) {
                console.error('Error al conectarse con la API', error);
            }
        };

        const fetchServicios = async () => {
            try {
                const response = await fetch('http://localhost:3001/servicio/getAllServicios');
                if (response.ok) {
                    const data = await response.json();
                    setServicios(data);
                } else {
                    console.error('Error al obtener los servicios');
                }
            } catch (error) {
                console.error('Error al conectarse con la API', error);
            }
        };

        fetchAlojamientosServicios();
        fetchAlojamientos();
        fetchServicios();
    }, []);

    const handleCreate = () => {
        setCurrentRelacion({ idAlojamiento: '', idServicio: '' });
        setModalMode('create');
        setShowModal(true);
    };

    const handleEdit = (relacion) => {
        setCurrentRelacion(relacion);
        setModalMode('edit');
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/alojamientosServicios/deleteAlojamientoServicio/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setAlojamientosServicios(alojamientosServicios.filter(relacion => relacion.idAlojamientoServicio !== id));
            } else {
                console.error('Error al eliminar la relación entre alojamiento y servicio');
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
        }
    };

    
    const handleSaveChanges = async () => {
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      const url = modalMode === 'create' ? 'http://localhost:3001/alojamientosServicios/createAlojamientoServicio':`http://localhost:3001/alojamientosServicios/updateAlojamientoServicio/${currentRelacion.idAlojamientoServicio}`

      try {
          const response = await fetch(url, {
              method: method,
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(currentRelacion)
          });
          if (response.ok) {
              const updatedRelacion = await response.json();
              if (modalMode === 'create') {   
                setAlojamientosServicios([...alojamientosServicios, updatedRelacion]);
              } else {
                setAlojamientosServicios(alojamientosServicios.map(relacion =>
                    relacion.idAlojamientoServicio === updatedRelacion.idAlojamientoServicio ? updatedRelacion : relacion
                ));
              }
              setShowModal(false);
          } else {
              console.error('Error al guardar los cambios');
          }
      } catch (error) {
          console.error('Error al conectarse con la API', error);
      }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentRelacion({ ...currentRelacion, [name]: value });
    };

    const handleAlojamientoChange = (e) => {
        setSelectedAlojamiento(e.target.value);
    };

    const filteredAlojamientosServicios = selectedAlojamiento 
        ? alojamientosServicios.filter(relacion => relacion.idAlojamiento === parseInt(selectedAlojamiento))
        : alojamientosServicios;

    if (loading) {
        return <p>Cargando relaciones entre alojamientos y servicios...</p>;
    }

    return (
        <div className="container-fluid">
            <h1>Gestión de Alojamientos y Servicios</h1>
            <div className="row justify-content-right mb-3">
              <div className="col-md-6">
                <Form.Group controlId="formAlojamientoFilter" className='mb-3'>
                    <Form.Label>Filtrar los servicios de un Alojamiento</Form.Label>
                    <Form.Control as="select" value={selectedAlojamiento} onChange={handleAlojamientoChange}>
                        <option value="">Todos los alojamientos</option>
                        {alojamientos.map(alojamiento => (
                            <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
                                {alojamiento.Titulo}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
              </div>
            </div> 
            <Button className="btn btn-primary btn-sm me-2" onClick={handleCreate}>Agregar Relación</Button>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col" className='text-center align-middle'>#</th>
                        <th scope="col" className='text-center align-middle'>Alojamiento</th>
                        <th scope="col" className='text-center align-middle'>Servicio</th>
                        <th scope="col" className='text-center align-middle'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAlojamientosServicios.map((relacion, index) => (
                        <tr key={relacion.idAlojamientoServicio}>
                            <th scope="row" className='text-center align-middle'>{index + 1}</th>
                            <td className='text-center align-middle'>{alojamientos.find(a => a.idAlojamiento === relacion.idAlojamiento)?.Titulo}</td>
                            <td className='text-center align-middle'>{servicios.find(s => s.idServicio === relacion.idServicio)?.Nombre}</td>
                            <td>
                                <div className='container-fluid d-flex justify-content-center align-items-center'>
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(relacion)}>Modificar</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(relacion.idAlojamientoServicio)}>Eliminar</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {currentRelacion && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalMode === 'create' ? 'Crear Relación' : 'Modificar Relación'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formAlojamiento">
                                <Form.Label>Alojamiento</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="idAlojamiento"
                                    value={console.log(currentRelacion.idAlojamiento)}
                                    onChange={handleChange}
                                >
                                    {alojamientos.map((alojamiento) => (
                                        <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>{alojamiento.Titulo}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formServicio">
                                <Form.Label>Servicio</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="idServicio"
                                    value={console.log(currentRelacion.idServicio)}
                                    onChange={handleChange}
                                >
                                    {servicios.map((servicio) => (
                                        <option key={servicio.idServicio} value={servicio.idServicio}>{servicio.Nombre}</option>
                                    ))}
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
    );
};

export default GestionAlojamientoServicio;
