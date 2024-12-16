import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import './modificarCliente.css';
import modificarCliente from '../../services/cliente/cliente.service';

const ModificarContenidoCliente = ({ registro, clientesActivos = [], onSave, onCancel }) => {
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
                cliente_observaciones: registro.observaciones,
                domicilioTipoDomicilioId: registro.tipoDomicilio === "CASA" ? "1" : registro.tipoDomicilio === "LOCAL COMERCIAL" ? "2" : "3",
                domicilioDireccion: registro.direccion || "",
                domicilioBarrio: registro.barrio || "Barrio céntrico",
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

    const handleCuitChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
        if (value.length > 11) value = value.slice(0, 11); // Limitar a 11 dígitos
    
        // Aplicar el formato NN-NNNNNNNN-N
        if (value.length > 2 && value.length <= 10) {
            value = value.replace(/^(\d{2})(\d{0,8})/, "$1-$2");
        } else if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{8})(\d{0,1})/, "$1-$2-$3");
        }
    
        setFormData({ ...formData, cliente_cuit: value });
    };
    
    const handleDocumentoChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
        setFormData({ ...formData, cliente_documento: value });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar duplicados, excluyendo el registro actual
        const emailDuplicado = clientesActivos.some(
            (cliente) =>
                cliente.email === formData.cliente_email &&
                cliente.idUsuario !== registro.idUsuario
        );

        const documentoDuplicado = clientesActivos.some(
            (cliente) =>
                cliente.documento === formData.cliente_documento &&
                cliente.idUsuario !== registro.idUsuario
        );

        if (emailDuplicado) {
            alert("Ya existe un cliente registrado con este correo electrónico.");
            return;
        }

        if (documentoDuplicado) {
            alert("Ya existe un cliente registrado con este número de documento.");
            return;
        }

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
            domicilioEsPrincipal: "Y",
            usuario_contrasena: "",
            rolId: formData.usuario_rol_id,
            usuario_observaciones: " ",
            usuario_alta: "Admin",
        };

        // Guardar cambios
        onSave(cliente);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const renderField = ({ name, title, colSize, type, options, onChange, required = true }) => (
        <div className={`col-md-${colSize}`} key={name}>
            <label className="form-label">{title}</label>
            {options ? (
                <select
                    className="form-select"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    {...(required ? { required: true } : {})}
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
                    onChange={onChange || handleChange} // Usar controlador personalizado si está definido
                    placeholder={registro ? registro[name] || title : title} // Placeholder dinámico
                    {...(required ? { required: true } : {})}
                />
            )}
        </div>
    );

    const fields = [
        {
            name: "cliente_documento",
            title: "Documento del Usuario",
            placeholder: "Documento del Usuario",
            colSize: 6,
            type: "text", // Usar texto para controlar el input manualmente
            onChange: handleDocumentoChange, // Asignar el controlador personalizado
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
            name: "cliente_apellido",
            title: "Apellido",
            placeholder: "Apellido del Usuario",
            colSize: 6,
        },
        {
            name: "cliente_nombre",
            title: "Nombre",
            placeholder: "Nombre del Usuario",
            colSize: 6,
        },

        {
            name: "cliente_cuit",
            title: "CUIT",
            placeholder: "CUIT del Usuario",
            colSize: 6,
            type: "text", // Usar texto para formatear dinámicamente
            onChange: handleCuitChange, // Asignar el controlador personalizado
            required: false,
        },


        {
            name: "cliente_email",
            title: "Email",
            placeholder: "Email del Usuario",
            colSize: 6,
        },
        {
            name: "cliente_telefono",
            title: "Teléfono",
            placeholder: "Teléfono del Usuario",
            colSize: 6,
            required: false
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
            placeholder: "Dirección del Usuario",
            colSize: 6,
        },
        {
            name: "domicilioBarrio",
            title: "Barrio",
            placeholder: "Barrio del Usuario",
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
            name: "usuario_rol_id",
            title: "Rol",
            colSize: 6,
            options: [
                { value: "1", label: "SUPERUSER" },
                { value: "2", label: "ADMIN" },
                { value: "3", label: "CLIENTE" },
                { value: "4", label: "EMPLEADO" },
            ],
        },
        {
            name: "cliente_observaciones",
            title: "Observaciones",
            placeholder: "Observaciones del Usuario",
            colSize: 12,
            required: false
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
