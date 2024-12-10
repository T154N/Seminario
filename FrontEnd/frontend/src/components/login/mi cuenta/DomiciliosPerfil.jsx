import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import { faTrash, faEdit, faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import './domiciliosPerfil.css';
import domicilioService from "../../../services/domicilio/domicilio.service";

export function DomiciliosPerfil({ datosUsuario, onDomicilioChange, mostrarMsjMiCuenta }) {
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedDomicilio, setSelectedDomicilio] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleEditClick = (domicilio) => {
        setSelectedDomicilio(domicilio);
        setShowModal(true);
    };

    const handleDeleteClick = async (domicilioId) => {
        const response = await domicilioService.eliminarDomicilio(domicilioId);
        if (response.code && response.code === "ERR_NETWORK") {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response && response === 400) {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response.data.status && response.data.status === 500) {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response.data.status && response.data.status === 200) {
            mostrarMsjMiCuenta("Domicilio eliminado correctamente.", "exitoso");
            onDomicilioChange(); // Update user data
        }
    };

    useEffect(() => {
        if (selectedDomicilio) {
            reset({
                direccion: selectedDomicilio.domicilioDireccion,
                tipoDomicilio: selectedDomicilio.domicilioTipoDomicilioId.tipo_domicilio_id
            });
        }
    }, [selectedDomicilio, reset]);

    const handleSaveChanges = async (data) => {
        const response = await domicilioService.modificarDomicilio(selectedDomicilio.domicilio_id, data.tipoDomicilio, data.direccion);
        if (response.code && response.code === "ERR_NETWORK") {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response && response === 400) {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response.data.status && response.data.status === 500) {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response.data.status && response.data.status === 200) {
            mostrarMsjMiCuenta("Datos actualizados correctamente.", "exitoso");
        }
        setShowModal(false);
        onDomicilioChange(); // Update user data
    };

    const handleAddDomicilio = async (data) => {
        const response = await domicilioService.agregarDomicilio(data.tipoDomicilio, data.direccion);
        if (response.code && response.code === "ERR_NETWORK") {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response && response === 400) {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response.data.status && response.data.status === 500) {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response.data.status && response.data.status === 200) {
            mostrarMsjMiCuenta("Domicilio agregado correctamente.", "exitoso");
        }
        setShowAddModal(false);
        onDomicilioChange(); // Update user data
    };

    return (
        <div className="card mb-3" >
            <div className="card-body py-0">
                <div className="d-grid mb-3">
                </div>
                <table className="table table-striped table-responsive">
                    <thead>
                        <tr className="fs-5">
                            <th scope="col" className="col-6 col-sm-9 col-md-8">Dirección</th>
                            <th scope="col" className="col-6 col-sm-3 col-md-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosUsuario.domicilio.map((domicilio, index) => (
                            <tr key={index}>
                                <td className="fs-6">{domicilio.domicilioDireccion}</td>
                                <td>
                                    <button className="btn btn-warning me-1" onClick={() => handleEditClick(domicilio)}>
                                        <FontAwesomeIcon icon={faEdit} style={{ color: "white" }} />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteClick(domicilio.domicilio_id)} disabled={datosUsuario.domicilio.length === 1}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal">
                <div style={{ border: "2px solid #ffbb33", borderRadius: "5px" }}>
                    <Modal.Header closeButton style={{backgroundColor: "#fff8e1"}}>
                        <Modal.Title>Editar Dirección</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pb-0 rounded-3" style={{backgroundColor: "#fff8e1"}}>
                        <Form onSubmit={handleSubmit(handleSaveChanges)}>
                            <Form.Group controlId="formAddress">
                                <Form.Label className="fs-5">Dirección</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("direccion", {
                                        required: "La dirección es obligatoria",
                                        minLength: {
                                            value: 3,
                                            message: "La dirección debe tener al menos 3 caracteres."
                                        },
                                    })}
                                />
                                {errors.direccion && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.direccion.message}</p>}
                            </Form.Group>
                            <Form.Group controlId="formTipoDomicilio" className="mb-3">
                                <Form.Label className="fs-5">Tipo de Domicilio</Form.Label>
                                <Form.Select
                                    {...register("tipoDomicilio", {
                                        required: "El tipo de domicilio es obligatorio",
                                    })}
                                >
                                    <option value="1">CASA</option>
                                    <option value="2">LOCAL COMERCIAL</option>
                                    <option value="3">DEPÓSITO</option>
                                </Form.Select>
                                {errors.tipoDomicilio && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.tipoDomicilio.message}</p>}
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowModal(false)}>
                                    Cerrar
                                </Button>
                                <Button variant="principal" type="submit">
                                    <FontAwesomeIcon icon={faSave} />
                                    <span className="ps-1">Guardar Cambios</span>
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </div>
            </Modal>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Dirección</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleAddDomicilio)}>
                        <Form.Group controlId="formAddress">
                            <Form.Label className="fs-5">Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("direccion", {
                                    required: "La dirección es obligatoria",
                                    minLength: {
                                        value: 3,
                                        message: "La dirección debe tener al menos 3 caracteres."
                                    },
                                })}
                            />
                            {errors.direccion && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.direccion.message}</p>}
                        </Form.Group>
                        <Form.Group controlId="formTipoDomicilio" className="mb-3">
                            <Form.Label className="fs-5">Tipo de Domicilio</Form.Label>
                            <Form.Select
                                {...register("tipoDomicilio", {
                                    required: "El tipo de domicilio es obligatorio",
                                })}
                            >
                                <option value="1">CASA</option>
                                <option value="2">LOCAL COMERCIAL</option>
                                <option value="3">DEPÓSITO</option>
                            </Form.Select>
                            {errors.tipoDomicilio && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.tipoDomicilio.message}</p>}
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                                Cerrar
                            </Button>
                            <Button variant="principal" type="submit">
                                <FontAwesomeIcon icon={faSave} />
                                <span className="ps-1">Agregar Domicilio</span>
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}