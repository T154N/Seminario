import React from "react";
import { useForm } from "react-hook-form";
import "./login.css";

export function CambiarContrasena({volverALogin}) {

    const {
        register,
        handleSubmit,
        formState: {errors}} = useForm();

        const onSubmit = async (data) => {
            //TODO: Cambiar todos los campos a uppercase
            console.log(data);
            volverALogin();
        }

 return(
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="fs-3 text-center">Recuperando contraseña</h1>
        <div className="mt-0 mb-3">
            <label className="form-label fs-4">Introduzca el correo electrónico</label>
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
        <div className="d-grid mt-2 mb-3">
            <button className="btn btn-principal">Recuperar contraseña</button>
        </div>
    </form>
 )   
}