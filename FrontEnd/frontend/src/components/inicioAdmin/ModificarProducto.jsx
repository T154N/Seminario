import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import productoService from '../../services/producto/producto.service';
import categoriaService from '../../services/categoria/categoria.service';

const ModificarContenido = ({ registro, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        categoria: '',
        precioUnitario: '',
        imagen: '',
        estado: 1,
        descripcion: ''
    });

    const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la carga
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const categorias = await categoriaService.getAllCategorias();
            setCategorias(categorias);
        };
        fetchCategorias();
    }, [categorias]);

    useEffect(() => {
        const fetchProducto = async () => {
            if (registro && registro.id) {
                const producto = await productoService.getProductoById(registro.id);
                console.log(producto);  // Verifica la respuesta de la API
                setFormData({
                    nombre: producto.nombre || '',
                    categoria: producto.categoria || '',
                    precioUnitario: producto.precioUnitario || '',
                    imagen: producto.imagen || '',
                    estado: producto.estado || 1,
                    descripcion: producto.descripcion || '',
                });
                setIsLoading(false); // Marcar que los datos han sido cargados
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
                <div className="row mb-3">
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
                </div>
                <div className="mb-3">
                    <div className="col-3">
                        <label className="form-label">Precio Unitario</label>
                        <input
                            type="number"
                            className="form-control"
                            name="precioUnitario"
                            value={formData.precioUnitario}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label className="form-label">Categoría</label>
                                <select
                                    className="form-select"
                                    name="categoria"
                                    value={formData.categoria} // Este valor se debe emparejar con la categoría del producto
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Seleccionar Categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.nombre}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                <div className="mb-3">
                    <div className="col-6">
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
                    <div className="col-6">
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
                </div>
                <div className="mb-3">
                    <div className="col-6">
                        <label className="form-label">Descripción</label>
                        <input
                            type="text"
                            className="form-control"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>
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

export default ModificarContenido;
