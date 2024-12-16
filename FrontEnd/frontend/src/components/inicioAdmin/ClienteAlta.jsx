//545

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import './clienteAlta.css';

import clienteService from "../../services/cliente/cliente.service";
import ConfirmModal from "./ConfirmModal";

const ClienteAlta = ({ onSave, onCancel, clientesActivos = [] }) => {
    const [formData, setFormData] = useState({
        cliente_documento: '',
        cliente_tipo_documento: 'DNI',
        cliente_cuit: '',
        cliente_apellido: '',
        cliente_nombre: '',
        cliente_email: '',
        cliente_telefono: '',
        cliente_observaciones: '',
        domicilioTipoDomicilioId: '1',
        domicilioDireccion: '',
        domicilioBarrio: '',
        domicilioUbicacion: '0.0,0.0',
        domicilioLocalidadId: '545',
        domicilioCodigoPostal: '5000',
        domicilioEsPrincipal: 'Y',
        usuario_contrasena: "CRv7ZHhHp1ZYlZNDycNF9Q==", // Constante
        usuario_rol_id: 3, // Constante
        usuario_observaciones: 'USUARIO',
        usuario_alta: "CLIENTE", // Constante
    });

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validar si es CUIT para formatearlo
        if (name === "cliente_cuit") {
            // Filtrar solo números
            const numericValue = value.replace(/\D/g, "");
            // Aplicar formato CUIT (nn-nnnnnnnn-n)
            const formattedCuit = numericValue
                .replace(/^(\d{2})(\d{0,8})(\d{0,1}).*/, (match, p1, p2, p3) => {
                    let result = p1;
                    if (p2) result += `-${p2}`;
                    if (p3) result += `-${p3}`;
                    return result;
                })
                .slice(0, 13); // Limitar a 13 caracteres formateados
            setFormData({
                ...formData,
                [name]: formattedCuit,
            });
            return;
        }

        // Validar si es documento y permitir solo números
        if (name === "cliente_documento") {
            const numericValue = value.replace(/\D/g, ""); // Filtrar solo números
            setFormData({
                ...formData,
                [name]: numericValue,
            });
            return;
        }

        // Para otros campos, continuar con la lógica estándar
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar formato de CUIT
        const cuitRegex = /^\d{2}-\d{8}-\d{1}$/;
        if (!cuitRegex.test(formData.cliente_cuit) && formData.cliente_cuit) {
            alert("El CUIT debe tener el formato nn-nnnnnnnn-n.");
            return;
        }

        // Validar duplicados como antes
        const emailDuplicado = clientesActivos.some(
            (cliente) => cliente.email === formData.cliente_email
        );
        const documentoDuplicado = clientesActivos.some(
            (cliente) => cliente.documento === formData.cliente_documento
        );

        if (emailDuplicado) {
            alert("Ya existe un cliente registrado con este correo electrónico.");
            return;
        }

        if (documentoDuplicado) {
            alert("Ya existe un cliente registrado con este número de documento.");
            return;
        }

        // Mostrar el modal si no hay errores
        setShowModal(true);
    };



    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await clienteService.createClienteConUsuarioYDomicilios(formData);
            setShowModal(false);
            if (onSave) {
                onSave();
            }
        } catch (error) {
            console.error("Error al guardar cliente:", error);
            alert("Hubo un error al registrar el cliente. Por favor, intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        setShowModal(false);
    };

    return (
        <div>
            <h2>Registrar Cliente</h2>
            <form onSubmit={handleSubmit}>
                {/* Nombre y Apellido */}
                <div className="row mb-3 mt-4">
                    <div className="form-group col-md-6">
                        <label htmlFor="cliente_nombre">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cliente_nombre"
                            id="cliente_nombre"
                            value={formData.cliente_nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="cliente_apellido">Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cliente_apellido"
                            id="cliente_apellido"
                            value={formData.cliente_apellido}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Documento, Tipo de Documento, CUIT */}
                <div className="row mb-3">
                    <div className="form-group col-md-4">
                        <label htmlFor="cliente_documento">Documento</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cliente_documento"
                            id="cliente_documento"
                            value={formData.cliente_documento}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) e.preventDefault(); // Evitar caracteres no numéricos
                            }}
                            required
                        />

                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="cliente_tipo_documento">Tipo de Documento</label>
                        <div className="custom-select-wrapper">
                            <select
                                className="form-control"
                                name="cliente_tipo_documento"
                                id="cliente_tipo_documento"
                                value={formData.cliente_tipo_documento}
                                onChange={handleChange}
                            >
                                <option value="DNI">DNI</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Cédula">Cédula</option>
                            </select>
                            <FontAwesomeIcon icon="caret-down" className="custom-select-icon" />
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="cliente_cuit">CUIT</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cliente_cuit"
                            id="cliente_cuit"
                            value={formData.cliente_cuit}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) e.preventDefault(); // Evitar caracteres no numéricos
                            }}
                            pattern="\d{2}-\d{8}-\d{1}" // Validar formato final del CUIT
                            title="El CUIT debe tener el formato nn-nnnnnnnn-n"
                        />


                    </div>
                </div>

                {/* Teléfono y Email */}
                <div className="row mb-3">
                    <div className="form-group col-md-6">
                        <label htmlFor="cliente_telefono">Teléfono</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cliente_telefono"
                            id="cliente_telefono"
                            value={formData.cliente_telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="cliente_email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="cliente_email"
                            id="cliente_email"
                            value={formData.cliente_email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Tipo de Domicilio y Dirección */}
                <div className="form-group mb-3">
                    <label htmlFor="domicilioTipoDomicilioId">Tipo de Domicilio</label>
                    <select
                        className="form-control"
                        name="domicilioTipoDomicilioId"
                        id="domicilioTipoDomicilioId"
                        value={formData.domicilioTipoDomicilioId}
                        onChange={handleChange}
                        required
                    >
                        <option value="1">CASA</option>
                        <option value="2">LOCAL COMERCIAL</option>
                        <option value="3">DEPÓSITO</option>
                    </select>
                    <label htmlFor="domicilioDireccion" className="mt-3">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        name="domicilioDireccion"
                        id="domicilioDireccion"
                        value={formData.domicilioDireccion}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Código Postal y Barrio */}
                <div className="row mb-3">
                    <div className="form-group col-md-3">
                        <label htmlFor="domicilioCodigoPostal">Código Postal</label>
                        <input
                            type="text"
                            className="form-control"
                            name="domicilioCodigoPostal"
                            id="domicilioCodigoPostal"
                            value={formData.domicilioCodigoPostal}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="domicilioBarrio">Barrio</label>
                        <input
                            type="text"
                            className="form-control"
                            name="domicilioBarrio"
                            id="domicilioBarrio"
                            value={formData.domicilioBarrio}
                            onChange={handleChange}
                            required
                        />
                    </div>

                                    {/* Rol de Usuario */}
                <div className="form-group col-md-3">
                    <label htmlFor="usuario_rol_id">Rol</label>
                    <select
                        className="form-control"
                        name="usuario_rol_id"
                        id="usuario_rol_id"
                        value={formData.usuario_rol_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="1">SUPERUSER</option>
                        <option value="2">ADMIN</option>
                        <option value="3">CLIENTE</option>
                        <option value="4">EMPLEADO</option>
                    </select>
                </div>
                </div>

                {/* Observaciones */}
                <div className="form-group mb-3">
                    <label htmlFor="cliente_observaciones">Observaciones</label>
                    <textarea
                        className="form-control"
                        name="cliente_observaciones"
                        id="cliente_observaciones"
                        value={formData.cliente_observaciones}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                {/* Botones */}
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-danger" onClick={handleCancel}>
                        <FontAwesomeIcon icon={faTimes} /> Cancelar
                    </button>
                    <button type="submit" className="btn btn-success" disabled={isLoading}>
                        <FontAwesomeIcon icon={faSave} /> {isLoading ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </form>

            {/* Confirmación */}
            <ConfirmModal
                show={showModal}
                onHide={handleCancel}
                onConfirm={handleConfirm}
                message="¿Estás seguro de que deseas registrar al cliente?"
            />
        </div>
    );
};

export default ClienteAlta;
