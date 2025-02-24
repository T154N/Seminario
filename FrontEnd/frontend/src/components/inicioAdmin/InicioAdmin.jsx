import React, {useState, useEffect, useContext} from 'react';
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
import {UserContext} from "../login/UserContext";
import usuariosService from '../../services/usuarios/usuario.service';
import { set } from 'react-hook-form';


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
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [rolSeleccionado, setRolSeleccionado] = useState('');
    // Estados secundarios
    const [checkboxState, setCheckboxState] = useState(false);
    const [savedFiltros, setSavedFiltros] = useState([]);
    const [savedCheckboxState, setSavedCheckboxState] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [usuariosActivos, setUsuariosActivos] = useState([]);

    const navigate = useNavigate();

    // Usuario
    const storedUser = localStorage.getItem('email');
    const usuarioMod = storedUser ?? 'ADMIN';
    const {isLoggedIn} = useContext(UserContext);

    // Efectos

    // Si el usuario es ADMIN o SUPERADMIN o EMPLEADO inicioAdmin se renderiza

    useEffect(() => {
        const rol = localStorage.getItem('rol');
        if (!isLoggedIn || !['SUPERUSER', 'ADMIN', 'EMPLEADO'].includes(rol)) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

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

        if (menuContent === 'Catálogo' && catalogTab === 'Categorías') {
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
            console.log('Activosss' ,clientesFiltrados);
            console.log( 'Clientesssssss',  clientes);
        }
        if (menuContent === 'Clientes') {
            fetchClientes();
            
        }

    }, [menuContent, checkboxState]);

    useEffect(() => {
        const nuevosFiltros = filtrosActivos.filter(filtro => filtro.filtro !== filtroSeleccionado);
        if (busqueda.trim() !== '') {
            nuevosFiltros.push({filtro: filtroSeleccionado, valor: busqueda});
        }
        setFiltrosActivos(nuevosFiltros);
    }, [busqueda, filtroSeleccionado]);

    // Funciones auxiliares
    const handleFechaDesdeChange = (fecha) => {
        setFechaDesde(fecha);
    };

    const handleFechaHastaChange = (fecha) => {
        setFechaHasta(fecha);
    };

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

    const resetFilters = () => {
        setFiltrosActivos([]);
        setBusqueda('');
        setEstadoSeleccionado('');
        setFiltroSeleccionado('nombre');
        setRolSeleccionado('');
    };

    const handleMenuContentChange = (content) => {
        if (content === 'Usuarios') {
            setMenuContent('Clientes');
            resetFilters();
        }

        else{
        setMenuContent(content);
        resetFilters();}
    };

    const filteredData = (data) => {
        const estadoMap = {
            'Aceptado': 13,
            'Rechazado': 9,
            'EnPreparacion': 7,
            'Nuevo': 12,
            'PendientePago': 3,
            'Entregado': 6,
            'Preparado':10,
        };

        const rolMap = {
            'SUPERUSER': 1,
            'ADMIN': 2,
            'CLIENTE': 3,
            'EMPLEADO': 4,
        };

        return data.filter(item =>
            filtrosActivos.every(filtro => {
                if (filtro.filtro === 'nombre') {
                    return item.nombre.toLowerCase().includes(filtro.valor.toLowerCase());
                } else if (filtro.filtro === 'categoria' && item.categoria) {
                    return item.categoria.toLowerCase().includes(filtro.valor.toLowerCase());
                } else if (filtro.filtro === 'estado') {
                    return item.estado === estadoMap[filtro.valor];
                } else if (filtro.filtro === 'rol') {
                    return item.rolId === parseInt(filtro.valor, 10); // Conversión a número
                } else if (filtro.filtro === 'apellido') {
                    return item.apellido.toLowerCase().includes(filtro.valor.toLowerCase());
                } else if (filtro.filtro === 'documento') {
                    return item.documento.toLowerCase().includes(filtro.valor.toLowerCase());
                } else if (filtro.filtro === 'direccion') {
                    return item.direccion.toLowerCase().includes(filtro.valor.toLowerCase());
                } else if (filtro.filtro === 'email') {
                    return item.email.toLowerCase().includes(filtro.valor.toLowerCase());
                }
                return true;
            }) &&
            (estadoSeleccionado === '' || item.estado === estadoMap[estadoSeleccionado]) &&
            (rolSeleccionado === '' || item.rolId === parseInt(rolSeleccionado, 10)) // Conversión adicional
        );
    }
        
    const dataToDisplay = () => {
        if (menuContent === 'Catálogo' && catalogTab === 'Productos') return filteredData(productosActivos);
        if (menuContent === 'Catálogo' && catalogTab === 'Categorías') return filteredData(categoriasActivos);
        if (menuContent === 'Pedidos'){
            return filteredData(pedidosActivos)
                .filter((pedidosActivos) => {
                    const fechaPedido = new Date(pedidosActivos.fecha);
                    const hasta = fechaHasta ? new Date(fechaHasta) : null;
                    const desde = fechaDesde ? new Date(fechaDesde) : null;

                    const argentinaTimezoneOffset = -3 * 60; // Argentina is UTC-3
                    fechaPedido.setMinutes(fechaPedido.getMinutes() + fechaPedido.getTimezoneOffset() + argentinaTimezoneOffset);
                    if (hasta) {
                        hasta.setMinutes(hasta.getMinutes() + hasta.getTimezoneOffset() );
                        hasta.setDate(hasta.getDate() + 1);
                    }
                    if (desde) {
                        desde.setMinutes(desde.getMinutes() + desde.getTimezoneOffset());
                        desde.setDate(desde.getDate());
                    }
                    return (!desde || fechaPedido >= desde) && (!hasta || fechaPedido <= hasta);
                })
                // .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                .sort((a, b) => b.id - a.id);

            }
        if (menuContent === 'Clientes') return filteredData(clientesActivos);
        return [];
    };

    const getIndicatorColor = (estado) => {
        switch (estado) {
            case 'Activo': return 'green';
            case 'Aceptado': return 'blue';
            case 'Nuevo': return 'purple';
            case 'Rechazado': return 'red';
            case 'EnPreparacion': return 'yellow';
            case 'PendientePago': return 'orange';
            case  'Entregado': return 'green';
            case  'Preparado': return 'pink'
            default: return 'gray';
        }
    };

    function getClienteRol(rolId) {
        switch (rolId) {
            case 1:
                return 'SUPERUSER';
            case 2:
                return 'ADMIN';
            case 3:
                return 'CLIENTE';
            case 4:
                return 'EMPLEADO';
            default:
                return 'DESCONOCIDO';
        }
    }
    
    const handleEstadoChangeFiltro = (e) => {
        if (e && e.target) {
            setEstadoSeleccionado(e.target.value);
        } else {
            console.error("Event or target is undefined");
        }
    };

    const handleRolChangeFiltro = (e) => {
        const valor = e.target.value;
        setRolSeleccionado(valor);
    
    
    };


    // Cambiar el estado del pedido
    const handleEstadoChange = (pedido, nuevoEstado) => {
        const estados = {
            'Rechazado': { estadoId: 9, estado: false },
            'EnPreparacion': { estadoId: 7, estado: false },
            'Aceptado': { estadoId: 13, estado: false },
            'Nuevo': { estadoId: 12, estado: false },
            'PendientePago': {estadoId: 3, estado: false},
            'Entregado':{estadoId: 6, estado: false},
            'Preparado':{estadoId: 10, estado: false},

        };

        const estadoData = estados[nuevoEstado];

        // Verificar si el estadoData existe
        if (!estadoData) {
            console.error(`El estado "${nuevoEstado}" no es válido`);
            return;
        }

        pedidoService.updatePedidoEstado(pedido.pedidoId, estadoData.estadoId, "Admin", estadoData.estado)
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
        pedidoService.updatePedidoEstado(pedido.pedidoId, estadoData.estadoId, "Admin", estadoData.estado)

    };

    const mostrarDetalles = async (pedido) => {
        try {
            // Obtener los detalles del pedido
            const detalles = await pedidoService.getPedidoDetalles(pedido.pedidoId);
            console.log(detalles)
            console.log("pedido: ", pedido)

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
        navigate('/pedido-detalle', { state: { pedido, fromInicioAdmin: true } });
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
        recargarProductos();
        recargarCategorias();
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
            } else if (menuContent === 'Catálogo' &&catalogTab === 'Categorías') {
                await categoriaService.updateCategoria(registroSeleccionado.id, formData);
                console.log("Categoría modificada");
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
        recargarProductos();
        recargarCategorias();
    };

    // Manejo de estado
    const handleInactivosChange = async (event) => {
        setCheckboxState(event.target.checked);
        if (menuContent === 'Catálogo' && catalogTab === 'Productos') {
            recargarProductos();
        } else if (menuContent === 'Catálogo' && catalogTab === 'Categorías') {
            recargarCategorias();
        } else if (menuContent === 'Pedidos') {
               recargarPedidos();
        } else if (menuContent === 'Clientes') {
             recargarClientes();
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
        } else if (menuContent === 'Catálogo' && catalogTab === 'Categorías') {
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
                            {['Pedidos', 'Catálogo', 'Usuarios','Informes'].map((item) => (
                                <button
                                    key={item}
                                    className="btn-admin btn btn-success mb-2 btn-block"
                                    onClick={() => handleMenuContentChange(item)}
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
                                    {['Categorías', 'Productos'].map((tab) => (
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
                                    <ClienteAlta onSave={handleSave} onCancel={handleCancel} clientesActivos={clientesActivos} />
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
                                        clientesActivos={clientesActivos}
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
                                    estadoSeleccionado={estadoSeleccionado}
                                    rolSeleccionado={rolSeleccionado}
                                    filtrosActivos={filtrosActivos}
                                    handleRemoveFiltro={handleRemoveFiltro}
                                    filtroSeleccionado={filtroSeleccionado}
                                    handleFiltroChange={handleFiltroChange}
                                    busqueda={busqueda}
                                    handleBusquedaChange={handleBusquedaChange}
                                    dataToDisplay={dataToDisplay}
                                    getIndicatorColor={getIndicatorColor}
                                    getClienteRol={getClienteRol}
                                    handleEditClick={handleEditClick}
                                    handleInactivosChange={handleInactivosChange}
                                    checkboxState={checkboxState}
                                    handleDeleteClick={handleDeleteClick}
                                    handlePost={handlePost}
                                    recargarProductos={recargarProductos}
                                    handleEstadoChange={handleEstadoChange}
                                    handleEstadoChangeFiltro={handleEstadoChangeFiltro}
                                    mostrarDetalles={mostrarDetalles}
                                    handleFechaDesdeChange={handleFechaDesdeChange}
                                    handleFechaHastaChange={handleFechaHastaChange}
                                    handleRolChangeFiltro={handleRolChangeFiltro}
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