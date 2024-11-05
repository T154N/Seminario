import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export function InicioAdmin() {
    const [menuContent, setMenuContent] = useState('Catálogo');
    const [catalogTab, setCatalogTab] = useState('Productos');
    const [busqueda, setBusqueda] = useState('');
    const [filtroSeleccionado, setFiltroSeleccionado] = useState('nombre');

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleFiltroChange = (e) => {
        setFiltroSeleccionado(e.target.value);
    };

    const clientesActivos = [
        { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan@example.com', telefono: '3517437189', cuit: '27447402756', domicilio: 'Leuvuco 5291', estado: 'alta' },
        //... otros clientes
    ];

    const productosActivos = [
        { id: 1, nombre: 'Producto 1', categoria: 'Categoria 1', precio: 100, estado: 'disponible', url: 'url-imagen-1' },
        //... otros productos
    ];

    const categoriasActivas = [
        { id: 1, nombre: 'Categoria 1', estado: 'activa', url: 'url-imagen-1' },
        //... otras categorías
    ];

    const filteredData = (data) => {
        return data.filter(item => {
            if (filtroSeleccionado === 'nombre') {
                return item.nombre.toLowerCase().includes(busqueda.toLowerCase());
            } else if (filtroSeleccionado === 'estado' && item.estado) {
                return item.estado.toLowerCase().includes(busqueda.toLowerCase());
            } else if (filtroSeleccionado === 'apellido' && item.apellido) {
                return item.apellido.toLowerCase().includes(busqueda.toLowerCase());
            } else if (filtroSeleccionado === 'cuit' && item.cuit) {
                return item.cuit.includes(busqueda);
            }
            return false;
        });
    };

    const dataToDisplay = () => {
        if (menuContent === 'Catálogo' && catalogTab === 'Productos') return filteredData(productosActivos);
        if (menuContent === 'Catálogo' && catalogTab === 'Categorias') return filteredData(categoriasActivas);
        if (menuContent === 'Clientes') return filteredData(clientesActivos);
        return [];
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-2 menu">
                    <h2>Menú</h2>
                    <div className="d-flex flex-column">
                        <button className="btn-admin btn btn-success mb-2 btn-block"
                                onClick={() => setMenuContent('Catálogo')}>Catálogo
                        </button>
                        <button className="btn-admin btn btn-success mb-2 btn-block"
                                onClick={() => setMenuContent('Clientes')}>Clientes
                        </button>
                        <button className="btn-admin btn btn-success mb-2 btn-block"
                                onClick={() => setMenuContent('Pedidos')}>Pedidos
                        </button>
                    </div>
                </div>

                <div className="col-12 col-md-10 contenido">
                    {menuContent === 'Catálogo' && (
                        <div>
                            <h2>Gestión del Catálogo</h2>
                            <div className="d-flex">
                                <button
                                    className={`btn-tab ${catalogTab === 'Categorias' ? 'active' : ''}`}
                                    onClick={() => setCatalogTab('Categorias')}
                                >
                                    Categorías
                                </button>
                                <button
                                    className={`btn-tab ${catalogTab === 'Productos' ? 'active' : ''}`}
                                    onClick={() => setCatalogTab('Productos')}
                                >
                                    Productos
                                </button>
                            </div>
                        </div>
                    )}

                    {menuContent === 'Clientes' && (
                        <h2 className="text-center my-3">Gestión Clientes</h2>
                    )}

                    <div className="tab-content-area mt-3">
                        <div className="header-section">
                            <button className="btn-alta btn btn-primary mb-3"
                                    onClick={() => alert(`Alta de ${menuContent === 'Clientes' ? 'Cliente' : catalogTab}`)}>
                                Alta de {menuContent === 'Clientes' ? 'Cliente' : catalogTab}
                            </button>
                            <span className="header-title">
                                {menuContent === 'Clientes' ? 'Clientes' : catalogTab}
                            </span>
                        </div>

                        <div className="mb-3 d-flex align-items-baseline">
                            <select className="form-select me-2 small-select" value={filtroSeleccionado}
                                    onChange={handleFiltroChange}>
                                <option value="nombre">Nombre</option>
                                <option value="estado">Estado</option>
                                {catalogTab === 'Productos' && <option value="categoria">Categoría</option>}
                                {menuContent === 'Clientes' && <>
                                    <option value="cuit">CUIT</option>
                                    <option value="apellido">Apellido</option>
                                </>}
                            </select>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Buscar ${menuContent === 'Clientes' ? 'clientes' : catalogTab.toLowerCase()}...`}
                                value={busqueda}
                                onChange={handleBusquedaChange}
                            />
                        </div>

                        <div className="table-responsive scrollable-table">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    {menuContent === 'Clientes' && <>
                                        <th>Apellido</th>
                                        <th>CUIT</th>
                                        <th>Domicilio</th>
                                    </>}
                                    {menuContent === 'Catálogo' && catalogTab === 'Productos' && <>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Estado</th>
                                        <th>UrlImagen</th>
                                    </>}
                                    {menuContent === 'Catálogo' && catalogTab === 'Categorias' && <>
                                        <th>Estado</th>
                                        <th>UrlImagen</th>
                                    </>}
                                    <th>Acción</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dataToDisplay().map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nombre}</td>
                                        {menuContent === 'Clientes' && <>
                                            <td>{item.apellido}</td>
                                            <td>{item.cuit}</td>
                                            <td>{item.domicilio}</td>
                                        </>}
                                        {menuContent === 'Catálogo' && catalogTab === 'Productos' && <>
                                            <td>{item.categoria}</td>
                                            <td>{item.precio}</td>
                                            <td>{item.estado}</td>
                                            <td className="urlImagen">{item.url}</td>
                                        </>}
                                        {menuContent === 'Catálogo' && catalogTab === 'Categorias' && <>
                                            <td>{item.estado}</td>
                                            <td className="urlImagen">{item.url}</td>
                                        </>}
                                        <td>
                                            <button className="btn-action btn btn-sm me-2"
                                                    onClick={() => alert(`Modificación de ${menuContent === 'Clientes' ? 'cliente' : catalogTab.toLowerCase()} con ID: ${item.id}`)}>
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </button>
                                            <button className="btn-action-delete btn btn-sm"
                                                    onClick={() => alert(`Baja de ${menuContent === 'Clientes' ? 'cliente' : catalogTab.toLowerCase()} con ID: ${item.id}`)}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
