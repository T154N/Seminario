// OpcionesPago.js

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePedido } from './PedidoContext'; // Cambiar a PedidoContext
import './resumenPedido.css';
import './opcionesPago.css';
import Collapse from 'bootstrap/js/dist/collapse';

export function OpcionesPago() {
    const { total, setMetodoPago } = usePedido(); // Cambiar a PedidoContext
    const navigate = useNavigate();
    const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);

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
            if (efectivoCollapse) efectivoCollapse.dispose();
            if (transferenciaCollapse) transferenciaCollapse.dispose();
        };
    }, [metodoSeleccionado]);

    const seleccionarMetodo = (metodo, e) => {
        e.stopPropagation();
        if (metodoSeleccionado === metodo) {
            setMetodoSeleccionado(null);
        } else {
            setMetodoSeleccionado(metodo);
        }
    };

    const finalizarPedido = () => {
        if (metodoSeleccionado) {
            setMetodoPago(metodoSeleccionado); // Almacena el método de pago en el contexto de Pedido
            navigate('/pedido-exitoso');
        } else {
            alert('Por favor, seleccione un método de pago');
        }
    };

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
                                            <label htmlFor="banco" className="form-label">Seleccione su banco</label>
                                            <select id="banco" className="form-select w-100">
                                                <option value="">Seleccione un banco...</option>
                                                <option value="banco1">Banco 1</option>
                                                <option value="banco2">Banco 2</option>
                                                <option value="banco3">Banco 3</option>
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
                            {total > 0 ? (
                                <p className="card-text text-center">
                                    <strong>Total: </strong>
                                    <span className="h4">${total}</span>
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
                                    disabled={total <= 0 || !metodoSeleccionado}
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
