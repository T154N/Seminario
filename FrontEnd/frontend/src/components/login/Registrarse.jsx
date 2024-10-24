import React from "react";
import {useForm} from "react-hook-form";
import "../../scss/custom.css";
import loginService from "../../services/login/login.service";

import { useState, useEffect } from "react";

export function Registrarse({volverALogin}) {

    const [datosRegistro, setDatosRegistro] = useState([]);
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset} = useForm();

    useEffect(() => {
        const getDatosRegistro = async () => {
            const response = await loginService.getDatosParaRegistro();
            setDatosRegistro(response);
            setLoading(false);
        }
        getDatosRegistro();
    }, []);
    
    const onSubmit = async (data) => {
        console.log(data);
        if (data.password !== data.confirmPassword) {
            alert("Las contraseñas no coinciden.");
            reset({
                password: "",
                confirmPassword: ""
            })
            return;
        }
        const response = await loginService.crearCuenta(
            data.nombre,
            data.apellido,
            data.dni,
            data.telefono,
            data.correo,
            data.password,
            data.direccion,
            data.idTipoDireccion,
            data.observaciones,
            datosRegistro.roles[0].id
        );
        console.log(response);
        if (response.status === 409) {
            return "Ya existe un usuario con ese correo o documento.";
        } else if (response.status === 400 || response === 400) {
            return "Ocurrio un error al registrar el usuario. Intentelo nuevamente."
        } else if (response.status === 200) {
            return "Usuario registrado exitosamente.";
        } else if (response.status === 500) {
            return "Ocurrio un error en el servidor. Intentelo nuevamente."
        }
    }

    if (loading) {
        return <div className='fs-3'>Cargando datos para el registro...</div>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container text-start">
            <div className="row p-0">
                    <div className="col-6 p-0">
                        <div className="mt-1 mb-0 pe-2">
                            <label className="form-label fs-4">Nombre</label>
                            <input
                                   className="form-control"
                                   id="inputNombre"
                                   placeholder="Nombre"
                                   {...register("nombre", {
                                       required: "Este campo es requerido.",
                                       minLength: {
                                           value: 2,
                                           message: "El nombre debe tener al menos 2 caracteres."
                                       },
                                       maxLength: {
                                           value: 30,
                                           message: "La contraseña debe tener como maximo de 30 caracteres."
                                       }
                                   })}/>
                            <div>
                                {errors.nombre && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.nombre.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="col-6 p-0">
                        <div className="mt-1 mb-0">
                            <label className="form-label fs-4">Apellido</label>
                            <input
                                   className="form-control"
                                   id="inputApellido"
                                   placeholder="Apellido"
                                   {...register("apellido", {
                                       required: "Este campo es requerido.",
                                       minLength: {
                                           value: 2,
                                           message: "El apellido debe tener al menos 2 caracteres."
                                       },
                                       maxLength: {
                                           value: 30,
                                           message: "El apellido debe tener como maximo de 30 caracteres."
                                       }
                                   })}/>
                            <div>
                                {errors.apellido && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.apellido.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col-6 p-0">
                        <div className="mt-1 mb-0 pe-2">
                            <label className="form-label fs-4">DNI</label>
                            <input
                                   className="form-control"
                                   id="inputdni"
                                   placeholder="Documento"
                                   maxLength={8}
                                   {...register("dni", {
                                       required: "Este campo es requerido.",
                                       minLength: {
                                           value: 7,
                                           message: "El DNI debe tener al menos 7 caracteres."
                                       },
                                       maxLength: {
                                           value: 8,
                                           message: "El DNI debe tener como maximo de 8 caracteres."
                                       }
                                   })}/>
                            <div>
                                {errors.dni && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.dni.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="col-6 p-0">
                        <div className="mt-1 mb-1">
                            <label className="form-label fs-4">Telefono</label>
                            <input
                                   className="form-control"
                                   id="inputTelefono"
                                   placeholder="Telefono fijo o celular"
                                   {...register("telefono", {
                                       required: "Este campo es requerido.",
                                       minLength: {
                                           value: 7,
                                           message: "El telefono debe tener al menos 7 caracteres."
                                       },
                                       maxLength: {
                                           value: 10,
                                           message: "El telefono debe tener como maximo de 10 caracteres."
                                       }
                                   })}/>
                            <div>
                                {errors.telefono && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.telefono.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="mt-0 mb-1">
                        <label className="form-label fs-4">Correo electrónico</label>
                            <input className="form-control" id="inputCorreoReg" placeholder="correo@ejemplo.com"
                            {...register("correo", {
                                required: "Este campo es requerido.",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Correo inválido. Verifique el formato del correo."
                                },
                            })}/>
                            <div>
                                {errors.correo && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.correo.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="mt-1 mb-0">
                            <label className="form-label fs-4">Contraseña</label>
                            <input type="password" id="inputPasswordReg" className="form-control" placeholder="Contraseña"{...register("password", {
                                       required: "Este campo es requerido.",
                                       minLength: {
                                           value: 6,
                                           message: "La contraseña debe tener al menos 6 caracteres."
                                       },
                                       maxLength: {
                                           value: 20,
                                           message: "La contraseña debe tener como máximo 20 caracteres."
                                       }
                                   })}/>
                            <div>
                                {errors.password && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.password.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="mt-1 mb-0">
                            <label className="form-label fs-4">Confirmar contraseña</label>
                            <input type="password"
                                   className="form-control"
                                   id="inputPasswordRegConf"
                                   placeholder="Confirmar contraseña"
                                   {...register("confirmPassword", {
                                       required: "Este campo es requerido.",
                                       minLength: {
                                           value: 6,
                                           message: "La contraseña debe tener al menos 6 caracteres."
                                       },
                                       maxLength: {
                                           value: 20,
                                           message: "La contraseña debe tener como maximo de 20 caracteres."
                                       }
                                   })}/>
                            <div>
                                {errors.password && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.password.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 p-0">
                        <div className="mt-1 mb-0 pe-2">
                            <label className="form-label fs-4">Dirección de entrega</label>
                            <input className="form-control"
                                   id="inputDireccion"
                                   placeholder="Dirección de entrega"
                                   {...register("direccion", {
                                       required: "Este campo es requerido.",
                                       pattern: {
                                           value: /^[A-Za-z0-9\s]+$/,
                                           message: "Dirección inválida. La direccion puede tener letras y números."
                                       },
                                       minLength: {
                                           value: 3,
                                           message: "La dirección debe tener al menos 3 caracteres."
                                       },
                                   })}/>
                            <div>
                                {errors.direccion && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.direccion.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="col-6 p-0">
                        <div className="mt-1 mb-0">
                            <label className="form-label fs-4">Tipo de domicilio</label>
                            <select
                                id="inputTipoDomicilio"
                                className={`form-select ${errors.tipoDomicilio ? 'is-invalid' : ''}`}
                                {...register("tipoDomicilio", {
                                    validate: (value) => {
                                        if (value === "Seleccione el tipo de domicilio") {
                                            return "Seleccione un tipo de domicilio de los disponibles.";
                                        }
                                        return true;
                                    }
                                })}>
                                <option>Seleccione el tipo de domicilio</option>
                                {datosRegistro !== null
                                    ? datosRegistro.tipoDomicilios.map(c => (
                                        <option key={c.id} value={c.id}>{c.nombre}</option>
                                    ))
                                    : <option></option>}
                            </select>
                            {errors.tipoDomicilio && (<div className="invalid-feedback mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.tipoDomicilio.message}</div>)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 p-0">
                    <div className="mt-1 mb-1">
                            <label className="form-label fs-4">Observaciones de domicilio</label>
                            <input
                                   className="form-control"
                                   id="inputObservacionesDomicilio"
                                   placeholder="Observaciones"
                                   {...register("observaciones")}/>
                            <div>
                                {errors.observaciones && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.observaciones.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-grid mb-3">
                <button className="btn btn-principal">Registrarse</button>
            </div>

        </form>
    )
}