import React from 'react';
import { useLocation } from 'react-router-dom';
import './pedidoDetalle.css';

export function PedidoDetalle() {
    const location = useLocation();
    const pedido = location.state?.pedido;

    // ID de pedido aleatorio
    const idPedido = 0 //pedido?.id || Math.floor(Math.random() * 1000000);

    return (
        <div className="container pedido-Detalle">
            <h1 className="text-center my-4">Descripción del pedido</h1>

            {pedido ? (
                <>
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Detalles del Pedido</h5>
                            <hr />
                            <p><strong>ID del Pedido:</strong> {pedido.id}</p>
                            <p><strong>Total:</strong> ${pedido.total}</p>
                            <p><strong>Dirección de Envío:</strong> {pedido.direccionEnvio || 'No especificada'}</p>
                            <p><strong>Método de Pago:</strong> {pedido.metodoPago}</p>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Productos en el Pedido</h5>
                            <hr />
                            {pedido.productos?.map((producto) => (
                                <div className="producto-detalle" key={producto.id}>
                                    <p><strong>Nombre:</strong> {producto.nombre}</p>
                                    <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                                    <p><strong>Precio Total:</strong> ${producto.precioUnitario * producto.cantidad}</p>
                                    <hr />
                                </div>
                            )) || <p>No hay productos en este pedido.</p>}
                        </div>
                    </div>
                </>
            ) : (
                <p>No se encontró información sobre el pedido.</p>
            )}
        </div>
    );
}
