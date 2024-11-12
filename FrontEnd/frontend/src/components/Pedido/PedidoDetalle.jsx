import React from 'react';
import { useLocation } from 'react-router-dom';
import './pedidoDetalle.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../images/Header Icons/PFlogo.png';

export function PedidoDetalle() {
    const location = useLocation();
    const pedido = location.state?.pedido;

    const getEstado = (nroEstado) => {
        switch (nroEstado) {
            case 1:
                return 'Inactivo';
            case 7:
                return 'Pendiente';
            case 9:
                return 'Rechazado';
            case 13:
                return 'Aceptado';
            default:
                return 'Desconocido';
        }
    };

    const exportarPDF = () => {
        const input = document.getElementById('pedido-detalle-pdf');

        // Ajustamos la escala para evitar una resolución demasiado alta
        html2canvas(input, {
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
        }).then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            
            // Dimensiones de la página PDF
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculamos el ancho y alto de la imagen para que se ajuste a la página PDF
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            // Añadir logo en la esquina superior izquierda
            pdf.addImage(logo, 'PNG', 10, 5, 30, 30);

            // Agregar el contenido del pedido después del logo
            pdf.addImage(imgData, 'PNG', 0, 40, imgWidth, imgHeight > pdfHeight - 40 ? pdfHeight - 40 : imgHeight);

            // Guardar el archivo PDF
            pdf.save(`Pedido_${pedido?.id || 'detalle'}.pdf`);
        });
    };

    return (
        <div className="container pedido-detalle">
            <h1 className="text-center my-4">Descripción del Pedido</h1>
            
            {pedido ? (
                <>
                    <div id="pedido-detalle-pdf">
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
                                                    <td>{pedido.fecha.split("T")[0] || 'No especificada'}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Dirección de entrega:</strong></td>
                                                    <td>{pedido.direccionEntrega || 'No especificada'}</td>
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
                                                    <td>${pedido.montoTotal}</td>
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
                                                <td>{producto.nombre}</td>
                                                <td>{producto.cantidad}</td>
                                                <td>${producto.precioUnitario.toFixed(2)}</td>
                                                <td>${(producto.precioUnitario * producto.cantidad).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <button onClick={exportarPDF} className="btn btn-primary mt-4">
                        Guardar como PDF
                    </button>
                </>
            ) : (
                <p>No se encontró información sobre el pedido.</p>
            )}
        </div>
    );
}
