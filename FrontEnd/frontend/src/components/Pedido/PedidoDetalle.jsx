import React from 'react';
import { useLocation } from 'react-router-dom';
import './pedidoDetalle.css';

export function PedidoDetalle() {
    const location = useLocation();
    const pedido = location.state?.pedido;

    return (
        <div className="container pedido-detalle">
            <h1 className="text-center my-4">Descripción del Pedido</h1>

            {pedido ? (
                <>
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Detalles del Pedido</h5>
                            <hr />
                            <div className="pedido-detalle-grid">
                                <div className="pedido-detalle-tablas">
                                    <table className="table table-bordered tabla-detalles">
                                        <tbody>
                                            <tr>
                                                <td><strong>Nro de pedido:</strong></td>
                                                <td>{pedido.id}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Fecha:</strong></td>
                                                <td>{pedido.fecha || 'No especificada'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Dirección de Envío:</strong></td>
                                                <td>{pedido.direccionEnvio || 'No especificada'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="table table-bordered tabla-detalles">
                                        <tbody>
                                            <tr>
                                                <td><strong>Método de Pago:</strong></td>
                                                <td>{pedido.metodoPago}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Estado:</strong></td>
                                                <td>{pedido.estado || 'Desconocido'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Total:</strong></td>
                                                <td>${pedido.total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Productos en el Pedido</h5>
                            <hr />
                            <table className="table table-bordered tabla-productos">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Cantidad</th>
                                        <th>Precio Unitario</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedido.productos?.map((producto) => (
                                        <tr key={producto.id}>
                                            <td data-label="Nombre">{producto.nombre}</td>
                                            <td data-label="Cantidad">{producto.cantidad}</td>
                                            <td data-label="Precio Unitario">${producto.precioUnitario.toFixed(2)}</td>
                                            <td data-label="Subtotal">${(producto.precioUnitario * producto.cantidad).toFixed(2)}</td>
                                        </tr>
                                    )) || (
                                        <tr>
                                            <td colSpan="4" className="text-center">No hay productos en este pedido.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <p>No se encontró información sobre el pedido.</p>
            )}
        </div>
    );
}
