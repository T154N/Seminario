import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContenidoVariable from './ContenidoVariable';
import productoService from '../../services/producto/producto.service';
import categoriaService from '../../services/categoria/categoria.service';
import clienteService from '../../services/cliente/cliente.service';
import pedidoService from '../../services/pedido/pedido.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import ModificarProducto from './ModificarProducto';
import ModificarCategoria from './ModificarCategoria';
import AgregarProducto from './agregarProducto';
import AgregarCategoria from './agregarCategoria';
import PedidoAdmin from './PedidoAdmin';
import ConfirmModal from './ConfirmModal';
import ClienteAlta from './ClienteAlta'
import ModificarCliente from './ModificarCliente';


export function InicioAdmin() {
    // Estados principales
    const [menuContent, setMenuContent] = useState('Catálogo');
    const [catalogTab, setCatalogTab] = useState('Productos');
    const [busqueda, setBusqueda] = useState('');
    const [filtrosActivos, setFiltrosActivos] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState('nombre');
    const [productosActivos, setProductosActivos] = useState([]);
    const [categoriasActivos, setCategoriasActivas] = useState([]);
    const [pedidosActivos, setPedidosActivos] = useState([]);
    const [clientesActivos, setClientesActivos] = useState([]);
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [modoAlta, setModoAlta] = useState(false);
    const [catalogoMenu, setCatalogoMenu] = useState(true);

    // Estados secundarios
    const [checkboxState, setCheckboxState] = useState(false);
    const [savedFiltros, setSavedFiltros] = useState([]);
    const [savedCheckboxState, setSavedCheckboxState] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Usuario
    const storedUser = localStorage.getItem('email');
    const usuarioMod = storedUser ?? 'ADMIN';

    // Efectos
    useEffect(() => {
        handleCancel();
    }, [menuContent]);

    useEffect(() => {
        const fetchProductos = async () => {
            const productos = await productoService.getAllProductosAdmin();
            const productosFiltrados = checkboxState
                ? productos.filter(producto => producto.estado === 2)
                : productos.filter(producto => producto.estado === 1);
            setProductosActivos(productosFiltrados);
        };

        if (menuContent === 'Catálogo' && catalogTab === 'Productos') {
            fetchProductos();
        }
    }, [menuContent, catalogTab, checkboxState]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const categorias = await categoriaService.getAllCategoriasAdmin();
            const categoriasFiltradas = checkboxState
                ? categorias.filter(categoria => categoria.estado === 2)
                : categorias.filter(categoria => categoria.estado === 1);
            setCategoriasActivas(categoriasFiltradas);
        };

        if (menuContent === 'Catálogo' && catalogTab === 'Categorias') {
            fetchCategorias();
        }
    }, [menuContent, catalogTab, checkboxState]);

    useEffect(() => {
        const fetchPedidos = async () => {
            const pedidos = await pedidoService.getAllPedidos();
            setPedidosActivos(pedidos);
        };

        if (menuContent === 'Pedidos') {
            fetchPedidos();
        }
    }, [menuContent, checkboxState]);

    useEffect(() => {
        const fetchClientes = async () => {
            const clientes = await clienteService.getAllClientes();
            const clientesFiltrados = checkboxState
                ? clientes.filter(cliente => cliente.estado === 2)
                : clientes.filter(cliente => cliente.estado === 1);
            setClientesActivos(clientesFiltrados);
        }
        if (menuContent === 'Clientes') {
            fetchClientes();
        }
    }, [menuContent, checkboxState]);

    useEffect(() => {
        const nuevosFiltros = filtrosActivos.filter(filtro => filtro.filtro !== filtroSeleccionado);
        if (busqueda.trim() !== '') {
            nuevosFiltros.push({ filtro: filtroSeleccionado, valor: busqueda });
        }
        setFiltrosActivos(nuevosFiltros);
    }, [busqueda, filtroSeleccionado]);

    // Funciones auxiliares
    const recargarProductos = async () => {
        const productos = await productoService.getAllProductosAdmin();
        const productosFiltrados = checkboxState
            ? productos.filter(producto => producto.estado === 2)
            : productos.filter(producto => producto.estado === 1);
        setProductosActivos(filteredData(productosFiltrados));
    };

    const recargarCategorias = async () => {
        const categorias = await categoriaService.getAllCategoriasAdmin();
        const categoriasFiltradas = checkboxState
            ? categorias.filter(categoria => categoria.estado === 2)
            : categorias.filter(categoria => categoria.estado === 1);
        setCategoriasActivas(filteredData(categoriasFiltradas));
    };

    const recargarPedidos = async () => {
        const pedidos = await pedidoService.getAllPedidos();
        setPedidosActivos(filteredData(pedidos));
    };

    const recargarClientes = async () => {
        const clientes = await clienteService.getAllClientes();
        const clientesFiltrados = checkboxState
            ? clientes.filter(cliente => cliente.estado === 2)
            : clientes.filter(cliente => cliente.estado === 1);
        setClientesActivos(filteredData(clientesFiltrados));
    };

    const filteredData = (data) => {
        return data.filter(item =>
            filtrosActivos.every(filtro => {
                if (filtro.filtro === 'nombre') {
                    return item.nombre.toLowerCase().includes(filtro.valor.toLowerCase());
                } else if (filtro.filtro === 'categoria' && item.categoria) {
                    return item.categoria.toLowerCase().includes(filtro.valor.toLowerCase());
                } else if (filtro.filtro === 'estado') {
                    return item.estado.toString() === filtro.valor;
                }
                return true;
            })
        );
    };

    const dataToDisplay = () => {
        if (menuContent === 'Catálogo' && catalogTab === 'Productos') return filteredData(productosActivos);
        if (menuContent === 'Catálogo' && catalogTab === 'Categorias') return filteredData(categoriasActivos);
        if (menuContent === 'Pedidos') return filteredData(pedidosActivos);
        if (menuContent === 'Clientes') return filteredData(clientesActivos);
        return [];
    };

    const getIndicatorColor = (estado) => {
        switch (estado) {
            case 'Activo': return 'green';
            case 'Aceptado': return 'green';
            case 'Inactivo': return 'grey';
            case 'Rechazado': return 'red';
            case 'Pendiente': return 'yellow';
            default: return 'gray';
        }
    };


    // Cambiar el estado del pedido
    const handleEstadoChange = (pedido, nuevoEstado) => {
        const estados = {
            'Rechazado': { estadoId: 9, estado: false },
            'Pendiente': { estadoId: 7, estado: false },
            'Aceptado': { estadoId: 13, estado: false },
            'Inactivo': { estadoId: 1, estado: false }
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
                            ? { ...p, estado: estadoData.estadoId }
                            : p
                    )
                );
            })

            .catch(error => {
                console.error("Error al cambiar el estado:", error);
            });
        pedidoService.updatePedidoEstado(pedido.id, estadoData.estadoId, "Admin", estadoData.estado)
    };

    const navigate = useNavigate();
    const mostrarDetalles = async (pedido) => {
        try {
            // Obtener los detalles del pedido
            const detalles = await pedidoService.getPedidoDetalles(pedido.id);

            // Añadir los detalles como un array en el pedido
            const pedidoConDetalles = {
                ...pedido,
                productos: detalles.map(detalle => ({
                    id: detalle.productoID,
                    nombre: detalle.productoName,
                    cantidad: detalle.cantidad,
                    precioUnitario: detalle.precioIndividual,
                    subtotal: detalle.subtotal,
                    medioPagoID: detalle.medioPagoID,
                    medioPagoName: detalle.medioPagoName
                }))
            };

            // Navegar al componente de detalles pasando el pedido con la lista de productos
            navigateToDetail(pedidoConDetalles);
        } catch (error) {
            console.error("Error al mostrar los detalles del pedido:", error);
        }
    };
    const navigateToDetail = (pedido) => {
        navigate('/pedido-detalle', { state: { pedido } });
    };

    // Manejo de filtros y búsqueda
    const handleBusquedaChange = (e) => setBusqueda(e.target.value);

    const handleFiltroChange = (e) => {
        setFiltroSeleccionado(e.target.value);
        setBusqueda('');
    };

    const handleRemoveFiltro = (filtroAEliminar) => {
        setFiltrosActivos(filtrosActivos.filter(filtro => filtro !== filtroAEliminar));
    };

    // Manejo de CRUD
    const handlePost = () => {
        setModoAlta(true);
        setCatalogoMenu(false);
    };

    const handleEditClick = (registro) => {
        setSavedFiltros(filtrosActivos);
        setSavedCheckboxState(checkboxState);
        setRegistroSeleccionado(registro);
        setCatalogoMenu(false);
        setModoEdicion(true);
    };

    const handleSave = async (formData) => {

        if (registroSeleccionado) {
            if (menuContent === 'Catálogo' && catalogTab === 'Productos') {
                await productoService.updateProducto(registroSeleccionado.id, formData);
                console.log("Producto modificado");
                recargarProductos();
            } else if (menuContent === 'Catálogo' &&catalogTab === 'Categorias') {
                await categoriaService.updateCategoria(registroSeleccionado.id, formData);
                console.log("Categoria modificada");
                recargarCategorias();
            } else if (menuContent === 'Pedidos') {
                await pedidoService.updatePedido(registroSeleccionado.id, formData);
                console.log("Pedido modificado");
                recargarPedidos();
            } else if (menuContent === 'Clientes') {
                await clienteService.modificarCliente(formData, "Admin");
                console.log("Cliente modificado");
                recargarClientes();
            }
        }
        else if (menuContent === 'Pedidos') {
            recargarPedidos();
        } else if (menuContent === 'Clientes') {
            recargarClientes();
        }
        handleCancel();
    }


    const handleCancel = () => {
        setModoEdicion(false);
        setModoAlta(false);
        setFiltrosActivos(savedFiltros);
        setCheckboxState(savedCheckboxState);
    };

    // Manejo de estado
    const handleInactivosChange = async (event) => {
        setCheckboxState(event.target.checked);
        if (menuContent === 'Catálogo' && catalogTab === 'Productos') {
            recargarProductos();
        } else if (menuContent === 'Catálogo' && catalogTab === 'Categorias') {
            recargarCategorias();
            //} else if (menuContent === 'Pedidos') {
            //    recargarPedidos();
            //} else if (menuContent === 'Clientes') {
            //    recargarClientes();
            //}
        }
    };

    // Manejo de eliminación
    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        if (menuContent === 'Catálogo' && catalogTab === 'Productos') {
            await productoService.setBajaProducto(itemToDelete.id, usuarioMod);
            recargarProductos();
        } else if (menuContent === 'Catálogo' && catalogTab === 'Categorias') {
            await categoriaService.setBajaCategoria(itemToDelete.id, usuarioMod);
            recargarCategorias();
        } else if (menuContent === 'Pedidos') {
            await pedidoService.setBajaPedido(itemToDelete.id, usuarioMod);
            recargarPedidos();
        } else if (menuContent === 'Clientes') {
            await clienteService.darDeBajaCliente(itemToDelete, usuarioMod);
            recargarClientes();
        }
        handleCancelDelete();
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setItemToDelete(null);
    };

    // Renderización
    return (
        <div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-2 menu">
                        <h2>Menú</h2>
                        <div className="d-flex flex-column">
                            {['Pedidos', 'Catálogo', 'Clientes'].map((item) => (
                                <button
                                    key={item}
                                    className="btn-admin btn btn-success mb-2 btn-block"
                                    onClick={() => setMenuContent(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="col-12 col-md-10 contenido">
                        {menuContent === 'Catálogo' && (
                            <div>
                                <h2>Gestión del Catálogo</h2>
                                <div className={`d-flex ${modoEdicion ? 'd-none' : ''}`}>
                                    {['Categorias', 'Productos'].map((tab) => (
                                        <button
                                            key={tab}
                                            className={`btn-tab ${catalogTab === tab ? 'active' : ''}`}
                                            onClick={() => setCatalogTab(tab)}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="tab-content-area mt-3">
                            {modoAlta ? (
                                menuContent === 'Pedidos' ? (
                                    <PedidoAdmin onSave={handleSave} onCancel={handleCancel} />
                                ) : menuContent === 'Clientes' ? (
                                    <ClienteAlta onSave={handleSave} onCancel={handleCancel} />
                                ) :
                                    catalogTab === 'Productos' ? (
                                    <AgregarProducto onSave={handleSave} onCancel={handleCancel} />
                                ) : (
                                    <AgregarCategoria onSave={handleSave} onCancel={handleCancel} />
                                )
                            ) : modoEdicion ? (
                                menuContent === 'Clientes' ? (
                                    <ModificarCliente
                                        registro={registroSeleccionado}
                                        onSave={handleSave}
                                        onCancel={handleCancel}
                                    />
                                ) : catalogTab === 'Productos' ? (
                                    <ModificarProducto
                                        registro={registroSeleccionado}
                                        onSave={handleSave}
                                        onCancel={handleCancel}
                                    />
                                ) : (
                                    <ModificarCategoria
                                        registro={registroSeleccionado}
                                        onSave={handleSave}
                                        onCancel={handleCancel}
                                    />
                                )
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
                                    handleEstadoChange={handleEstadoChange}
                                    mostrarDetalles={mostrarDetalles}
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