import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import './login.css'
import loginService from "../../services/login/login.service";
import { MensajesLogin } from "../Mensajes/Mensajes";
import { useState } from "react";

export function ResetPassword() {

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [tipoError, setTipoError] = useState("");

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            reset({
                password: "",
                confirmPassword: ""
            })
            return;
        }
        const response = await loginService.confirmarResetPassword(token, data.password);
        console.log(response);
        if (response.code && response.code === "ERR_NETWORK") {
            setMensaje("Ocurrio un error en el servidor. Intentelo de nuevo mas tarde.");
            setTipoError("peligro");
            setMostrarMensaje(true);
        } else if (response && response === 400) {
            setMensaje("Ocurrio un error en el servidor. Intentelo de nuevo mas tarde.");
            setTipoError("peligro");
            setMostrarMensaje(true);
        } else if (response.data.status && (response.data.status === 500 || response.data.status === 403)) {
            setMensaje("Ocurrio un error en el servidor. Intentelo de nuevo mas tarde.");
            setTipoError("peligro");
            setMostrarMensaje(true);
        } else if (response.data.status === 400) {
            setMensaje(response.data.message);
            setTipoError("alerta");
            setMostrarMensaje(true);
        } else if (response.data.status === 200) {
            setMensaje("Contraseña cambiada exitosamente, volviendo a login...");
            setTipoError("exitoso");
            setMostrarMensaje(true);
            setTimeout(() => {
                navigate('/login');
            }, 4000);
        }
        
    }

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-6">
                        <div>
                            <h1 className="fs-1">Cambio de contraseña</h1>
                            {mostrarMensaje && <MensajesLogin mensaje={mensaje} tipoError={tipoError} onClose={() => setMostrarMensaje(false)}/>}
                            <div className="card border-0 shadow" style={{background: "#FCBB3A", borderRadius: "30px"}}>
                                <div className="card-body text-start px-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="container text-start pt-0">
                                            <div className="row">
                                                <div className="col-12 p-0">
                                                    <div className="mt-1 mb-0 pe-0">
                                                        <label htmlFor="password" className="form-label fs-4">Nueva contraseña  <span style={{color: "darkred"}}>*</span></label>
                                                        <input 
                                                        type="password" 
                                                        className="form-control" 
                                                        id="passwordCh"
                                                        placeholder="Contraseña" 
                                                        maxLength={20}
                                                        {...register("password", {
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
                                                        {errors.password && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.password.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 p-0">
                                                    <div className="mt-1 mb-0 pe-0">
                                                        <label htmlFor="confirmPassword" className="form-label fs-4">Confirmar nueva contraseña <span style={{color: "darkred"}}>*</span></label>
                                                        <input 
                                                        type="password" 
                                                        className="form-control" 
                                                        id="confirmPasswordCh" 
                                                        placeholder="Confirmar contraseña"
                                                        maxLength={20}
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
                                                        {errors.confirmPassword && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.confirmPassword.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 p-0">
                                                    <div className="d-grid mt-3 mb-0">
                                                        <button className="btn btn-principal">Confirmar cambio de contraseña</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )
}