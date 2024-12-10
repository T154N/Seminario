import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import loginService from '../../services/login/login.service';
import ConfirmModal from './ConfirmModal';
import './inicioAdmin.css';

function ModalNuevoCliente({ show, handleClose, handleSave }) {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        correo: '',
        password: '',
        direccion: '',
        idTipoDireccion: '',
        observaciones: ''
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const handleConfirm = async () => {
        const response = await loginService.crearCuentaClienteAdmin(
            formData.nombre,
            formData.apellido,
            formData.dni,
            formData.telefono,
            formData.correo,
            formData.password,
            formData.direccion,
            formData.idTipoDireccion,
            formData.observaciones
        );
        if (response !== 400) {
            handleSave(formData);
            handleClose();
        } else {
            console.error("Error creating account");
        }
        setShowConfirmModal(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="notification-font contenido-notificaicon tab-content-area">
                    <Modal.Title>Crear Nuevo Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body className="notification-font tab-content-area">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formApellido">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDni">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formTelefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCorreo">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDireccion">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formIdTipoDireccion">
                            <Form.Label>Tipo de Domicilio</Form.Label>
                            <Form.Control
                                as="select"
                                name="idTipoDireccion"
                                value={formData.idTipoDireccion}
                                onChange={handleChange}
                                required
                            >
                                <option value="1">CASA</option>
                                <option value="2">LOCAL COMERCIAL</option>
                                <option value="3">DEPÓSITO</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formObservaciones">
                            <Form.Label>Observaciones</Form.Label>
                            <Form.Control
                                type="text"
                                name="observaciones"
                                value={formData.observaciones}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Guardar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <ConfirmModal
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onConfirm={handleConfirm}
                message="¿Estás seguro de que deseas crear este cliente?"
            />
        </>
    );
}

export default ModalNuevoCliente;