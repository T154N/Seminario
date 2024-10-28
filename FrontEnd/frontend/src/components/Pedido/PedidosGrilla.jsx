import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './pedidosGrilla.css';

export function PedidosGrilla() {
    const [currentPage, setCurrentPage] = useState(1);
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

    // Cálculo de paginación
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

    // Navegar a detalle del pedido
    const navigateToDetail = (pedido) => {
        navigate('/pedido-detalle', { state: { pedido } });
    };

    return (
        <div className="container pedidos-grilla">
            <h1 className="text-center my-4">Pedidos Solicitados</h1>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID de pedido</th>
                            <th>Fecha de solicitud</th>
                            <th>Total</th>
                            <th>Método de Pago</th>
                            <th>Estado</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosActuales.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.id}</td>
                                <td>{pedido.fecha}</td>
                                <td>${pedido.total}</td>
                                <td>{pedido.metodoPago}</td>
                                <td>
                                    <span className="estado-contenedor">
                                        {pedido.estado}
                                        <span
                                            className="estado-indicador"
                                            style={{ backgroundColor: getIndicatorColor(pedido.estado) }}
                                        />
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => navigateToDetail(pedido)} className="btn btn-link">
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav aria-label="Paginación">
                <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(pedidosSimulados.length / pedidosPerPage) }, (_, i) => (
                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
