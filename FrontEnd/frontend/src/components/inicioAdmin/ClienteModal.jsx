import React from "react";
import "./clienteModal.css";

const ClienteModal = ({ clientData, onClose }) => {
    if (!clientData) return null;

    // Dividimos los atributos en dos grupos
    const firstHalfAttributes = [
        { label: "Tipo de Documento", value: clientData.tipoDocumento },
        { label: "Documento del Cliente", value: clientData.documento },
        { label: "CUIT", value: clientData.cuit },
        { label: "Apellido", value: clientData.apellido },
        { label: "Nombre", value: clientData.nombre },
        { label: "Email", value: clientData.email },
    ];

    const secondHalfAttributes = [
        { label: "Teléfono", value: clientData.telefono },
        { label: "Tipo de Domicilio", value: clientData.tipoDomicilio },
        { label: "Dirección", value: clientData.direccion },
        { label: "Barrio", value: clientData.barrio },
        { label: "Código Postal", value: clientData.codigoPostal },
        { label: "Estado", value: clientData.estado === 1 ? "Activo" : clientData.estado === 2 ? "Inactivo" : clientData.estado },
    ];

    return (
        <div className="cliente-modal-backdrop">
            <div className="cliente-modal-content">
                <h2>Detalles del Cliente</h2>
                <div className="cliente-modal-tables">
                    {/* Primera tabla */}
                    <table className="cliente-modal-table">
                        <tbody>
                            {firstHalfAttributes.map((attr, index) => (
                                <tr key={index}>
                                    <th>{attr.label}:</th>
                                    <td className="tabla-valores">{attr.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Segunda tabla */}
                    <table className="cliente-modal-table">
                        <tbody>
                            {secondHalfAttributes.map((attr, index) => (
                                <tr key={index}>
                                    <th>{attr.label}:</th>
                                    <td className="tabla-valores">{attr.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tabla para Observaciones */}
                <div className="cliente-modal-observaciones-fullwidth">
                    <table className="cliente-modal-table">
                        <tbody>
                            <tr>
                                <th className="obesrvaciones-cabecera" >Observaciones:</th>
                                <td className="tabla-valores">{clientData.observaciones || "Sin observaciones"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button className="cliente-modal-btn" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default ClienteModal;
