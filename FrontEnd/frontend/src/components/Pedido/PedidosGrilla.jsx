// PedidosGrilla.jsx

import React, { useState } from 'react';
import { usePedido } from './PedidoContext';
import './pedidosGrilla.css';

export function PedidosGrilla() {
    const [currentPage, setCurrentPage] = useState(1);
    const pedidosPerPage = 6;

    // Simulando pedidos iniciales con los métodos de pago restringidos
    const pedidosSimulados = [
        { id: 1, fecha: '2023-10-01', total: 50140, estado: 'Rechazado', metodoPago: 'Efectivo' },
        { id: 2, fecha: '2024-11-03', total: 1200, estado: 'Pendiente', metodoPago: 'Transferencia Bancaria' },
        { id: 3, fecha: '2024-10-05', total: 78250, estado: 'Pendiente', metodoPago: 'Efectivo' },
        { id: 4, fecha: '2024-10-07', total: 62540, estado: 'Confirmado', metodoPago: 'Transferencia Bancaria' },
        { id: 5, fecha: '2024-12-10', total: 90360, estado: 'Confirmado', metodoPago: 'Efectivo' },
        { id: 6, fecha: '2024-10-15', total: 12250, estado: 'Rechazado', metodoPago: 'Transferencia Bancaria' },
        { id: 7, fecha: '2024-01-20', total: 45350, estado: 'Pendiente', metodoPago: 'Efectivo' },
        { id: 8, fecha: '2024-10-25', total: 99250, estado: 'Confirmado', metodoPago: 'Transferencia Bancaria' },
    ];

    const { pedidoActual = [] } = usePedido();  // Valor predeterminado como array vacío
    const pedidos = pedidoActual.length > 0 ? pedidoActual : pedidosSimulados;

    // Ordena por fecha 
    const pedidosOrdenados = [...pedidos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Calcula los pedidos para la página actual
    const indexOfLastPedido = currentPage * pedidosPerPage;
    const indexOfFirstPedido = indexOfLastPedido - pedidosPerPage;
    const pedidosActuales = pedidosOrdenados.slice(indexOfFirstPedido, indexOfLastPedido);

    // Cambia la página
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
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosActuales.map((pedido) => (
                            <tr key={pedido.id}>
                                <td data-label="ID de pedido">{pedido.id}</td>
                                <td data-label="Fecha de solicitud:">{pedido.fecha}</td>
                                <td data-label="Total:">${pedido.total}</td>
                                <td data-label="Método de Pago:">{pedido.metodoPago}</td>
                                <td data-label="Estado:">
                                    <span className="estado-contenedor">
                                        {pedido.estado}
                                        <span
                                            className="estado-indicador"
                                            style={{
                                                backgroundColor: getIndicatorColor(pedido.estado)
                                            }}
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav aria-label="Paginación">
                <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(pedidos.length / pedidosPerPage) }, (_, i) => (
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
