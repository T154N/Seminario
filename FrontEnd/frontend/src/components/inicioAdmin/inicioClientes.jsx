import React, { useState, useEffect } from 'react';
import productoService from '../../services/producto/producto.service';
import categoriaService from '../../services/categoria/categoria.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

export function InicioClientes() {
    //-------------------------------------------------------------------------------------
    const [menuContent, setMenuContent] = useState('Catálogo');
    const [catalogTab, setCatalogTab] = useState('Productos');
    const [busqueda, setBusqueda] = useState('');
    const [filtrosActivos, setFiltrosActivos] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState('nombre');
    //-------------------------------------------------------------------------------------
    const [productosActivos, setProductosActivos] = useState([]);
    const [categoriasActivos, setCategoriasActivas] = useState([]);
    //-------------------------------------------------------------------------------------




    //--------Carga Productos------------------------------------------
    useEffect(() => {
        const fetchProductos = async () => {
            const productos = await productoService.getAllProductos();
            setProductosActivos(productos);
        };

        if (menuContent === 'Catálogo' && catalogTab === 'Productos') {
            fetchProductos();
        }
    }, [menuContent, catalogTab]);

    //--------Carga Categorias------------------------------------------
    useEffect(() => {
        const fetchCategorias = async () => {
            const categorias = await categoriaService.getAllCategorias();
            setCategoriasActivas(categorias);
        };

        if (menuContent === 'Catálogo' && catalogTab === 'Categorias') {
            fetchCategorias();
        }
    }, [menuContent, catalogTab]);


    useEffect(() => {
        // Actualiza los filtros activos al cambiar la búsqueda o el filtro seleccionado
        const nuevosFiltros = filtrosActivos.filter(filtro => filtro.filtro !== filtroSeleccionado); // Elimina el filtro anterior
        if (busqueda.trim() !== '') {
            nuevosFiltros.push({ filtro: filtroSeleccionado, valor: busqueda });
        }
        setFiltrosActivos(nuevosFiltros);
    }, [busqueda, filtroSeleccionado]);

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleFiltroChange = (e) => {
        setFiltroSeleccionado(e.target.value);
        setBusqueda('');  // Borra la barra de búsqueda al cambiar el filtro
    };

    const handleRemoveFiltro = (filtroAEliminar) => {
        const nuevosFiltros = filtrosActivos.filter(filtro => filtro !== filtroAEliminar);
        setFiltrosActivos(nuevosFiltros);
    };

    const filteredData = (data) => {
        return data.filter(item => {
            return filtrosActivos.every(filtro => {
                if (filtro.filtro === 'nombre') {
                    return item.nombre.toLowerCase().includes(filtro.valor.toLowerCase());
                } else if (filtro.filtro === 'categoria' && item.categoria) {
                    return item.categoria.toLowerCase().startsWith(filtro.valor.toLowerCase());
                } else if (filtro.filtro === 'estado') {
                    return item.estado.toString() === filtro.valor;
                }
                return true;
            });
        });
    };



    const dataToDisplay = () => {
    if (menuContent === 'Catálogo' && catalogTab === 'Productos') return filteredData(productosActivos);
    if (menuContent === 'Catálogo' && catalogTab === 'Categorias') return filteredData(categoriasActivos);
    return [];
};
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-2 menu">
                        <h2>Menú</h2>
                        <div className="d-flex flex-column">
                            <button className="btn-admin btn btn-success mb-2 btn-block" onClick={() => setMenuContent('Catálogo')}>
                                Catálogo
                            </button>
                            <button className="btn-admin btn btn-success mb-2 btn-block" onClick={() => setMenuContent('Clientes')}>
                                Clientes
                            </button>
                            <button className="btn-admin btn btn-success mb-2 btn-block" onClick={() => setMenuContent('Pedidos')}>
                                Pedidos
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

                        <div className="tab-content-area mt-3">
                            <div>
                                <span className="fs-3 fw-bold mt-0">
                                    {menuContent === 'Clientes' ? 'Clientes' : catalogTab}
                                </span>
                            </div>
                            <div className="header-section d-flex justify-content-start">
                                <select className="form-select me-2 small-select" value={filtroSeleccionado} onChange={handleFiltroChange}>
                                    <option value="nombre">Nombre</option>
                                    {menuContent === 'Catálogo' && catalogTab === 'Productos' && <option value="categoria">Categoría</option>}
                                    {menuContent === 'Catálogo' && catalogTab === 'Productos' && <option value="estado">Estado Alta</option>}
                                </select>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Buscar ${menuContent === 'Clientes' ? 'clientes' : catalogTab.toLowerCase()}...`}
                                    value={busqueda}
                                    onChange={handleBusquedaChange}
                                />
                            </div>

                            {filtrosActivos.length > 0 && (
                                <div className="d-flex mt-3 titulo-filtro" >
                                    <span>Filtros activos:</span>
                                    {filtrosActivos.map(f => (
                                        <span key={f.filtro} className="badge filtro-activo  ms-2">
                                            {f.filtro}: {f.valor}
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger ms-2 boton-eliminar-filtro"
                                                onClick={() => handleRemoveFiltro(f)}
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="table-responsive scrollable-table">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        {menuContent === 'Catálogo' && catalogTab === 'Productos' && (
                                            <>
                                                <th>Categoría</th>
                                                <th>Precio</th>
                                                <th>Estado</th>
                                            </>
                                        )}
                                        {menuContent === 'Catálogo' && catalogTab === 'Categorias' && (
                                            <>
                                                <th>Estado</th>
                                            </>)
                                        }

                                        <th>Acción</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dataToDisplay().map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.nombre}</td>
                                            {menuContent === 'Catálogo' && catalogTab === 'Productos' && (
                                                <>
                                                    <td>{item.categoria}</td>
                                                    <td>{item.precioUnitario}</td>
                                                    <td>{item.estado === 1 ? "Alta" : "Baja"}</td>
                                                </>
                                            )}

                                            {menuContent === 'Catálogo' && catalogTab === 'Categorias' && (
                                                <>
                                                    <td>{item.estado === 1 ? "Alta" : "Baja"}</td>
                                                </>)
                                            }

                                                <td>

                                                <button className="btn-action btn btn-sm me-2">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button className="btn-action-delete btn btn-sm">
                                                    <FontAwesomeIcon icon={faTrash} />
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
