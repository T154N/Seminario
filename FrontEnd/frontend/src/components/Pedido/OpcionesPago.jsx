import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePedido } from './PedidoContext';
import './resumenPedido.css';
import './opcionesPago.css';
import Collapse from 'bootstrap/js/dist/collapse';
import { useCarrito } from "../carrito/CarritoContext";

export function OpcionesPago() {
    const { pedidoActual, setMetodoPago } = usePedido();
    const { vaciarCarrito } = useCarrito();
    const navigate = useNavigate();
    const [metodoSeleccionado, setMetodoSeleccionado] = useState(pedidoActual?.metodoPago);
    const [isPedidoFinalizado, setIsPedidoFinalizado] = useState(false);
    const [showEfectivo, setShowEfectivo] = useState(true);
    const [showTransferencia, setShowTransferencia] = useState(true);

    const efectivoRef = useRef(null);
    const transferenciaRef = useRef(null);

    useEffect(() => {
        if (pedidoActual?.total > 0 && efectivoRef.current && transferenciaRef.current) {
            let efectivoCollapse;
            let transferenciaCollapse;

            try {
                efectivoCollapse = new Collapse(efectivoRef.current, { toggle: false });
                transferenciaCollapse = new Collapse(transferenciaRef.current, { toggle: false });

                if (metodoSeleccionado === "efectivo") {
                    efectivoCollapse.show();
                    transferenciaCollapse.hide();
                } else if (metodoSeleccionado === "transferencia") {
                    efectivoCollapse.hide();
                    transferenciaCollapse.show();
                } else {
                    efectivoCollapse.hide();
                    transferenciaCollapse.hide();
                }
            } catch (error) {
                console.error("Error al inicializar el colapso:", error);
            }

            // Limpieza para evitar errores cuando el componente se desmonte
            return () => {
                if (efectivoCollapse) efectivoCollapse.dispose();
                if (transferenciaCollapse) transferenciaCollapse.dispose();
            };
        }
    }, [metodoSeleccionado, pedidoActual?.total]);

    const seleccionarMetodo = (metodo, e) => {
        e.stopPropagation();
        setMetodoSeleccionado(metodo);

        // Ocultar la otra sección
        if (metodo === "efectivo") {
            setShowTransferencia(false);
        } else {
            setShowEfectivo(false);
        }
    };

    const finalizarPedido = () => {
        if (metodoSeleccionado) {
            vaciarCarrito();
            setMetodoPago(metodoSeleccionado);
            setIsPedidoFinalizado(true);
            console.log("Pedido finalizado:", pedidoActual);
        } else {
            alert('Por favor, seleccione un método de pago');
        }
    };

    useEffect(() => {
        if (isPedidoFinalizado) {
            navigate('/pedido-detalle', { state: { pedido: pedidoActual } });
        }
    }, [isPedidoFinalizado, navigate, pedidoActual]);

    // Si no hay pedidoActual, mostrar un mensaje de carga
    if (!pedidoActual) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container payment-page">
            <h1 className="text-center mb-4">Opciones de Pago</h1>

            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Seleccione un método de Pago</h5>
                        </div>

                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                {/* Condicionalmente renderiza la sección */}
                                {showEfectivo && (
                                    <>
                                        <h2 className="accordion-header">
                                            <label
                                                className="accordion-button collapsed"
                                                onClick={(e) => seleccionarMetodo("efectivo", e)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={metodoSeleccionado === "efectivo"}
                                                    readOnly
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="checkbox-margin"
                                                />{" "}
                                                <strong>Efectivo</strong>
                                            </label>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            ref={efectivoRef}
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                Seleccionó la opción de abonar con efectivo, presione "Finalizar pedido" para completar la solicitud del pedido.
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="accordion-item">
<<<<<<< Updated upstream
                                <h2 className="accordion-header">
                                    <label
                                        className="accordion-button collapsed"
                                        onClick={(e) => seleccionarMetodo("transferencia", e)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={metodoSeleccionado === "transferencia"}
                                            readOnly
                                            onClick={(e) => e.stopPropagation()}
                                            className="checkbox-margin"
                                        />{" "}
                                        <strong>Transferencia bancaria</strong>
                                    </label>
                                </h2>
                                <div
                                    id="collapseTwo"
                                    ref={transferenciaRef}
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <div className="mb-3">
                                            <p>Transfiera el total indicado a la siguiente cuenta bancaria:</p>
                                            
                                            <div className="transferencia-info">
                                                <p><strong>Alias:</strong> <span>mi.alias.bancario</span></p>
                                                <p><strong>CBU:</strong> <span>1234567890123456789012</span></p>
                                                <p><strong>Banco:</strong> <span>BANCOR</span></p>
                                                <p><strong>Número de cuenta:</strong> <span>1234567890</span></p>
                                                <p><strong>Titular de la cuenta:</strong> <span>Juan Pérez</span></p>
=======
                                {/* Condicionalmente renderiza la sección */}
                                {showTransferencia && (
                                    <>
                                        <h2 className="accordion-header">
                                            <label
                                                className="accordion-button collapsed"
                                                onClick={(e) => seleccionarMetodo("transferencia", e)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={metodoSeleccionado === "transferencia"}
                                                    readOnly
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="checkbox-margin"
                                                />{" "}
                                                <strong>Transferencia bancaria</strong>
                                            </label>
                                        </h2>
                                        <div
                                            id="collapseTwo"
                                            ref={transferenciaRef}
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <div className="mb-3">
                                                    <p>Transfiera el total indicado a la siguiente cuenta bancaria:</p>

                                                    <div className="transferencia-info">
                                                        <p><strong>Alias:</strong> <span>mi.alias.bancario</span></p>
                                                        <p><strong>CBU:</strong> <span>1234567890123456789012</span></p>
                                                        <p><strong>Banco:</strong> <span>BANCOR</span></p>
                                                        <p><strong>Número de cuenta:</strong> <span>1234567890</span></p>
                                                        <p><strong>Titular de la cuenta:</strong> <span>Juan Pérez</span></p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <p>Complete los siguientes campos con la información de su cuenta:</p>

                                                <div className="transferencia-info">
                                                    <div className="mb-3 ">
                                                        <label htmlFor="banco" className="form-label">Seleccione su Banco o Billetera</label>
                                                        <select id="banco" className="form-select w-100">
                                                            <option value="">Seleccione un banco...</option>
                                                            <option value="banco1">Banco 1</option>
                                                            <option value="banco2">Banco 2</option>
                                                            <option value="banco3">Banco 3</option>
                                                            <option value="Otro">Otro</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="cuenta" className="form-label">Número de cuenta</label>
                                                        <input type="text" id="cuenta" className="form-control w-100" placeholder="Ingrese su número de cuenta" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="titular" className="form-label">Nombre del titular de la cuenta</label>
                                                        <input type="text" id="titular" className="form-control w-100" placeholder="Ingrese el nombre del titular" />
                                                    </div>
                                                </div>
                                                <p>Una vez hecha la transferencia y llenado los campos con sus datos, presione "Finalizar pedido" para completar la solicitud del pedido.</p>
>>>>>>> Stashed changes
                                            </div>
                                        </div>
                                    </>
                                )}
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
                                    <p className="card-text nombre-cliente">Nombre del cliente</p>
                                    <hr className="separador" />
                                    <p className="card-text"><strong>Dirección de entrega:</strong></p>
                                    <p className="card-text direccion-entrega">Avenida Siempreviva 2130</p>
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
                                    onClick={finalizarPedido}
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
