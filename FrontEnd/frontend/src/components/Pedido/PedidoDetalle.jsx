import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './pedidoDetalle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faFileLines, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import impresionPDFService from "../../services/impresion/impresionPDF.service";

export function PedidoDetalle() {
    const location = useLocation();
    const navigate = useNavigate();
    const pedido = location.state?.pedido;
    const fromPedidosUsuario = location.state?.fromPedidosUsuario;
    const fromInicioAdmin = location.state?.fromInicioAdmin;
    const fromOpcionesPago = location.state?.fromOpcionesPago;

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
        console.log("Pedido a imprimir: ", pedido)
        if (pedido) { //  && pedido.pedidoId
            try {
                const response = await impresionPDFService.imprimirPDF(pedido.pedidoId);
                const blob = response.data;
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;

                // Get the current date in dd-mm-yyyy format
                const currentDate = new Date();
                const day = String(currentDate.getDate()).padStart(2, '0');
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const year = currentDate.getFullYear();
                const formattedDate = `${day}-${month}-${year}`;

                a.download = `Pedido_Nro${pedido.id}_${formattedDate}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } catch (err) {
                console.error("Error al imprimir el PDF:", err);
            }
        } else {
            console.log("No se pudo imprimir el PDF. No se encontró información sobre el pedido.");
        }
    };

    const handleVolverMisPedidos = () => {
        navigate('/pedidos-usuario');
    };

    const handleVolverInicioAdmin = () => {
        navigate('/inicioAdmin');
    };

    const handleVolverInicio = () => {
        navigate('/');
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
                                            <FontAwesomeIcon icon={faArrowLeft} size={"lg"}/>
                                            <span className="ps-1">Volver a Mis Pedidos</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {fromInicioAdmin && (
                        <div className="container ms-0 ps-0">
                            <div className="row mb-3">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                                    <div className="d-flex align-items-start">
                                        <button className="btn btn-secundario text-white" onClick={handleVolverInicioAdmin}>
                                            <FontAwesomeIcon icon={faArrowLeft} size={"lg"}/>
                                            <span className="ps-1">Volver a Administración</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {fromOpcionesPago && (
                        <div className="container ms-0 ps-0">
                            <div className="row mb-3">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                                    <div className="d-flex align-items-start">
                                        <button className="btn btn-secundario text-white" onClick={handleVolverInicio}>
                                            <FontAwesomeIcon icon={faArrowLeft} size={"lg"}/>
                                            <span className="ps-1">Volver al Inicio</span>
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
                    {(fromOpcionesPago || fromPedidosUsuario) &&
                        <div>
                            <span className="fst-italic" style={{ color: "darkred" }}>
                                <span className="fw-bold me-1">*</span>
                                Para modificación o cancelación de un pedido, deberá comunicarse al WhatsApp: +54 9 351 366-2196.
                            </span>
                        </div>
                    }
                </>
            ) : (
                <p>No se encontró información sobre el pedido.</p>
            )}
        </div>
    );
}