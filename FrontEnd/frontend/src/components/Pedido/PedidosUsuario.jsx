import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './pedidosUsuario.css';
import { pedidosSimulados } from '../../services/pedido/pedido.mock';

export function PedidosUsuario() {
    const [currentPage, setCurrentPage] = useState(1);
    const pedidosPerPage = 6;
    const navigate = useNavigate();

    const estadoMapping = {
        0: { label: 'Confirmado', color: 'green' },
        1: { label: 'Pendiente', color: 'yellow' },
        2: { label: 'Rechazado', color: 'red' }
    };

    const pedidosOrdenados = pedidosSimulados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const indexOfLastPedido = currentPage * pedidosPerPage;
    const indexOfFirstPedido = indexOfLastPedido - pedidosPerPage;
    const pedidosActuales = pedidosOrdenados.slice(indexOfFirstPedido, indexOfLastPedido);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                        {estadoMapping[pedido.estado].label}
                                        <span
                                            className="pedidos-usuario-estado-indicador"
                                            style={{ backgroundColor: estadoMapping[pedido.estado].color }}
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
