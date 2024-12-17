import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';


import categoriaService from "../../services/categoria/categoria.service";
import ConfirmModal from "./ConfirmModal";


const AgregarCategoria = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        usuarioAlta: '',
        urlImagen: ''

    });
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const storedUser = localStorage.getItem('email');
    const usuarioMod = storedUser ?? 'ADMIN';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = async () => {
        await categoriaService.postCategoria(
            formData.nombre,
            formData.descripcion,
            usuarioMod,
            formData.urlImagen
        );
        setShowModal(false);
        if (onSave) {
            onSave();
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        setShowModal(false);
    };

    return (
        <div>
            <h2>Registrar Categoría</h2>
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
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-danger" onClick={handleCancel}>
                        <FontAwesomeIcon icon={faTimes}/> Cancelar
                    </button>
                    <button type="submit" className="btn btn-success">
                        <FontAwesomeIcon icon={faSave}/> Guardar
                    </button>
                </div>
            </form>

            <ConfirmModal
                show={showModal}
                onHide={handleCancel}
                onConfirm={handleConfirm}
                message="¿Estás seguro de que deseas registrar la Categoría?"
            />
        </div>
    );
};
export default AgregarCategoria;