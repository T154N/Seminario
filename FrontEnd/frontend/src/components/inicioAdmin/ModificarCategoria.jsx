import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';

import categoriaService from "../../services/categoria/categoria.service";
import ConfirmModal from "./ConfirmModal";

const ModificarCategoria = ({ registro, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        observaciones: '',
        urlImagen: '',
        estado: 1
    });
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCategoria = async () => {
            if (registro && registro.id) {
                const categoria = await categoriaService.getCategoriaById(registro.id);
                setFormData({
                    nombre: categoria.nombre || '',
                    observaciones: categoria.observaciones || '',
                    urlImagen: categoria.imagen || '',
                    estado: categoria.estado || 1
                });
                setIsLoading(false);
            }
        };
        fetchCategoria();
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
        setShowModal(true); // Muestra el modal de confirmación
    };

    const handleConfirm = async () => {
        await categoriaService.updateCategoria(
            registro.id,
            formData.nombre,
            formData.observaciones,
            formData.urlImagen,
            'admin',
            formData.estado
        );
        setShowModal(false);
        onSave(formData);
    };

    const handleHideModal = () => {
        setShowModal(false); // Cierra el modal sin guardar cambios
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Modificar Categoria: {registro ? registro.nombre : 'Contenido'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3 mt-4">
                    <div className="form-group col-6">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            id="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="urlImagen">URL Imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            name="urlImagen"
                            id="urlImagen"
                            value={formData.urlImagen}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group mb-3 mt-4 row">
                    <div className="col-12">
                        <label htmlFor="observaciones">Observaciones</label>
                        <textarea
                            className="form-control"
                            name="observaciones"
                            id="observaciones"
                            value={formData.observaciones}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>
                </div>

                <div className="mb-5">
                    <div className="col-2 col-md-1 col-sm-2">
                        <label className="form-label">Estado</label>
                        <select
                            className="form-select text-center"
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                        >
                            <option value={1}>Activo</option>
                            <option value={0}>Inactivo</option>
                        </select>
                    </div>
                </div>

                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-danger" onClick={onCancel}>
                        <FontAwesomeIcon icon={faTimes}/> Cancelar
                    </button>
                    <button type="submit" className="btn btn-success">
                        <FontAwesomeIcon icon={faSave}/> Guardar
                    </button>
                </div>
            </form>

            <ConfirmModal
                show={showModal}
                onHide={handleHideModal}
                onConfirm={handleConfirm}
                message="¿Estás seguro de que deseas guardar los cambios en la categoría?"
            />
        </div>
    );
};

export default ModificarCategoria;
