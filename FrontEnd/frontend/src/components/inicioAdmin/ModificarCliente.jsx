import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import clienteService from '../../services/cliente/cliente.service';


const ModificarContenidoCliente = ({ registro, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        cuit: '',
        telefono: 0, 
        email: '',
        observaciones: "", 
        domicilio: '', 
        estado: 1
    });

    const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la carga


    useEffect(() => {
        const fetchCliente = async () => {
            if (registro && registro.id) {
                const cliente = await clienteService.getClienteById(registro.id);
                console.log(cliente);  // Verifica la respuesta de la API
                setFormData({
                    nombre: cliente.nombre || '',
                    apellido: cliente.apellido || '',
                    cuit: cliente.cuit || '',
                    telefono: cliente.telefono || '',
                    email: cliente.email || '',
                    observaciones: cliente.observaciones || '',
                    domicilio: cliente.domicilio || '', 
                    estado: cliente.estado || 1,
                });
                setIsLoading(false); // Marcar que los datos han sido cargados
            }
        };

        fetchCliente();
    }, [registro]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (isLoading) {
        return <div>Loading...</div>;  // Mostrar un mensaje de carga mientras los datos se obtienen
    }

    return (
        <div className="modificar-contenido">
            <h2>Modificar {registro ? registro.nombre : 'Contenido'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">CUIT</label>
                    <input
                        type="text"
                        className="form-control"
                        name="cuit"
                        value={formData.cuit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefono</label>
                    <input
                        type="number"
                        className="form-control"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Observaciones</label>
                    <input
                        type="text"
                        className="form-control"
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Domicilio</label>
                    <input
                        type="text"
                        className="form-control"
                        name="domicilio"
                        value={formData.domicilio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                        className="form-select"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                    >
                        <option value={1}>Activo</option>
                        <option value={0}>Inactivo</option>
                    </select>
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">
                        <FontAwesomeIcon icon={faSave}/> Guardar
                    </button>
                    <button type="button" className="btn btn-danger" onClick={onCancel}>
                        <FontAwesomeIcon icon={faTimes}/> Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModificarContenidoCliente;
