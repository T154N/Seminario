import React from "react";
import "../../scss/custom.css";
import {useForm} from "react-hook-form";

import loginService from "../../services/login/login.service";

export function IniciarSesion({mostrarMsjInicioSesion}) {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset} = useForm();
    
    const onSubmit = async (data) => {
        iniciarSesion(data.correo, data.password);
    }

    const iniciarSesion = async (email, password) => {
        const response = await loginService.iniciarSesion(email, password);
        if (response.code === "ERR_NETWORK" || response === 400 ||response.data.status === 500 || response.data.status === 403) {
            mostrarMsjInicioSesion("Ocurrio un error en el servidor. Intentelo de nuevo mas tarde.", "peligro");
        } else if (response.data.status === 400 && response.data.message) {
            reset({
                correo: "", 
                password: ""
            })
            mostrarMsjInicioSesion(response.data.message, "alerta");
        } else if (response.data.status === 200) {
            mostrarMsjInicioSesion("Sesion iniciada exitosamente. Redirigiendo al catalogo...", "exitoso");
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-0 mb-1">
                <label className="form-label fs-4">Correo electrónico <span style={{color: "darkred"}}>*</span></label>
                <input className="form-control" id="inputCorreo" placeholder="correo@ejemplo.com"
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
            <div className="mt-2 mb-3">
                <label className="form-label fs-4">Contraseña <span style={{color: "darkred"}}>*</span></label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Contraseña"
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
                <div>
                    {errors.password && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.password.message}</p>}
                </div>
            </div>

            <div className="d-grid">
                <button className="btn btn-principal">Iniciar sesión</button>
            </div>
        </form>
    )

}