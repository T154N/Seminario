import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import './ModificarProducto.css';


import productoService from '../../services/producto/producto.service';
import categoriaService from '../../services/categoria/categoria.service';
import ConfirmModal from './ConfirmModal';

const ModificarContenido = ({ registro, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        categoria: '',
        precioUnitario: '',
        imagen: '',
        estado: 1,
        descripcion: ''
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
        };
        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchProducto = async () => {
            if (registro && registro.id) {
                const producto = await productoService.getProductoByIdAdmin(registro.id);
                setFormData({
                    nombre: producto.nombre || '',
                    categoria: producto.categoriaId || '',
                    precioUnitario: producto.precioUnitario || '',
                    imagen: producto.imagen || '',
                    estado: producto.estado || 1,
                    descripcion: producto.descripcion || '',
                });
                setIsLoading(false);
            }
        };

        fetchProducto();
    }, [registro]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = async () => {
        await productoService.updateProducto(
            registro.id,
            formData.nombre,
            formData.descripcion,
            formData.precioUnitario,
            formData.imagen,
            formData.categoria,
            usuarioMod,
            formData.estado
        );
        setShowModal(false);
        onSave(formData);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Modificar Producto: {registro ? registro.nombre : 'Contenido'}</h2>
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
                                className="form-control numero-input"
                                name="precioUnitario"
                                value={formData.precioUnitario}
                                onChange={handleChange}
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
                            name="imagen"
                            value={formData.imagen}
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

                <div className="mb-5">
                    <div className="col-1 col-md-2 col-sm-1">
                        <label className="form-label">Estado</label>
                        <select
                            className="form-select text-center"
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                        >
                            <option value={1}>Activo</option>
                            <option value={2}>Inactivo</option>
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
                onHide={handleCancel}
                onConfirm={handleConfirm}
                message="¿Estás seguro de que deseas guardar los cambios?"
            />
        </div>
    );
};

export default ModificarContenido;