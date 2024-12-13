import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './pedidosUsuario.css';
import pedidoService from "../../services/pedido/pedido.service";

export function PedidosUsuario() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pedidos, setPedidos] = useState([]);
    const [filters, setFilters] = useState({
        estado: '',
        nroPedido: '',
        fechaDesde: '',
        fechaHasta: '',
    });
    const pedidosPerPage = 6;
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const pedido = await pedidoService.getPedidosPorCadaCliente(localStorage.getItem('clienteId'));
            setPedidos(pedido);
            setLoading(false);
        };
        fetchData();
    }, []); // Array de dependencias vacío para que se ejecute solo una vez

    const pedidosOrdenados = pedidos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    const applyFilters = () => {
        return pedidosOrdenados.filter((pedido) => {
            const { estado, nroPedido, fechaDesde, fechaHasta } = filters;

            const matchesEstado = estado ? pedido.estado === estado : true;
            const matchesNroPedido = nroPedido ? pedido.id === parseInt(nroPedido) : true;
            const matchesFechaDesde = fechaDesde ? new Date(pedido.fecha) >= new Date(fechaDesde) : true;
            const matchesFechaHasta = fechaHasta ? new Date(pedido.fecha) <= new Date(fechaHasta) : true;

            return matchesEstado && matchesNroPedido && matchesFechaDesde && matchesFechaHasta;
        });
    };

    const clearFilters = () => {
        setFilters({
            estado: '',
            nroPedido: '',
            fechaDesde: '',
            fechaHasta: '',
        });
        setCurrentPage(1);
    };

    const filteredPedidos = applyFilters();

    const indexOfLastPedido = currentPage * pedidosPerPage;
    const indexOfFirstPedido = indexOfLastPedido - pedidosPerPage;
    const pedidosActuales = filteredPedidos.slice(indexOfFirstPedido, indexOfLastPedido);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getIndicatorColor = (estado) => {
        switch (estado) {
            case 'CONFIRMADO':
                return 'green';
            case 'RECHAZADO':
                return 'red';
            case 'CANCELADO':
                return 'red';
            case 'PENDIENTE':
                return 'yellow';
            default:
                return 'gray';
        }
    };

    const navigateToDetail = (pedido) => {
    navigate('/pedido-detalle', { state: { pedido, fromPedidosUsuario: true } });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
        setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
    };

    const handleVolverMisPedidos = () => {
        navigate('/pedidos-usuario');
    };

    if (loading) {
        return <div className="fs-3">Cargando tus pedidos...</div>;
    };

    return (
        <div className="pedidos-usuario">
            <h1 className="pedidos-usuario-title">Pedidos Solicitados</h1>

            {/* Mostrar el botón solo en la página de Descripcion del Pedido */}
            {location.pathname === '/pedido-detalle' && (
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                            <div className="d-flex align-items-start">
                                <button className="btn btn-secundario text-white" onClick={handleVolverMisPedidos}>
                                    Volver a Mis Pedidos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {location.pathname === '/inicioAdmin' && (
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                            <div className="d-flex align-items-start">
                                <button className="btn btn-secundario text-white" onClick={handleVolverMisPedidos}>
                                    Volver a Administración
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filtros */}
            <div className="pedidos-usuario-filtros">
                <label className="pedidos-usuario-filtro-label">
                    Estado:
                    <select
                        className="pedidos-usuario-filtro-select"
                        name="estado"
                        value={filters.estado}
                        onChange={handleFilterChange}
                    >
                        <option value="">TODOS</option>
                        <option value="CONFIRMADO">CONFIRMADO</option>
                        <option value="RECHAZADO">RECHAZADO</option>
                        <option value="PENDIENTE">PENDIENTE</option>
                        <option value="CANCELADO">CANCELADO</option>
                    </select>
                </label>
                <label className="pedidos-usuario-filtro-label">
                    Nro de pedido:
                    <input
                        type="number"
                        name="nroPedido"
                        value={filters.nroPedido}
                        onChange={handleFilterChange}
                        placeholder="Ej. 1"
                        className="pedidos-usuario-filtro-input"
                    />
                </label>
                <label className="pedidos-usuario-filtro-label">
                    Fecha desde:
                    <input
                        type="date"
                        name="fechaDesde"
                        value={filters.fechaDesde}
                        onChange={handleFilterChange}
                        className="pedidos-usuario-filtro-date"
                    />
                </label>
                <label className="pedidos-usuario-filtro-label">
                    Fecha hasta:
                    <input
                        type="date"
                        name="fechaHasta"
                        value={filters.fechaHasta}
                        onChange={handleFilterChange}
                        className="pedidos-usuario-filtro-date"
                    />
                </label>
                <button className="pedidos-usuario-filtro-boton" onClick={applyFilters}>
                    Filtrar
                </button>
                <button className="pedidos-usuario-filtro-boton-limpiar" onClick={clearFilters}>
                    Limpiar
                </button>
            </div>

            {/* Tabla de pedidos */}
            <div className="pedidos-usuario-table-responsive">
                <table className="pedidos-usuario-table">
                    <thead>
                    <tr>
                        <th className="pedidos-usuario-header">Nro de pedido</th>
                        <th className="pedidos-usuario-header">Fecha de solicitud</th>
                            <th className="pedidos-usuario-header">Método de Pago</th>
                            <th className="pedidos-usuario-header">Estado</th>
                            <th className="pedidos-usuario-header">Total</th>
                            <th className="pedidos-usuario-header">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosActuales.map((pedido) => (
                            <tr key={pedido.id}>
                                <td className="pedidos-usuario-data" data-label="Nro de pedido">{pedido.id}</td>
                                <td className="pedidos-usuario-data" data-label="Fecha de solicitud">{pedido.fecha}</td>
                                <td className="pedidos-usuario-data" data-label="Método de Pago">{pedido.metodoPago}</td>
                                <td className="pedidos-usuario-data" data-label="Estado">
                                    <span className="pedidos-usuario-estado">
                                        {pedido.estado}
                                        <span
                                            className="pedidos-usuario-estado-indicador"
                                            style={{ backgroundColor: getIndicatorColor(pedido.estado) }}
                                        />
                                    </span>
                                </td>
                                <td className="pedidos-usuario-data" data-label="Total">${pedido.total}</td>
                                <td className="pedidos-usuario-data" data-label="Detalles">
                                    <button onClick={() => navigateToDetail(pedido)} className="pedidos-usuario-btn-link">
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <nav aria-label="Paginación">
                <ul className="pedidos-usuario-pagination">
                    {Array.from({ length: Math.ceil(filteredPedidos.length / pedidosPerPage) }, (_, i) => (
                        <li key={i + 1} className={`pedidos-usuario-page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="pedidos-usuario-page-link" onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}