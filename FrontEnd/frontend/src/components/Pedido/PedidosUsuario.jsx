import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './pedidosUsuario.css';

export function PedidosUsuario() {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        estado: '',
        nroPedido: '',
        fechaDesde: '',
        fechaHasta: '',
    });
    const pedidosPerPage = 6;
    const navigate = useNavigate();

    const pedidosSimulados = [
        {
            id: 1,
            fecha: '2023-10-01',
            total: 50140,
            estado: 'Rechazado',
            metodoPago: 'Efectivo',
            productos: [
                { id: 101, nombre: 'Producto A', cantidad: 2, precioUnitario: 10000 },
                { id: 102, nombre: 'Producto B', cantidad: 1, precioUnitario: 30140 }
            ]
        },
        {
            id: 2,
            fecha: '2024-11-03',
            total: 1200,
            estado: 'Pendiente',
            metodoPago: 'Transferencia Bancaria',
            productos: [
                { id: 103, nombre: 'Producto C', cantidad: 3, precioUnitario: 400 }
            ]
        },
        {
            id: 3,
            fecha: '2024-10-05',
            total: 78250,
            estado: 'Pendiente',
            metodoPago: 'Efectivo',
            productos: [
                { id: 104, nombre: 'Producto D', cantidad: 5, precioUnitario: 10000 },
                { id: 105, nombre: 'Producto E', cantidad: 2, precioUnitario: 14125 }
            ]
        },
        {
            id: 4,
            fecha: '2024-10-07',
            total: 62540,
            estado: 'Confirmado',
            metodoPago: 'Transferencia Bancaria',
            productos: [
                { id: 106, nombre: 'Producto F', cantidad: 3, precioUnitario: 20847 },
                { id: 107, nombre: 'Producto G', cantidad: 1, precioUnitario: 5000 }
            ]
        },
        {
            id: 5,
            fecha: '2024-12-10',
            total: 90360,
            estado: 'Confirmado',
            metodoPago: 'Efectivo',
            productos: [
                { id: 108, nombre: 'Producto H', cantidad: 4, precioUnitario: 22590 },
                { id: 109, nombre: 'Producto I', cantidad: 2, precioUnitario: 11390 }
            ]
        },
        {
            id: 6,
            fecha: '2024-10-15',
            total: 12250,
            estado: 'Rechazado',
            metodoPago: 'Transferencia Bancaria',
            productos: [
                { id: 110, nombre: 'Producto J', cantidad: 1, precioUnitario: 12250 }
            ]
        },
        {
            id: 7,
            fecha: '2024-01-20',
            total: 45350,
            estado: 'Pendiente',
            metodoPago: 'Efectivo',
            productos: [
                { id: 111, nombre: 'Producto K', cantidad: 10, precioUnitario: 4535 }
            ]
        },
        {
            id: 8,
            fecha: '2024-10-25',
            total: 99250,
            estado: 'Confirmado',
            metodoPago: 'Transferencia Bancaria',
            productos: [
                { id: 112, nombre: 'Producto L', cantidad: 5, precioUnitario: 19850 }
            ]
        }
    ];
    const pedidosOrdenados = pedidosSimulados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

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
            case 'Confirmado':
                return 'green';
            case 'Rechazado':
                return 'red';
            case 'Pendiente':
                return 'yellow';
            default:
                return 'gray';
        }
    };

    const navigateToDetail = (pedido) => {
        navigate('/pedido-detalle', { state: { pedido } });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
        setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
    };

    return (
        <div className="pedidos-usuario">
            <h1 className="pedidos-usuario-title">Pedidos Solicitados</h1>
            
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
                        <option value="">Todos</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Rechazado">Rechazado</option>
                        <option value="Pendiente">Pendiente</option>
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