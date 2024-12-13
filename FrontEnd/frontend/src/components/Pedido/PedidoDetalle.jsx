import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './pedidoDetalle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faFileLines, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export function PedidoDetalle() {
    const location = useLocation();
    const navigate = useNavigate();
    const pedido = location.state?.pedido;
    const fromPedidosUsuario = location.state?.fromPedidosUsuario;

    const getEstado = (nroEstado) => {
        if (typeof nroEstado === 'string') {
            return nroEstado;
        }

        switch (nroEstado) {
            case 1:
                return 'Inactivo';
            case 7:
                return 'Pendiente';
            case 9:
                return 'Rechazado';
            case 12:
                return 'Nuevo';
            case 13:
                return 'Aceptado';
            default:
                return 'Desconocido';
        }
    };

    const handlePrint = async () => {
        if (pedido && pedido.id) {
            const response = await fetch(`http://localhost:8080/api/v1/impresion/pedido/${pedido.id}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `pedido_${pedido.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    };

    const handleVolverMisPedidos = () => {
        navigate('/pedidos-usuario');
    };

    return (
        <div className="container pedido-detalle">
            <h1 className="text-center my-4">Descripción del Pedido</h1>

            {pedido ? (
                <>
                    {fromPedidosUsuario && (
                        <div className="container ms-0 ps-0">
                            <div className="row mb-3">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                                    <div className="d-flex align-items-start">
                                        <button className="btn btn-secundario text-white" onClick={handleVolverMisPedidos}>
                                            <FontAwesomeIcon icon={faArrowLeft} size={"md"}/>
                                            <span className="ps-1">Volver a Mis Pedidos</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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
                                                <td>{new Date(pedido.fecha).toLocaleDateString('es-ES') || 'No especificada'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Dirección de entrega:</strong></td>
                                                <td>{pedido.direccionEnvio || 'No especificada'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="table table-bordered tabla-detalles">
                                        <tbody>
                                            <tr>
                                                <td><strong>Cliente:</strong></td>
                                                <td>{pedido.nombre}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Estado:</strong></td>
                                                <td>{getEstado(pedido.estado) || 'Desconocido'}</td>
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

                    <div className="text-left my-4">
                        <button className="btn btn-imprimir" onClick={handlePrint}>
                            <FontAwesomeIcon icon={faFileLines} size="lg" />  Generar PDF
                        </button>
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