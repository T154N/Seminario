import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import './modificarCliente.css';
import modificarCliente from '../../services/cliente/cliente.service';

const ModificarContenidoCliente = ({ registro, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        cliente_documento: "",
        cliente_tipo_documento: "DNI",
        cliente_cuit: "",
        cliente_apellido: "",
        cliente_nombre: "",
        cliente_email: "",
        cliente_telefono: "",
        cliente_observaciones: "",
        domicilioTipoDomicilioId: "1",
        domicilioDireccion: "",
        domicilioBarrio: "",
        domicilioUbicacion: "",
        domicilioCodigoPostal: "0",
        estado: "1", // Default: Activo
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (registro) {
            setFormData({
                cliente_documento: registro.documento || "",
                cliente_tipo_documento: registro.tipoDocumento || "DNI",
                cliente_cuit: registro.cuit || "",
                cliente_apellido: registro.apellido || "",
                cliente_nombre: registro.nombre || "",
                cliente_email: registro.email || "",
                cliente_telefono: registro.telefono || "",
                cliente_observaciones: registro.observaciones || "Observaciones varias",
                domicilioTipoDomicilioId: registro.tipoDomicilio === "CASA" ? "1" : registro.tipoDomicilio === "LOCAL COMERCIAL" ? "2" : "3",
                domicilioDireccion: registro.direccion || "",
                domicilioBarrio: registro.barrio || "Barrio cenrtrico",
                domicilioUbicacion: registro.ubicacion || "",
                domicilioCodigoPostal: registro.codigoPostal || "0",
                estado: registro.estado ? registro.estado.toString() : "1",
            });
            setIsLoading(false);
        }
        console.log(registro);
    }, [registro]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Preparar el objeto cliente con los datos requeridos
        const cliente = {
            idUsuario: registro.idUsuario,
            documento: formData.cliente_documento,
            tipoDocumento: formData.cliente_tipo_documento,
            apellido: formData.cliente_apellido,
            nombre: formData.cliente_nombre,
            email: formData.cliente_email,
            estado: parseInt(formData.estado, 10),
            telefono: formData.cliente_telefono,
            observaciones: formData.cliente_observaciones,
            cuit: formData.cliente_cuit,
            direccion: formData.domicilioDireccion,
            barrio: formData.domicilioBarrio,
            ubicacion: formData.domicilioUbicacion,
            codigoPostal: formData.domicilioCodigoPostal,
            domicilioUbicacion: formData.domicilioUbicacion,
            domicilioLocalidadId: 545,
            domicilioEsPrincipal: 'Y',
            usuario_contrasena: "",
            usuario_rol_id: 1,
            usuario_observaciones: " ",
            usuario_alta: "Admin",
        };
        console.log(cliente);
        onSave(cliente);

    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const renderField = ({ name, title, colSize, type, options }) => {
        return (
            <div className={`col-md-${colSize}`} key={name}>
                <label className="form-label">{title}</label>
                {options ? (
                    <select
                        className="form-select"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                    >
                        {options.map((option, index) => (
                            <option value={option.value} key={index}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type || "text"}
                        className="form-control"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={registro ? registro[name] || title : title} // Placeholder dinámico
                        required
                    />
                )}
            </div>
        );
    };
    const fields = [
        {
            name: "cliente_documento",
            title: "Documento del Cliente",
            placeholder: "Documento del cliente",
            colSize: 6,
        },
        {
            name: "cliente_tipo_documento",
            title: "Tipo de Documento",
            colSize: 6,
            options: [
                { value: "DNI", label: "DNI" },
                { value: "PASAPORTE", label: "Pasaporte" },
                { value: "CEDULA", label: "Cédula" },
            ],
        },
        {
            name: "cliente_cuit",
            title: "CUIT",
            placeholder: "CUIT del cliente",
            colSize: 6,
        },
        {
            name: "cliente_apellido",
            title: "Apellido",
            placeholder: "Apellido del cliente",
            colSize: 6,
        },
        {
            name: "cliente_nombre",
            title: "Nombre",
            placeholder: "Nombre del cliente",
            colSize: 6,
        },
        {
            name: "cliente_email",
            title: "Email",
            placeholder: "Email del cliente",
            colSize: 6,
        },
        {
            name: "cliente_telefono",
            title: "Teléfono",
            placeholder: "Teléfono del cliente",
            colSize: 6,
        },
        {
            name: "domicilioTipoDomicilioId",
            title: "Tipo de Domicilio",
            colSize: 6,
            options: [
                { value: "1", label: "Casa" },
                { value: "2", label: "Local Comercial" },
                { value: "3", label: "Depósito" },
            ],
        },
        {
            name: "domicilioDireccion",
            title: "Dirección",
            placeholder: "Dirección del cliente",
            colSize: 6,
        },
        {
            name: "domicilioBarrio",
            title: "Barrio",
            placeholder: "Barrio del cliente",
            colSize: 6,
        },
        {
            name: "domicilioCodigoPostal",
            title: "Código Postal",
            placeholder: "Código postal",
            colSize: 6,
        },
        {
            name: "estado",
            title: "Estado",
            colSize: 6,
            options: [
                { value: "1", label: "Activo" },
                { value: "2", label: "Inactivo" },
            ],
        },
        {
            name: "cliente_observaciones",
            title: "Observaciones",
            placeholder: "Observaciones del cliente",
            colSize: 12,
        },
    ];

    return (
        <div className="modificar-contenido-cliente container">
            <h2 className="mb-4">Modificar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    {fields.map((field) => renderField(field))}
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-danger" onClick={onCancel}>
                        <FontAwesomeIcon icon={faTimes} /> Cancelar
                    </button>
                    <button type="submit" className="btn btn-success">
                        <FontAwesomeIcon icon={faSave} /> Guardar
                    </button>

                </div>
            </form>
        </div>
    );
};

export default ModificarContenidoCliente;
