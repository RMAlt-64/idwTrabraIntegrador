import React, { useState, useEffect } from 'react';

const Tabla = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTipo, setSelectedTipo] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [tipoToDelete, setTipoToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
                const result = await response.json();
                if (Array.isArray(result)) {
                    setData(result);
                } else {
                    console.error('API response is not an array:', result);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (item) => {
        setSelectedTipo(item);
        setDescripcion(item.Descripcion);
        setShowEditModal(true);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${tipoToDelete.idTipoAlojamiento}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setData(data.filter(item => item.idTipoAlojamiento !== tipoToDelete.idTipoAlojamiento));
                setShowDeleteModal(false);
            } else {
                throw new Error('Error deleting the tipo de alojamiento');
            }
        } catch (error) {
            console.error('Error deleting the tipo de alojamiento:', error);
        }
    };

    const handleDeleteConfirmation = (item) => {
        setTipoToDelete(item);
        setShowDeleteModal(true);
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:3001/tiposAlojamiento/putTipoAlojamiento/${selectedTipo.idTipoAlojamiento}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Descripcion: descripcion })
            });
            if (response.ok) {
                const updatedData = data.map(item => 
                    item.idTipoAlojamiento === selectedTipo.idTipoAlojamiento ? { ...item, Descripcion: descripcion } : item
                );
                setData(updatedData);
                setShowEditModal(false);
            } else {
                throw new Error('Error updating the tipo de alojamiento');
            }
        } catch (error) {
            console.error('Error updating the tipo de alojamiento:', error);
        }
    };

    const handleCreate = () => {
        setDescripcion('');
        setShowCreateModal(true);
    };

    const handleSaveNew = async () => {
        try {
            const response = await fetch('http://localhost:3001/tiposAlojamiento/postTipoAlojamiento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Descripcion: descripcion })
            });
            if (response.ok) {
                const newTipo = await response.json();
                setData([...data, newTipo]);
                setShowCreateModal(false);
            } else {
                throw new Error('Error creating new tipo de alojamiento');
            }
        } catch (error) {
            console.error('Error creating new tipo de alojamiento:', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>; 
    }

    if (!Array.isArray(data)) {
        return <div>Error: Los datos recibidos no son válidos.</div>;
    }

    return (
        <div className="container-fluid">
            <h2>Lista de Tipos de Alojamiento</h2>
            <button className="btn btn-success mb-3" onClick={handleCreate}>Agregar Nuevo</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.idTipoAlojamiento}>
                            <td>{item.idTipoAlojamiento}</td>
                            <td>{item.Descripcion}</td>
                            <td>
                                <button 
                                    className="btn btn-primary me-2" 
                                    onClick={() => handleEdit(item)}>
                                    Modificar
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDeleteConfirmation(item)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                        <h2>Modificar Tipo de Alojamiento</h2>
                        <form>
                            <label>Descripción</label>
                            <input 
                                type="text" 
                                value={descripcion} 
                                onChange={(e) => setDescripcion(e.target.value)} 
                            />
                            <button type="button" onClick={handleSaveChanges}>Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
                        <h2>Confirmar Eliminación</h2>
                        <p>¿Estás seguro de que quieres eliminar este tipo de alojamiento?</p>
                        <button type="button" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                        <button type="button" onClick={handleDelete}>Eliminar</button>
                    </div>
                </div>
            )}

            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowCreateModal(false)}>&times;</span>
                        <h2>Crear Nuevo Tipo de Alojamiento</h2>
                        <form>
                            <label>Descripción</label>
                            <input 
                                type="text" 
                                value={descripcion} 
                                onChange={(e) => setDescripcion(e.target.value)} 
                            />
                            <button type="button" onClick={handleSaveNew}>Guardar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tabla;
