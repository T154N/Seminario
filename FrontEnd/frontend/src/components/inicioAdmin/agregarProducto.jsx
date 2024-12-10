import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';

import categoriaService from "../../services/categoria/categoria.service";
import ConfirmModal from "./ConfirmModal";
import productoService from "../../services/producto/producto.service";

const AgregarProducto = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precioUnitario: '',
        urlImagen: '',
        categoria: '',
        usuarioAlta: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const storedUser = localStorage.getItem('email');
    const usuarioMod = storedUser ?? 'ADMIN';

    useEffect(() => {
        const fetchCategorias = async () => {
            const categorias = await categoriaService.getAllCategorias();
            setCategorias(categorias);
            setIsLoading(false);
        };
        fetchCategorias();
    }, []);




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
        await productoService.postProducto(
            formData.nombre,
            formData.descripcion,
            formData.precioUnitario,
            formData.urlImagen,
            formData.categoria,
            usuarioMod
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

   // if (isLoading) {
    //    return <div>Cargando...</div>;
    //}

    return (
        <div>
            <h2>Registrar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3 mt-4">
                    <div className="col-6">
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
                    <div className="col-3">
                        <label className="form-label">Categoría</label>
                        <select
                            className="form-select form-select-modificar"
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                   <div className="col-3">
                    <label className="form-label">Precio Unitario</label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                            type="number"
                            className="form-control"
                            name="precioUnitario"
                            value={formData.precioUnitario}
                            onChange={(e) => {
                                const value = e.target.value;
                                setFormData({
                                    ...formData,
                                    precioUnitario: value
                                });
                            }}
                            required
                        />

                    </div>
                </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12">
                        <label className="form-label">Url Imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            name="urlImagen"
                            value={formData.urlImagen}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="col-12">
                        <label className="form-label">Descripción</label>
                        <textarea
                            className="form-control"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            rows="4"
                            required
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
                message="¿Estás seguro de que deseas registrar el producto?"
            />
        </div>
    );
};

export default AgregarProducto;