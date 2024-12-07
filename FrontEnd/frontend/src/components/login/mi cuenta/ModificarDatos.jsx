import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import usuariosService from "../../../services/usuarios/usuario.service";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ModificarDatos({ datosUsuario }) {
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        reset(datosUsuario);
    }, [datosUsuario, reset]);

    const onSubmit = async (data) => {
        console.log("Datos a modificar: ",data);
        const response = await usuariosService.modificarDatosUsuario(
            localStorage.getItem('usuarioId'),
            data.dni,
            data.nombre,
            data.apellido,
            data.telefono,
            data.email,
        );
        console.log(response);
        setIsEditing(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container text-start">
                    <div className="row p-0">
                        <div className="col-12 col-sm-6 p-0">
                            <div className="mt-1 mb-0 pe-2">
                                <label className="form-label fs-4">Nombre</label>
                                <input
                                    className="form-control"
                                    id="inputNombre"
                                    placeholder="Nombre"
                                    maxLength={30}
                                    disabled={!isEditing}
                                    {...register("nombre", {
                                        required: "Este campo es requerido.",
                                        minLength: {
                                            value: 2,
                                            message: "El nombre debe tener al menos 2 caracteres."
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "El nombre debe tener como máximo 30 caracteres."
                                        }
                                    })}
                                />
                                <div>
                                    {errors.nombre && <p className="mt-1 mb-0 fs-6" style={{ color: "darkred" }}>{errors.nombre.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 p-0">
                            <div className="mt-1 mb-0">
                                <label className="form-label fs-4">Apellido</label>
                                <input
                                    className="form-control"
                                    id="inputApellido"
                                    placeholder="Apellido"
                                    maxLength={30}
                                    disabled={!isEditing}
                                    {...register("apellido", {
                                        required: "Este campo es requerido.",
                                        minLength: {
                                            value: 2,
                                            message: "El apellido debe tener al menos 2 caracteres."
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "El apellido debe tener como máximo 30 caracteres."
                                        }
                                    })}
                                />
                                <div>
                                    {errors.apellido && <p className="mt-1 mb-0 fs-6" style={{ color: "darkred" }}>{errors.apellido.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-6 p-0">
                            <div className="mt-1 mb-0 pe-2">
                                <label className="form-label fs-4">DNI</label>
                                <input
                                    className="form-control"
                                    id="inputdni"
                                    placeholder="Documento"
                                    maxLength={8}
                                    disabled={!isEditing}
                                    {...register("dni", {
                                        required: "Este campo es requerido.",
                                        minLength: {
                                            value: 7,
                                            message: "El DNI debe tener al menos 7 caracteres."
                                        },
                                        maxLength: {
                                            value: 8,
                                            message: "El DNI debe tener como máximo 8 caracteres."
                                        }
                                    })}
                                />
                                <div>
                                    {errors.dni && <p className="mt-1 mb-0 fs-6" style={{ color: "darkred" }}>{errors.dni.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 p-0">
                            <div className="mt-1 mb-1">
                                <label className="form-label fs-4">Teléfono</label>
                                <input
                                    className="form-control"
                                    id="inputTelefono"
                                    placeholder="Teléfono fijo o celular"
                                    maxLength={10}
                                    disabled={!isEditing}
                                    {...register("telefono", {
                                        required: "Este campo es requerido.",
                                        minLength: {
                                            value: 7,
                                            message: "El teléfono debe tener al menos 7 caracteres."
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "El teléfono debe tener como máximo 10 caracteres."
                                        }
                                    })}
                                />
                                <div>
                                    {errors.telefono && <p className="mt-1 mb-0 fs-6" style={{ color: "darkred" }}>{errors.telefono.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="mt-0 mb-1">
                                <label className="form-label fs-4">Correo electrónico</label>
                                <input
                                    className="form-control"
                                    id="inputCorreoReg"
                                    placeholder="correo@ejemplo.com"
                                    maxLength={50}
                                    disabled={!isEditing}
                                    {...register("email", {
                                        required: "Este campo es requerido.",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Correo inválido. Verifique el formato del correo."
                                        }
                                    })}
                                />
                                <div>
                                    {errors.email && <p className="mt-1 mb-0 fs-6" style={{ color: "darkred" }}>{errors.email.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-grid mb-3">
                    {!isEditing &&
                        <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        <FontAwesomeIcon icon={faEdit}/>
                        <span className="ps-1">Modificar Datos</span>
                    </button>
                    }
                    {isEditing &&
                        <button
                            type="submit"
                            className="btn btn-principal"
                        >
                            <FontAwesomeIcon icon={faSave}/>
                            <span className="ps-1">Guardar Cambios</span>
                        </button>
                    }
                </div>
            </form>
        </>
    );
}