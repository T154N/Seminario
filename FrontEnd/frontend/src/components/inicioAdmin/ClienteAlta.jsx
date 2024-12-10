//545

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';

import clienteService from "../../services/cliente/cliente.service";
import ConfirmModal from "./ConfirmModal";

const ClienteAlta = ({ onSave, onCancel }) => {
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
        usuario_rol_id: 1, // Constante
        usuario_observaciones: 'USUARIO',
        usuario_alta: "CLIENTE", // Constante
    });

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                            required
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="cliente_tipo_documento">Tipo de Documento</label>
                        <select
                            className="form-control"
                            name="cliente_tipo_documento"
                            id="cliente_tipo_documento"
                            value={formData.cliente_tipo_documento}
                            onChange={handleChange}
                            required
                        >
                            <option value="DNI">DNI</option>
                            <option value="Pasaporte">Pasaporte</option>
                            <option value="Cédula">Cédula</option>
                        </select>
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
                        />
                    </div>
                </div>

                {/* Dirección */}
                <div className="form-group mb-3">
                    <label htmlFor="domicilioDireccion">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        name="domicilioDireccion"
                        id="domicilioDireccion"
                        value={formData.domicilioDireccion}
                        onChange={handleChange}
                    />
                    <label htmlFor="domicilioBarrio">Barrio</label>
                    <input
                        type="text"
                        className="form-control"
                        name="domicilioBarrio"
                        id="domicilioBarrio"
                        value={formData.domicilioBarrio}
                        onChange={handleChange}
                    />



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
