import React from "react";
import { useForm } from "react-hook-form";
import "./login.css";
import loginService from "../../services/login/login.service";

export function CambiarContrasena({mostrarMsjRecuperarContrasena}) {

    const {
        register,
        handleSubmit,
        formState: {errors}, reset} = useForm();

        const onSubmit = async (data) => {
            mostrarMsjRecuperarContrasena("Por favor, espera mientras se envia el correo de recuperacion...", "espera");
            const response = await loginService.getCorreoRecuperacion(data.correo);
            if (response.code === "ERR_NETWORK" || response === 400 ||response.data.status === 500 || response.data.status === 403) {
                mostrarMsjRecuperarContrasena("Ocurrio un error en el servidor. Intentelo de nuevo mas tarde.", "peligro");
            } else if (response.data.status === 400 && response.data.message) {
                mostrarMsjRecuperarContrasena(response.data.message, "alerta");
            } else if (response.data.status === 200) {
                mostrarMsjRecuperarContrasena("Correo de recuperacion enviado, revise su casilla de correo.", "exitoso");
                reset({
                    correo: ""
                })
            }
        }

 return(
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-0 mb-3">
            <label className="form-label fs-4">Correo electrónico <span style={{color: "darkred"}}>*</span></label>
            <input className="form-control" id="inputCorreo" placeholder="correo@ejemplo.com" maxLength={50}
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
        <div className="d-grid mt-2 mb-3">
            <button className="btn btn-principal">Recuperar contraseña</button>
        </div>
    </form>
 )   
}