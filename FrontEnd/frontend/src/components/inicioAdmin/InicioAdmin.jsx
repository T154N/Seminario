import React, { useState, useEffect } from 'react';
import ContenidoVariable from './ContenidoVariable';
import productoService from '../../services/producto/producto.service';
import categoriaService from '../../services/categoria/categoria.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import ModificarProducto from './ModificarProducto';
export function InicioAdmin() {
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
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [catalogoMenu, setCatalogoMenu] = useState(true);

    //-------------------------------------------------------------------------------------


    const getIndicatorColor = (estado) => {
        switch (estado) {
            case 'Activo':
                return 'green';
            case 'Inactivo':
                return 'red';
            case 'Pendiente':
                return 'yellow';
            default:
                return 'gray';
        }
    };

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
    //--------Carga Productos Baja------------------------------------------

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
                    return item.categoria.toLowerCase().includes(filtro.valor.toLowerCase());
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

    //------------------------------------------------------------------------------------------
    const handleEditClick = (registro) => {
        setRegistroSeleccionado(registro);
        setCatalogoMenu(false);
        setModoEdicion(true);
    };

    const handleCancel = () => {
        setModoEdicion(false);
    };

    const handleSave = async (formData) => {
        await productoService.updateProducto(registroSeleccionado.id, formData);
        setModoEdicion(false);
        // Aquí puedes agregar lógica adicional para actualizar la lista de productos o mostrar un mensaje de éxito
    };
    //------------------------------------------------------------------------------------------

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
                                <div className={`d-flex  ${modoEdicion ? 'd-none' : ''}`}>
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
                            {modoEdicion ? (
                                <ModificarProducto registro={registroSeleccionado} onSave={handleSave} onCancel={handleCancel} />
                            ) : (
                                <ContenidoVariable
                                    menuContent={menuContent}
                                    catalogTab={catalogTab}
                                    filtrosActivos={filtrosActivos}
                                    handleRemoveFiltro={handleRemoveFiltro}
                                    filtroSeleccionado={filtroSeleccionado}
                                    handleFiltroChange={handleFiltroChange}
                                    busqueda={busqueda}
                                    handleBusquedaChange={handleBusquedaChange}
                                    dataToDisplay={dataToDisplay}
                                    getIndicatorColor={getIndicatorColor}
                                    handleEditClick={handleEditClick}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
