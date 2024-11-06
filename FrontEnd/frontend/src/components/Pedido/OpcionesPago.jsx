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
    const [metodoSeleccionado, setMetodoSeleccionado] = useState(pedidoActual.metodoPago);
    const [isPedidoFinalizado, setIsPedidoFinalizado] = useState(false); // Nuevo estado

    const efectivoRef = useRef(null);
    const transferenciaRef = useRef(null);

    useEffect(() => {
        const efectivoCollapse = new Collapse(efectivoRef.current, { toggle: false });
        const transferenciaCollapse = new Collapse(transferenciaRef.current, { toggle: false });

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

        return () => {
            efectivoCollapse.dispose();
            transferenciaCollapse.dispose();
        };
    }, [metodoSeleccionado]);

    const seleccionarMetodo = (metodo, e) => {
        e.stopPropagation();
        setMetodoSeleccionado(metodoSeleccionado === metodo ? null : metodo);
    };

    const finalizarPedido = () => {
        if (metodoSeleccionado) {
            vaciarCarrito();
            setMetodoPago(metodoSeleccionado);
            setIsPedidoFinalizado(true); // Marca que el pedido está listo para finalizar
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
                                        Seleccione esta opción si desea pagar en efectivo al recibir su pedido.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
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
                                        <p>Seleccione esta opción si desea pagar mediante transferencia bancaria.</p>
                                        <div className="mb-3">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title text-center">Resumen del Pedido</h5>
                            <hr />
                            {pedidoActual.total > 0 ? (
                                <p className="card-text text-center">
                                    <strong>Total: </strong>
                                    <span className="h4">${pedidoActual.total}</span>
                                </p>
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
