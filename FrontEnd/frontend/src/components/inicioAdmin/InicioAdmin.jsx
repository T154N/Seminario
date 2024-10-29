import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export function InicioAdmin() {
    const [content, setContent] = useState('Bienvenido');
    const [busqueda, setBusqueda] = useState('');

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const clientesActivos = [
        { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan@example.com', telefono: '3517437189', cuit:'27447402756', domicilio:'Leuvuco 5291'},
        { id: 2, nombre: 'María', apellido: 'Perez', email: 'maria@example.com', telefono: '3517437189', cuit:'27447402756', domicilio:'Leuvuco 5291'},
        { id: 3, nombre: 'Carlos',apellido: 'Perez', email: 'carlos@example.com', telefono: '3517437189', cuit:'27447402756', domicilio:'Leuvuco 5291'},
    ];

    const productosActivos = [
        { id: 1, nombre: 'Arroz', descripcion: 'abcdfghijasjdnjd', estado: 'alta', categoria: 'alimentos', url: 'https::/', precio: '$1000' },
        { id: 2, nombre: 'Alfajor', descripcion: 'abcdfghijasjdnjd', estado: 'alta', categoria: 'alimentos', url: 'https::/', precio: '$500' },
        { id: 3, nombre: 'Gaseosa', descripcion: 'abcdfghijasjdnjd', estado: 'alta', categoria: 'alimentos', url: 'https::/', precio: '$750' },
    ];

    const categoriasActivas = [
        { id: 1, nombre: 'Filos', estado:'activo', url: 'https'},
        { id: 2, nombre: 'Copetin', estado:'activo', url: 'https'},
        { id: 3, nombre: 'Pilas', estado:'activo', url: 'https'},
    ];

    const handleButtonClick = (newContent) => {
        if (newContent === 'Clientes') {
            const filteredClientes = clientesActivos.filter(cliente =>
                cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                cliente.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
                cliente.domicilio.toLowerCase().includes(busqueda.toLowerCase())
            );

            setContent(
                <div>
                    <h2>Clientes Activos</h2>
                    <button className="btn-admin btn btn-primary mb-3" onClick={handleAlta}>Alta de Cliente</button>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar cliente..."
                            value={busqueda}
                            onChange={handleBusquedaChange}
                        />
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>CUIT</th>
                                <th>Domicilio</th>
                                <th>Acción</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredClientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.apellido}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.telefono}</td>
                                    <td>{cliente.cuit}</td>
                                    <td>{cliente.domicilio}</td>
                                    <td>
                                        <button className=" btn btn-warning btn-sm me-2" onClick={() => handleModify(cliente.id)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className=" btn btn-danger btn-sm" onClick={() => handleDelete(cliente.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (newContent === 'Productos') {
            const filteredProductos = productosActivos.filter(producto =>
                producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                producto.estado.toLowerCase().includes(busqueda.toLowerCase()) ||
                producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
            );

            setContent(
                <div>
                    <h2>Productos Activos</h2>
                    <button className="btn-admin btn btn-primary mb-3" onClick={handleAlta}>Alta de Producto</button>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar producto..."
                            value={busqueda}
                            onChange={handleBusquedaChange}
                        />
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Categoría</th>
                                <th>URL</th>
                                <th>Precio</th>
                                <th>Acción</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredProductos.map(producto => (
                                <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>{producto.estado}</td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.url}</td>
                                    <td>{producto.precio}</td>
                                    <td>
                                        <button className=" btn btn-warning btn-sm me-2" onClick={() => handleModify(producto.id)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className=" btn btn-danger btn-sm" onClick={() => handleDelete(producto.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (newContent === 'Categorias') {
            const filteredCategorias = categoriasActivas.filter(categoria =>
                categoria.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                categoria.estado.toLowerCase().includes(busqueda.toLowerCase())
            );

            setContent(
                <div>
                    <h2>Categorías Activas</h2>
                    <button className="btn-admin btn btn-primary mb-3" onClick={handleAlta}>Alta de Categoría</button>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar categoría..."
                            value={busqueda}
                            onChange={handleBusquedaChange}
                        />
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>URL</th>
                                <th>Acción</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredCategorias.map(categoria => (
                                <tr key={categoria.id}>
                                    <td>{categoria.id}</td>
                                    <td>{categoria.nombre}</td>
                                    <td>{categoria.estado}</td>
                                    <td>{categoria.url}</td>
                                    <td>
                                        <button className=" btn btn-warning btn-sm me-2" onClick={() => handleModify(categoria.id)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className=" btn btn-danger btn-sm" onClick={() => handleDelete(categoria.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (newContent === 'Inicio') {
            setContent(
                <div>
                    <h2>Bienvenido de nuevo!</h2>
                    <p>Esta es la pantalla de inicio de la administración.</p>
                </div>
            );
        }
    };

    const handleModify = (id) => {
        alert(`Modificación de elemento con ID: ${id}`);
    };

    const handleDelete = (id) => {
        alert(`Baja de elemento con ID: ${id}`);
    };

    const handleAlta = () => {
        alert("Formulario de alta");
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-2 menu">
                    <h2>Menú</h2>
                    <div className="d-flex flex-column">
                        <button  className="btn-admin btn btn-success mb-2 btn-block" onClick={() => handleButtonClick('Inicio')}>Inicio</button>
                        <button  className="btn-admin btn btn-success mb-2 btn-block" onClick={() => handleButtonClick('Clientes')}>Clientes</button>
                        <button  className="btn-admin btn btn-success mb-2 btn-block" onClick={() => handleButtonClick('Productos')}>Productos</button>
                        <button  className="btn-admin btn btn-success mb-2 btn-block" onClick={() => handleButtonClick('Categorias')}>Categorías</button>
                    </div>
                </div>

                <div className="col-12 col-md-10 contenido">
                    <div>{content}</div>
                </div>
            </div>
        </div>
    );
}
