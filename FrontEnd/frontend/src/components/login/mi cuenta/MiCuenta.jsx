import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../UserContext";
import clienteService from "../../../services/cliente/cliente.service";
import domicilioService from "../../../services/domicilio/domicilio.service";
import { ModificarDatos } from "./ModificarDatos";
import { DomiciliosPerfil } from "./DomiciliosPerfil";
import { MensajesLogin } from "../../Mensajes/Mensajes";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPlus, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

export function MiCuenta() {
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [datosUsuario, setDatosUsuario] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Mensajes
    const [mensajeMiCuenta, setMensajeMiCuenta] = useState("");
    const [tipoError, setTipoError] = useState("");
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    // Domicilios
    const [mostrarDomicilios, setMostrarDomicilios] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const getDatosCliente = async () => {
        const datosCliente = await clienteService.getClienteById(localStorage.getItem('clienteId'));
        setDatosUsuario(datosCliente);
        setLoading(false);
    };

    useEffect(() => {
        getDatosCliente();
    }, []);

    const mostrarMsjMiCuenta = (mensaje, tipoError) => {
        setMensajeMiCuenta(mensaje);
        setTipoError(tipoError);
        setMostrarMensaje(true);
    };

    const cerrarAlertaMiCuenta = () => {
        setMostrarMensaje(false);
    };

    const changeMostrarDomicilios = () => {
        setMostrarDomicilios(!mostrarDomicilios);
    };

    const handleAddDomicilio = async (data) => {
        setIsLoading(true);
        const response = await domicilioService.agregarDomicilio(data.tipoDomicilio, data.direccion);
        if (response.code && response.code === "ERR_NETWORK") {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response && response === 400) {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response.data.status && response.data.status === 500) {
            mostrarMsjMiCuenta("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response.data.status && response.data.status === 200) {
            mostrarMsjMiCuenta("Domicilio agregado correctamente.", "exitoso");
            reset(); // Clear the form fields
        }
        setIsLoading(false);
        setShowAddModal(false);
        getDatosCliente(); // Update user data
    };

    if (!isLoggedIn) {
        return null;
    }

    if (loading) {
        return <div className="fs-3">Cargando tus datos...</div>
    }

    return (
        <>
            <div className="">
                <div className="container">
                    <div className="row">
                        <div className="col" />
                        <div className="col-sm-12 col-md-10 col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-6">
                            <div className="">
                                <h1 className="fs-1">Perfil</h1>
                                {/* Aca van los mensajes */}
                                {mostrarMensaje && <MensajesLogin mensaje={mensajeMiCuenta} tipoError={tipoError} onClose={cerrarAlertaMiCuenta}/>}

                                <div className="card border-0 shadow mt-3"
                                    style={{ background: "#FCBB3A", borderRadius: "30px" }}>
                                    <div className="card-body text-start px-3">

                                        <ModificarDatos datosUsuario={datosUsuario}
                                                        mostrarMsjMiCuenta={mostrarMsjMiCuenta}/>

                                        <div className="d-grid mb-3">
                                            <button type="button" className="btn btn-principal" onClick={changeMostrarDomicilios}>
                                                {mostrarDomicilios ? (
                                                    <>
                                                        <FontAwesomeIcon icon={faEye} />
                                                        <span className="ps-1">Ocultar mis Domicilios</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon icon={faEyeSlash} />
                                                        <span className="ps-1">Mostrar mis Domicilios</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {mostrarDomicilios && (
                                            <>
                                                <DomiciliosPerfil datosUsuario={datosUsuario}
                                                                  onDomicilioChange={getDatosCliente}
                                                                  mostrarMsjMiCuenta={mostrarMsjMiCuenta}/>
                                                <div className="d-grid mb-3">
                                                    <button type="button" className="btn btn-principal" onClick={() => setShowAddModal(true)} disabled={isLoading}>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                        <span className="ps-1">Agregar Domicilio</span>
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col"/>
                    </div>
                </div>
            </div>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} className="custom-modal">
                <div style={{ border: "2px solid #ffbb33", borderRadius: "5px" }}>
                    <Modal.Header closeButton style={{backgroundColor: "#fff8e1"}}>
                        <Modal.Title>Agregar Dirección</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pb-0 rounded-3" style={{backgroundColor: "#fff8e1"}}>
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
                            <Form.Group controlId="formPrincipalDomiclio" className="mb-3">
                                <Form.Label className="fs-5">¿El domicilio será principal?</Form.Label>
                                <Form.Select
                                    {...register("esPrincipal", {
                                        required: "Si el domicilio es principal o no es obligatorio",
                                    })}
                                    defaultValue={" "}
                                >
                                    <option value="Y">SÍ</option>
                                    <option value=" ">NO</option>
                                </Form.Select>
                                {errors.esPrincipal && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.esPrincipal.message}</p>}
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => setShowAddModal(false)}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                    <span className="ps-1">Cerrar</span>
                                </Button>
                                <Button variant="principal" type="submit" disabled={isLoading}>
                                    <FontAwesomeIcon icon={faSave} />
                                    <span className="ps-1">Agregar Domicilio</span>
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
}