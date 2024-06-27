import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AdministracionImagenes = () => {
  
    const [imagenes, setImagenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentImagen, setCurrentImagen] = useState(null);
    const [modalMode, setModalMode] = useState('');
    const [imageFile, setImageFile] = useState(null); // Estado para almacenar el archivo de imagen seleccionado

    useEffect(() => {
        // Función para obtener las imágenes desde la API
        const fetchImagenes = async () => {
            try {
                const response = await fetch('http://localhost:3001/imagenes/getAllImagenes');
                if (response.ok) {
                    const data = await response.json();
                    setImagenes(data);
                } else {
                    console.error('Error al obtener las imágenes');
                }
            } catch (error) {
                console.error('Error al conectarse con la API', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImagenes();
    }, []);

    const handleCreate = () => {
        setCurrentImagen({ titulo: '', url: '' }); 
        setModalMode('create');
        setShowModal(true);
    };

    const handleEdit = (imagen) => {
        setCurrentImagen(imagen); 
        setModalMode('edit');
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/imagenes/deleteImagen/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setImagenes(imagenes.filter(imagen => imagen.id !== id));
            } else {
                console.error('Error al eliminar la imagen');
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
        }
    };

    const handleSaveChanges = async () => {
        const formData = new FormData(); 
        formData.append('imageFile', imageFile); 

        const url = modalMode === 'create' 
            ? 'http://localhost:3001/imagenes/createImagen'
            : `http://localhost:3001/imagenes/updateImagen/${currentImagen.id}`;

        const method = modalMode === 'create' ? 'POST' : 'PUT';

        try {
            const response = await fetch(url, {
                method: method,
                body: formData
            });

            if (response.ok) {
                const updatedImagen = await response.json();
                if (modalMode === 'create') {
                    setImagenes([...imagenes, updatedImagen]);
                } else {
                    setImagenes(imagenes.map(imagen =>
                        imagen.id === updatedImagen.id ? updatedImagen : imagen
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file); 
    };
    const fetchImagenesPorAlojamiento = async (idAlojamiento) => {
        try {
            const response = await fetch(`http://localhost:3001/imagenes/getByAlojamiento/${idAlojamiento}`);
            if (response.ok) {
                const imagenes = await response.json();
                
                console.log(imagenes); 
            } else {
                console.error('Error al obtener las imágenes del alojamiento');
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
        }
    };
    
    
    fetchImagenesPorAlojamiento(1); 

    if (loading) {
        return <p>Cargando imágenes...</p>;
    }

    return (
        <div className="container-fluid">
            <h1>Gestión de Imágenes</h1>
            <Button className="btn btn-primary btn-sm me-2" onClick={handleCreate}>Agregar Imagen</Button>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col" className='text-center align-middle'>#</th>
                        <th scope="col" className='text-center align-middle'>Título</th>
                        <th scope="col" className='text-center align-middle'>Imagen</th>
                        <th scope="col" className='text-center align-middle'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {imagenes.map((imagen, index) => (
                        <tr key={imagen.id}>
                            <th scope="row" className='text-center align-middle'>{index + 1}</th>
                            <td className='text-center align-middle'>{imagen.titulo}</td>
                            <td className='text-center align-middle'>{imagen.titulo}</td>
                            <td className='text-center align-middle'><img src={imagen.url} alt={imagen.titulo} style={{ maxWidth: '100px' }} /></td>
                            <td>
                                <div className='container-fluid d-flex justify-content-center align-items-center'>
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(imagen)}>Modificar</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(imagen.id)}>Eliminar</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {currentImagen && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalMode === 'create' ? 'Agregar Imagen' : 'Modificar Imagen'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTitulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titulo"
                                    value={currentImagen.titulo}
                                    onChange={(e) => setCurrentImagen({ ...currentImagen, titulo: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formImagen">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".jpg,.png,.jpeg"
                                    onChange={handleFileChange}
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
    
    
    

  
}

export default AdministracionImagenes