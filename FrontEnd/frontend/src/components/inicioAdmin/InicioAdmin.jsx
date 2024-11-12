import React, { useState, useEffect } from 'react';
import ContenidoVariable from './ContenidoVariable';
import productoService from '../../services/producto/producto.service';
import categoriaService from '../../services/categoria/categoria.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
 import ModificarProducto from './ModificarProducto';
import ModificarCategoria from './ModificarCategoria';
import AgregarProducto from './agregarProducto';
import AgregarCategoria from './agregarCategoria';
import ConfirmModal from './ConfirmModal';

export function InicioAdmin() {
    const [menuContent, setMenuContent] = useState('Catálogo');
    const [catalogTab, setCatalogTab] = useState('Productos');
    const [busqueda, setBusqueda] = useState('');
    const [filtrosActivos, setFiltrosActivos] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState('nombre');
    const [productosActivos, setProductosActivos] = useState([]);
    const [categoriasActivos, setCategoriasActivas] = useState([]);
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [catalogoMenu, setCatalogoMenu] = useState(true);
    const [checkboxState, setCheckboxState] = useState(false);
    const [savedFiltros, setSavedFiltros] = useState([]);
    const [savedCheckboxState, setSavedCheckboxState] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const storedUser = localStorage.getItem('email');
    const usuarioMod = storedUser ?? 'ADMIN';
    const [modoAlta, setModoAlta] = useState(false);


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

    useEffect(() => {
        const fetchProductos = async () => {
            const productos = await productoService.getAllProductosAdmin();
            if (checkboxState) {
                const productosEstado2 = productos.filter(producto => producto.estado === 2);
                setProductosActivos(productosEstado2);
            } else {
                const productosEstado1 = productos.filter(producto => producto.estado === 1);
                setProductosActivos(productosEstado1);
            }
        };

        if (menuContent === 'Catálogo' && catalogTab === 'Productos') {
            fetchProductos();
        }
    }, [menuContent, catalogTab, checkboxState]);

    const recargarProductos = async () => {
        const productos = await productoService.getAllProductosAdmin();
        if (checkboxState) {
            const productosEstado2 = productos.filter(producto => producto.estado === 2);
            setProductosActivos(filteredData(productosEstado2));
        } else {
            const productosEstado1 = productos.filter(producto => producto.estado === 1);
            setProductosActivos(filteredData(productosEstado1));
        }
    };

    useEffect(() => {
        if (typeof recargarProductos === 'function') {
            console.log('recargarProductos está disponible');
        } else {
            console.error('recargarProductos no es una función');
        }
    }, [recargarProductos]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const categorias = await categoriaService.getAllCategoriasAdmin();
            if (checkboxState) {
                const categoriasEstado2 = categorias.filter(categoria => categoria.estado === 2);
                setCategoriasActivas(categoriasEstado2);
            } else {
                const categoriasEstado1 = categorias.filter(categoria => categoria.estado === 1);
                setCategoriasActivas(categoriasEstado1);
            }
        };

        if (menuContent === 'Catálogo' && catalogTab === 'Categorias') {
            fetchCategorias();
        }
    }, [menuContent, catalogTab, checkboxState]);

    const recargarCategorias = async () => {
        const categorias = await categoriaService.getAllCategoriasAdmin();
        if (checkboxState) {
            const categoriasEstado2 = categorias.filter(categoria => categoria.estado === 2);
            setCategoriasActivas(filteredData(categoriasEstado2));
        } else {
            const categoriasEstado1 = categorias.filter(categoria => categoria.estado === 1);
            setCategoriasActivas(filteredData(categoriasEstado1));
        }
    };

    const handleInactivosChange = async (event) => {
        setCheckboxState(event.target.checked);
        if (menuContent === 'Catálogo' && catalogTab === 'Productos') {
            if (event.target.checked) {
                const productosInactivos = await productoService.getAllProductosAdmin();
                const productosEstado2 = productosInactivos.filter(producto => producto.estado === 2);
                setProductosActivos(productosEstado2);
            } else {
                const productos = await productoService.getAllProductosAdmin();
                const productosEstado1 = productos.filter(producto => producto.estado === 1);
                setProductosActivos(productosEstado1);
            }
        } else if (menuContent === 'Catálogo' && catalogTab === 'Categorias') {
            if (event.target.checked) {
                const categoriasInactivas = await categoriaService.getAllCategoriasAdmin();
                const categoriasEstado2 = categoriasInactivas.filter(categoria => categoria.estado === 2);
                setCategoriasActivas(categoriasEstado2);
            } else {
                const categoriasActivas = await categoriaService.getAllCategoriasAdmin();
                const categoriasEstado1 = categoriasActivas.filter(categoria => categoria.estado === 1);
                setCategoriasActivas(categoriasEstado1);
            }
        }
    };



    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setShowConfirmModal(true);
    };
    const handleConfirmDelete = async () => {
        if (catalogTab === 'Productos') {
            await productoService.setBajaProducto(itemToDelete.id, usuarioMod);
            recargarProductos();
        } else if (catalogTab === 'Categorias') {
            await categoriaService.setBajaCategoria(itemToDelete.id, usuarioMod);
            recargarCategorias();
        }
        setShowConfirmModal(false);
        setItemToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setItemToDelete(null);
    };



    useEffect(() => {
        const nuevosFiltros = filtrosActivos.filter(filtro => filtro.filtro !== filtroSeleccionado);
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
        setBusqueda('');
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

    const handlePost = async () => {
        setModoAlta(true);
        setCatalogoMenu(false);
    }

    const handleEditClick = (registro) => {
        setSavedFiltros(filtrosActivos);
        setSavedCheckboxState(checkboxState);
        setRegistroSeleccionado(registro);
        setCatalogoMenu(false);
        setModoEdicion(true);
    };

    const handleCancel = () => {
        setModoEdicion(false);
        setModoAlta(false);
        setFiltrosActivos(savedFiltros);
        setCheckboxState(savedCheckboxState);
    };

    const handleSave = async (formData) => {
        if (catalogTab === 'Productos') {
            await productoService.updateProducto(registroSeleccionado.id, formData);
            await recargarProductos();
        } else if (catalogTab === 'Categorias') {
            await categoriaService.updateCategoria(registroSeleccionado.id, formData);
            await recargarCategorias();
        }
        setModoEdicion(false);
        setModoAlta(false);
        setCatalogoMenu(true);
        setFiltrosActivos(savedFiltros);
        setCheckboxState(savedCheckboxState);
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-2 menu">
                        <h2>Menú</h2>
                        <div className="d-flex flex-column">
                            <button className="btn-admin btn btn-success mb-2 btn-block btn-pedidos"
                                    onClick={() => setMenuContent('Pedidos')}>
                                Pedidos
                            </button>
                            <button className="btn-admin btn btn-success mb-2 btn-block"
                                    onClick={() => setMenuContent('Catálogo')}>
                                Catálogo
                            </button>
                            <button className="btn-admin btn btn-success mb-2 btn-block"
                                    onClick={() => setMenuContent('Clientes')}>
                                Clientes
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
                            {modoAlta && catalogTab === 'Productos' ? (
                                <AgregarProducto onSave={handleSave} onCancel={handleCancel}/>
                            ) : modoAlta && catalogTab === 'Categorias' ? (
                                <AgregarCategoria onSave={handleSave} onCancel={handleCancel}/>
                            ) : modoEdicion && catalogTab === 'Productos' ? (
                                <ModificarProducto registro={registroSeleccionado} onSave={handleSave}
                                                   onCancel={handleCancel}/>
                            ) : modoEdicion && catalogTab === 'Categorias' ? (
                                <ModificarCategoria registro={registroSeleccionado} onSave={handleSave}
                                                    onCancel={handleCancel}/>
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
                                    handleInactivosChange={handleInactivosChange}
                                    checkboxState={checkboxState}
                                    handleDeleteClick={handleDeleteClick}
                                    handlePost={handlePost}
                                    recargarProductos={recargarProductos}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                show={showConfirmModal}
                onConfirm={handleConfirmDelete}
                onHide={handleCancelDelete}
                message={`¿Estás seguro de que deseas dar de baja: ${itemToDelete?.nombre}?`}
            />
        </div>
    );
}