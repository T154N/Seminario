import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export function InicioClientes() {
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
        { id: 2, nombre: 'Maria', apellido: 'Gomez', email: 'maria@example.com', telefono: '3517437190', cuit: '27447402757', domicilio: 'San Martin 1234', estado: 'alta' },
        { id: 3, nombre: 'Carlos', apellido: 'Lopez', email: 'carlos@example.com', telefono: '3517437191', cuit: '27447402758', domicilio: 'Belgrano 5678', estado: 'alta' },
        { id: 4, nombre: 'Ana', apellido: 'Martinez', email: 'ana@example.com', telefono: '3517437192', cuit: '27447402759', domicilio: 'Rivadavia 9101', estado: 'alta' },
        { id: 5, nombre: 'Luis', apellido: 'Fernandez', email: 'luis@example.com', telefono: '3517437193', cuit: '27447402760', domicilio: 'Mitre 1122', estado: 'alta' },
        { id: 6, nombre: 'Laura', apellido: 'Garcia', email: 'laura@example.com', telefono: '3517437194', cuit: '27447402761', domicilio: 'Sarmiento 3344', estado: 'alta' },
        { id: 7, nombre: 'Jorge', apellido: 'Rodriguez', email: 'jorge@example.com', telefono: '3517437195', cuit: '27447402762', domicilio: 'Alvear 5566', estado: 'alta' },
        { id: 8, nombre: 'Sofia', apellido: 'Hernandez', email: 'sofia@example.com', telefono: '3517437196', cuit: '27447402763', domicilio: 'Colon 7788', estado: 'alta' },
        { id: 9, nombre: 'Diego', apellido: 'Perez', email: 'diego@example.com', telefono: '3517437197', cuit: '27447402764', domicilio: 'Independencia 9900', estado: 'alta' },
        { id: 10, nombre: 'Lucia', apellido: 'Sanchez', email: 'lucia@example.com', telefono: '3517437198', cuit: '27447402765', domicilio: 'Libertad 1112', estado: 'alta' },

        // más clientes...
    ];
    const productosActivos = [
        { id: 1, nombre: 'Arroz', descripcion: 'Producto de alta calidad', estado: 'alta', categoria: 'alimentos', url: 'https://example.codasadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadm', precio: '$1000' },
        { id: 2, nombre: 'Fideos', descripcion: 'Producto de alta calidad', estado: 'alta', categoria: 'alimentos', url: 'https://example.com', precio: '$800' },
        { id: 3, nombre: 'Aceite', descripcion: 'Producto de alta calidad', estado: 'alta', categoria: 'alimentos', url: 'https://example.com', precio: '$1500' },
        { id: 4, nombre: 'Azúcar', descripcion: 'Producto de alta calidad', estado: 'alta', categoria: 'alimentos', url: 'https://example.com', precio: '$600' },
        { id: 5, nombre: 'Sal', descripcion: 'Producto de alta calidad', estado: 'alta', categoria: 'alimentos', url: 'https://example.com', precio: '$300' },
        { id: 6, nombre: 'Harina', descripcion: 'Producto de alta calidad', estado: 'alta', categoria: 'alimentos', url: 'https://example.com', precio: '$500' },
        { id: 7, nombre: 'Leche', descripcion: 'Producto de alta calidad', estado: 'alta', categoria: 'alimentos', url: 'https://example.com', precio: '$1200' },
        { id: 8, nombre: 'Huevos', descripcion: 'Producto de alta calidad', estado: 'alta', categoria: 'alimentos', url: 'https://example.com', precio: '$900' },
        { id: 9, nombre: 'Pan', descripcion: 'Producto de alta calidad', estado: 'alta', categoria: 'alimentos', url: 'https://example.com', precio: '$400' },
        { id: 10, nombre: 'Manteca', descripcion: 'Producto de alta calidad', estado: 'alta', categoria: 'alimentos', url: 'https://example.com', precio: '$700' },
        // más productos...
    ];
    const categoriasActivas = [
        { id: 1, nombre: 'Filos', estado: 'activo', url: 'https://example.com' },
        { id: 2, nombre: 'Ciencia', estado: 'activo', url: 'https://example.com' },
        { id: 3, nombre: 'Tecnología', estado: 'activo', url: 'https://example.com' },
        { id: 4, nombre: 'Matemáticas', estado: 'activo', url: 'https://example.com' },
        { id: 5, nombre: 'Historia', estado: 'activo', url: 'https://example.com' },
        { id: 6, nombre: 'Geografía', estado: 'activo', url: 'https://example.com' },
        { id: 7, nombre: 'Arte', estado: 'activo', url: 'https://example.com' },
        { id: 8, nombre: 'Música', estado: 'activo', url: 'https://example.com' },
        { id: 9, nombre: 'Deportes', estado: 'activo', url: 'https://example.com' },
        { id: 10, nombre: 'Literatura', estado: 'activo', url: 'https://example.com' },
        // más categorías...
    ];

    const pedidosActivos = [
        { nroPedido: '001', nombre: 'Juan', apellido: 'Perez', cuil: '27447402756', estado: 'pendiente' },
        { nroPedido: '002', nombre: 'Maria', apellido: 'Gomez', cuil: '27447402757', estado: 'completado' },
        { nroPedido: '003', nombre: 'Carlos', apellido: 'Lopez', cuil: '27447402758', estado: 'pendiente' },
        { nroPedido: '004', nombre: 'Ana', apellido: 'Martinez', cuil: '27447402759', estado: 'cancelado' },
        { nroPedido: '005', nombre: 'Luis', apellido: 'Fernandez', cuil: '27447402760', estado: 'completado' },
    ];

    const filteredData = (data) => {
        return data.filter(item => {
            if (filtroSeleccionado === 'nombre') {
                return item.nombre.toLowerCase().includes(busqueda.toLowerCase());
            } else if (filtroSeleccionado === 'estado' && item.estado) {
                return item.estado.toLowerCase().includes(busqueda.toLowerCase());
            } else if (filtroSeleccionado === 'apellido' && item.apellido) {
                return item.apellido.toLowerCase().includes(busqueda.toLowerCase());
            }else if (filtroSeleccionado === 'categoria' && item.categoria) {
                return item.categoria.toLowerCase().includes(busqueda.toLowerCase());
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
        if (menuContent === 'Pedidos') return filteredData(pedidosActivos);
        return [];
    };

    return (
        <div>
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
                                    onClick={() => setMenuContent('Clientes')}>Pedidos
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
                            <h2 className="text-center my-3">Gestión Clientes
                            </h2>


                        )}

                        <div className="tab-content-area mt-3">
                            <div><span className="fs-3 fw-bold mt-0">
                                {menuContent === 'Clientes' ? 'Clientes' : catalogTab}
                            </span></div>
                            <div className="header-section d-flex justify-content-start">
                                <div className="m-0">

                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-plus-square-fill" viewBox="0 0 16 16"
                                             style={{display: "none"}}>
                                            <symbol id="plus-square-fill" fill="currentColor" viewBox="0 0 16 16">
                                                <path
                                                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                                            </symbol>
                                        </svg>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button className="btn-action btn-alta btn btn-primary"
                                                onClick={() => alert(`Alta de ${menuContent === 'Clientes' ? 'Cliente' : catalogTab}`)}>
                                            <svg className="bi flex-shrink-0 me-1 mb-1 mt-0" width="20" height="15"
                                                 role="img"
                                                 aria-label="cuadrado">
                                                <use href="#plus-square-fill"/>
                                            </svg>
                                            Agregar {menuContent === 'Clientes' ? 'Cliente' : catalogTab}
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <div className="mb-3 d-flex align-items-baseline">
                                <select className="form-select me-2 small-select" value={filtroSeleccionado}
                                        onChange={handleFiltroChange}>
                                    <option value="nombre">Nombre</option>
                                    <option value="estado">Estado</option>
                                    {menuContent === 'Catálogo' && catalogTab === 'Productos' &&
                                        <option value="categoria">Categoría</option>}
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
                                            <th>Estado</th>
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
                                                <td>{item.estado}</td>
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
        </div>
    );
}