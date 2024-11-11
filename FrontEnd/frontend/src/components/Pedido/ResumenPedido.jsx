// ResumenPedido.jsx
import React, { useEffect, useState } from "react";
import { usePedido } from "./PedidoContext";
import { useCarrito } from '../carrito/CarritoContext';
import { useNavigate } from 'react-router-dom';
import './resumenPedido.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import clienteService from "../../services/cliente/cliente.service";

export function ResumenPedido() {
    const { pedidoActual, actualizarCantidad, eliminarDelPedido } = usePedido();
    const { eliminarDelCarrito, cargandoProductosACarrito } = useCarrito();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [datosCliente, setDatosCliente] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const cliente = await clienteService.getDatosClientePedido();
            setDatosCliente(cliente);
            setLoading(false);
        };
        fetchData();
    }, []);

    const eliminarProducto = (id) => {
        eliminarDelPedido(id);
        eliminarDelCarrito(id);
    };

    const disminuirCantidad = (id) => {
        const producto = pedidoActual.productos.find((producto) => producto.id === id);
        if (producto && producto.cantidad > 1) {
            actualizarCantidad(id, producto.cantidad - 1);
        }
    };

    const incrementarCantidad = (id) => {
        const producto = pedidoActual.productos.find((producto) => producto.id === id);
        if (producto) {
            actualizarCantidad(id, producto.cantidad + 1);
        }
    };

    const handleInputChange = (id, value) => {
        const cantidad = value === "" ? "" : parseInt(value, 10);
        if (cantidad === "" || (!isNaN(cantidad) && cantidad > 0)) {
            actualizarCantidad(id, cantidad);
        }
    };

    const handleBlur = (id, value) => {
        const cantidad = parseInt(value, 10);
        if (isNaN(cantidad) || cantidad < 1) {
            actualizarCantidad(id, 1);
        }
    };

    const continuarPago = () => {
        navigate('/opciones-pago');
    };

    if (loading || cargandoProductosACarrito) {
        return <div className="fs-3">Generando carrito, por favor espere...</div>;
    }

    return (
        <div className="container payment-page">
            <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path
                        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091
                        1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0
                        .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1
                        1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>
            <h1 className="text-center mb-4">Resumen del Pedido</h1>

            <div className="row">
                <div className="col-md-8">
                    {pedidoActual.productos.length === 0 ? (
                        <div className="alert alert-warning text-center" role="alert">
                            <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img"
                                 aria-label="Warning:">
                                <use href="#exclamation-triangle-fill"/>
                            </svg>
                            No hay productos en el pedido.
                        </div>
                    ) : (
                        <div className="card shadow-sm mb-0">
                            <div className="card-header bg-primary text-white">
                                <h5 className="mb-0">Productos en el pedido</h5>
                            </div>
                            <div className="card-body p-0">
                                {pedidoActual.productos.map((producto) => (
                                    <div className="producto-resumen-card border-0 rounded-0 border-bottom"
                                         key={producto.id}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={producto.imagen} className="img-fluid rounded-start"
                                                     alt={producto.nombre}/>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{producto.nombre}</h5>
                                                    <div
                                                        className="cantidad-control-rectangulo d-flex align-items-center">
                                                        <button className="btn btn-outline-secondary"
                                                                onClick={() => disminuirCantidad(producto.id)}>-
                                                        </button>
                                                        <input
                                                            type="number"
                                                            className="form-control mx-2 no-arrows"
                                                            value={producto.cantidad || ""}
                                                            onChange={(e) => handleInputChange(producto.id, e.target.value)}
                                                            onBlur={(e) => handleBlur(producto.id, e.target.value)}
                                                            min="1"
                                                        />
                                                        <button className="btn btn-outline-secondary"
                                                                onClick={() => incrementarCantidad(producto.id)}>+
                                                        </button>
                                                    </div>
                                                    <div className="precios-container mt-2">
                                                        <p className="precio-unitario">
                                                            <strong>Precio
                                                                unitario:</strong> ${producto.precioUnitario.toFixed(2)}
                                                        </p>
                                                        <p className="precio-total">
                                                            <strong>Precio
                                                                total:</strong> ${(producto.precioUnitario * producto.cantidad).toFixed(2)}
                                                        </p>

                                                        <button className="btn btn-danger btn-eliminar mt-3"
                                                                onClick={() => eliminarProducto(producto.id)}>
                                                            <FontAwesomeIcon icon={faTrash}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title text-center">Detalles del Pedido</h5>
                            <hr/>
                            <p className="card-text"><strong>Cliente:</strong></p>
                            <p className="card-text nombre-cliente">{datosCliente.nombre + " " + datosCliente.apellido}</p>
                            <hr className="separador"/>
                            <p className="card-text"><strong>Dirección de entrega:</strong></p>
                            <p className="card-text direccion-entrega">{datosCliente.domicilioNombre}</p>
                            <hr className="separador"/>
                            <p className="card-text total-pedido text-center">
                                <strong>Total:</strong> <span className="h4">${pedidoActual.total}</span>
                            </p>
                            <div className="d-grid">
                                <button className="btn btn-secundario text-white btn-lg mt-3" onClick={continuarPago}>
                                    Continuar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}