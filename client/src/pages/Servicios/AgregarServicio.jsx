import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AgregarServicio = () => {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentServicio, setCurrentServicio] = useState([null]);
    const [modalMode, setModalMode] = useState('');

    useEffect(() => {
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
            } finally {
                setLoading(false);
            }
        };

        fetchServicios();
    }, []);

    const handleCreate = () => {
        setCurrentServicio({ Nombre: '' });
        setModalMode('create');
        setShowModal(true);
    };

    const handleEdit = (servicio) => {
        setCurrentServicio(servicio);
        setModalMode('edit');
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/servicio/deleteServicio/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setServicios(servicios.filter(servicio => servicio.idServicio !== id));
            } else {
                console.error('Error al eliminar el servicio');
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
        }
    };

    const handleSaveChanges = async () => {
        const method = modalMode === 'create' ? 'POST' : 'PUT';
        let url;
        let body;
        
        if (modalMode === 'create') {
            url = 'http://localhost:3001/servicio/createServicio';
            body = JSON.stringify(currentServicio);
        } else {
            url = `http://localhost:3001/servicio/updateServicio/${currentServicio.idServicio}`;
            body = JSON.stringify({ Nombre: currentServicio.Nombre });
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (response.ok) {
                const updatedServicio = await response.json();
                if (modalMode === 'create') {
                    setServicios([...servicios, updatedServicio]);
                } else {
                    setServicios(prevServicios =>
                        prevServicios.map(servicio =>
                            servicio.idServicio === updatedServicio.idServicio ? updatedServicio : servicio
                        )
                    );
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
        setCurrentServicio({ ...currentServicio, [name]: value });
    };

    if (loading) {
        return <p>Cargando servicios...</p>;
    }

    return (
        <div className="container-fluid">
            <h1>Lista de Servicios</h1>
            <Button className="btn btn-primary btn-sm me-2" onClick={handleCreate}>Agregar Servicio</Button>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col" className='text-center align-middle'>#</th>
                        <th scope="col" className='text-center align-middle'>Nombre</th>
                        <th scope="col" className='text-center align-middle'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios.map((servicio, index) => (
                        <tr key={index}>
                            
                            <th scope="row" className='text-center align-middle'>{index + 1}</th>
                            <td className='text-center align-middle'>{servicio.Nombre}</td>
                            <td>
                                <div className='container-fluid d-flex justify-content-center align-items-center'>
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(servicio)}>Modificar</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(servicio.idServicio)}>Eliminar</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {currentServicio && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalMode === 'create' ? 'Crear Servicio' : 'Modificar Servicio'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Nombre"
                                    value={currentServicio.Nombre}
                                    onChange={handleChange}
                                />
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

export default AgregarServicio;



