import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePedido } from './PedidoContext';
import './resumenPedido.css';
import './opcionesPago.css';
import { useCarrito } from "../carrito/CarritoContext";
import { MensajesLogin } from "../Mensajes/Mensajes";
import { useLocation } from "react-router-dom";

export function OpcionesPago() {
    const { pedidoActual, setMetodoPago, finalizarPedido } = usePedido();
    const { vaciarCarrito } = useCarrito();
    const navigate = useNavigate();
    const [metodoSeleccionado, setMetodoSeleccionado] = useState(pedidoActual?.metodoPago || null);
    const [isPedidoFinalizado, setIsPedidoFinalizado] = useState(false);
    const [creandoPedido, setCreandoPedido] = useState(false);

    const location = useLocation();
    const { datosCliente } = location.state || {};

    const seleccionarMetodo = (metodo, e) => {
        e.stopPropagation();
        if (metodoSeleccionado !== metodo) {
            setMetodoSeleccionado(metodo);
            setMetodoPago(metodo); // Ensure the payment method is set in the context
        } else {
            setMetodoSeleccionado(null); // Deselect if the same method is clicked again
            setMetodoPago(null); // Reset the payment method in the context
        }
    };

    const handleFinalizarPedido = async () => {
        if (metodoSeleccionado) {
            try {
                setCreandoPedido(true);
                await finalizarPedido();
                vaciarCarrito();
                setCreandoPedido(false);
                setIsPedidoFinalizado(true);
            } catch (error) {
                console.error("Error al finalizar el pedido:", error);
            }
        } else {
            alert('Por favor, seleccione un método de pago');
        }
    };

    useEffect(() => {
        if (isPedidoFinalizado) {
            navigate('/pedido-detalle', { state: { pedido: pedidoActual } });
        }
    }, [isPedidoFinalizado, navigate, pedidoActual]);

    const handleVolverCatalogo = () => {
        navigate("/catalogo");
    };

    // Si no hay pedidoActual, mostrar un mensaje de carga
    if (!pedidoActual) {
        return <p>Cargando...</p>;
    }

    if (creandoPedido) {
        return <MensajesLogin mensaje="Creando pedido, por favor espere..." tipoError="espera" />;
    }

    return (
        <div className="container payment-page">
            <h1 className="text-center mb-4">Opciones de Pago</h1>
            <div className="row mb-3">
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                    <div className="d-flex align-items-start">
                        <button className="btn btn-secundario text-white" onClick={handleVolverCatalogo}>Volver al catálogo</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Seleccione un método de Pago</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label
                                    className="accordion-button"
                                    onClick={(e) => seleccionarMetodo(1, e)}  // Transferencia bancaria
                                    style={{ cursor: 'pointer' }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={metodoSeleccionado === 1}
                                        readOnly
                                        onClick={(e) => e.stopPropagation()}
                                        className="checkbox-margin"
                                    />{" "}
                                    <strong>Transferencia bancaria</strong>
                                </label>
                                <div className="transferencia-info">
                                    <p>Transfiera el total indicado a la siguiente cuenta bancaria:</p>
                                    <p><strong>Alias:</strong> <span>mi.alias.bancario</span></p>
                                    <p><strong>CBU:</strong> <span>1234567890123456789012</span></p>
                                    <p><strong>Banco:</strong> <span>BANCOR</span></p>
                                    <p><strong>Número de cuenta:</strong> <span>1234567890</span></p>
                                    <p><strong>Titular de la cuenta:</strong> <span>Juan Pérez</span></p>
                                    <p>Una vez hecha la transferencia y llenado los campos con sus datos, presione "Finalizar pedido" para completar la solicitud del pedido.</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <p className="border border-warning border-top"></p>
                                <label
                                    className="accordion-button"
                                    onClick={(e) => seleccionarMetodo(2, e)}  // Efectivo
                                    style={{ cursor: 'pointer' }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={metodoSeleccionado === 2}
                                        readOnly
                                        onClick={(e) => e.stopPropagation()}
                                        className="checkbox-margin"
                                    />{" "}
                                    <strong>Efectivo</strong>
                                </label>
                                <div className="efectivo-info">
                                    <p>El pago en efectivo se realizará al momento de la entrega.</p>
                                    <p>Por favor, asegúrese de tener el monto exacto para evitar inconvenientes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title text-center">Detalles del Pedido</h5>
                            <hr />
                            {pedidoActual.total > 0 ? (
                                <>
                                    <p className="card-text"><strong>Cliente:</strong></p>
                                    <p className="card-text nombre-cliente">{datosCliente.nombre + " " + datosCliente.apellido}</p>
                                    <hr className="separador" />
                                    <p className="card-text"><strong>Dirección de entrega:</strong></p>
                                    <p className="card-text direccion-entrega">{datosCliente.domicilioNombre}</p>
                                    <hr className="separador" />
                                    <p className="card-text total-pedido text-center">
                                        <strong>Total: </strong>
                                        <span className="h4">${pedidoActual.total}</span>
                                    </p>
                                </>
                            ) : (
                                <p className="card-text text-center text-danger">
                                    Error al realizar el pedido, vuelva al catálogo para intentarlo nuevamente.
                                </p>
                            )}
                            <div className="d-grid">
                                <button
                                    className="btn btn-success btn-lg mt-3"
                                    onClick={handleFinalizarPedido}
                                    disabled={pedidoActual.total <= 0 || !metodoSeleccionado}
                                >
                                    Finalizar Pedido
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}