import React, { useState, useEffect } from 'react';
import ContenidoVariable from './ContenidoVariable';
import productoService from '../../services/producto/producto.service';
import categoriaService from '../../services/categoria/categoria.service';
import pedidoService from '../../services/pedido/pedido.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import ModificarProducto from './ModificarProducto';
import ModificarCategoria from './ModificarCategoria';

export function InicioAdminPrueba() {
    //-------------------------------------------------------------------------------------
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
    const [pedidosActivos, setPedidosActivos] = useState([]);

    const getIndicatorColor = (estado) => {
        switch (estado) {
            case 'Activo':
                return 'green';

            case 'Aceptado':
                return 'green';

            case 'Inactivo':
                return 'red';

            case 'Rechazado':
                return 'red';


            case 'Pendiente':
                return 'yellow';
            default:
                return 'gray';
        }
    };

    //--------Carga Pedidos------------------------------------------
    useEffect(() => {
        const fetchPedidos = async () => {
            const pedidos = await pedidoService.getAllPedidos();
            setPedidosActivos(pedidos);
        };

        if (menuContent === 'Pedidos') {
            fetchPedidos();
        }
    }, [menuContent]);

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

    const recargarProductos = async () => {
        const productos = await productoService.getAllProductos();
        setProductosActivos(productos);
    };

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

    // Actualiza los filtros activos al cambiar la búsqueda o el filtro seleccionado
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
        if (menuContent === 'Pedidos') return filteredData(pedidosActivos);
        return [];
    };

    // Cambiar el estado del pedido
    const handleEstadoChange = (pedido, nuevoEstado) => {
        const estados = {
            'Rechazado': { estadoId: 3, estado: false },
            'Pendiente': { estadoId: 1, estado: true },
            'Aceptado': { estadoId: 2, estado: true }
        };

        const estadoData = estados[nuevoEstado];

        // Verificar si el estadoData existe
        if (!estadoData) {
            console.error(`El estado "${nuevoEstado}" no es válido`);
            return;
        }

        pedidoService.updatePedidoEstado(pedido.id, estadoData.estadoId, "Admin", estadoData.estado)
            .then(response => {
                console.log("Estado actualizado:", response);

                setPedidosActivos((prevPedidos) =>
                    prevPedidos.map((p) =>
                        p.id === pedido.id
                            ? { ...p, estado: nuevoEstado }
                            : p
                    )
                );
            })
            .catch(error => {
                console.error("Error al cambiar el estado:", error);
            });
    };


    const handleEditClick = (registro) => {
        setRegistroSeleccionado(registro);
        setCatalogoMenu(false);
        setModoEdicion(true);
    };

    const handleCancel = () => {
        setModoEdicion(false);
    };

    const handleSave = async (formData) => {
        if (catalogTab === 'Productos') {
            await productoService.updateProducto(registroSeleccionado.id, formData);
        } else if (catalogTab === 'Categorias') {
            await categoriaService.updateCategoria(registroSeleccionado.id, formData);
        }
        setModoEdicion(false);
        setCatalogoMenu(true);
        await recargarProductos();
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-12 col-md-2 menu ${modoEdicion ? 'd-none' : ''}`}>
                        <h2>Menú</h2>
                        <div className="d-flex flex-column ">
                            <button className="btn-admin btn btn-success mb-2 btn-block"
                                onClick={() => setMenuContent('Catálogo')}>
                                Catálogo
                            </button>
                            <button className="btn-admin btn btn-success mb-2 btn-block"
                                onClick={() => setMenuContent('Clientes')}>
                                Clientes
                            </button>
                            <button className="btn-admin btn btn-success mb-2 btn-block"
                                onClick={() => setMenuContent('Pedidos')}>
                                Pedidos
                            </button>
                        </div>
                    </div>

                    <div className={`col-12 ${modoEdicion ? '' : 'col-md-6'} contenido`}>
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
                            {modoEdicion && catalogTab === 'Productos' ? (
                                <ModificarProducto registro={registroSeleccionado} onSave={handleSave}
                                    onCancel={handleCancel} />
                            ) : modoEdicion && catalogTab === 'Categorias' ? (
                                <ModificarCategoria registro={registroSeleccionado} onSave={handleSave}
                                    onCancel={handleCancel} />
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
                                    handleEstadoChange={handleEstadoChange}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
