import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './pedidosUsuario.css';

export function PedidosUsuario() {
    const [currentPage, setCurrentPage] = useState(1);
    const pedidosPerPage = 6;
    const navigate = useNavigate();


    const pedidosSimulados = [
        {
            id: 1,
            fecha: '2023-10-01',
            montoTotal: 50140,
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
            montoTotal: 1200,
            estado: 'Pendiente',
            metodoPago: 'Transferencia Bancaria',
            productos: [
                { id: 103, nombre: 'Producto C', cantidad: 3, precioUnitario: 400 }
            ]
        },
        {
            id: 3,
            fecha: '2024-10-05',
            montoTotal: 78250,
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
            montoTotal: 62540,
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
            montoTotal: 90360,
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
            montoTotal: 12250,
            estado: 'Rechazado',
            metodoPago: 'Transferencia Bancaria',
            productos: [
                { id: 110, nombre: 'Producto J', cantidad: 1, precioUnitario: 12250 }
            ]
        },
        {
            id: 7,
            fecha: '2024-01-20',
            montoTotal: 45350,
            estado: 'Pendiente',
            metodoPago: 'Efectivo',
            productos: [
                { id: 111, nombre: 'Producto K', cantidad: 10, precioUnitario: 4535 }
            ]
        },
        {
            id: 8,
            fecha: '2024-10-25',
            montoTotal: 99250,
            estado: 'Confirmado',
            metodoPago: 'Transferencia Bancaria',
            productos: [
                { id: 112, nombre: 'Producto L', cantidad: 5, precioUnitario: 19850 }
            ]
        }
    ];

    const pedidosOrdenados = pedidosSimulados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const indexOfLastPedido = currentPage * pedidosPerPage;
    const indexOfFirstPedido = indexOfLastPedido - pedidosPerPage;
    const pedidosActuales = pedidosOrdenados.slice(indexOfFirstPedido, indexOfLastPedido);

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

    return (
        <div className="pedidos-usuario">
            <h1 className="pedidos-usuario-title">Pedidos Solicitados</h1>
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
                                <td className="pedidos-usuario-data" data-label="Total">${pedido.montoTotal}</td>
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

            <nav aria-label="Paginación">
                <ul className="pedidos-usuario-pagination">
                    {Array.from({ length: Math.ceil(pedidosSimulados.length / pedidosPerPage) }, (_, i) => (
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
