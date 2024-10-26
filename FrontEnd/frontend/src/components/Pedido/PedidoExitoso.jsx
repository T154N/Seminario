// PedidoExitoso.jsx
import React from 'react';
import { usePedido } from './PedidoContext';
import './pedidoExitoso.css';

export function PedidoExitoso() {
    const { pedidoActual, total, direccionEnvio, metodoPago } = usePedido();
    
    // Generar un ID de pedido aleatorio (simulado)
    const idPedido = Math.floor(Math.random() * 1000000);

    return (
        <div className="container pedido-exitoso">
            <h1 className="text-center my-4">Pedido solicitado con éxito!!</h1>
            
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="card-title">Detalles del Pedido</h5>
                    <hr />
                    <p><strong>ID del Pedido:</strong> {idPedido}</p>
                    <p><strong>Total:</strong> ${total}</p>
                    <p><strong>Dirección de Envío:</strong> {direccionEnvio}</p>
                    <p><strong>Método de Pago:</strong> {metodoPago}</p>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Productos en el Pedido</h5>
                    <hr />
                    {pedidoActual.map((producto) => (
                        <div className="producto-detalle" key={producto.id}>
                            <p><strong>Nombre:</strong> {producto.nombre}</p>
                            <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                            <p><strong>Precio Total:</strong> ${producto.precioUnitario * producto.cantidad}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
