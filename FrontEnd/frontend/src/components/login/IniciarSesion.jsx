import React from "react";
import {useForm} from "react-hook-form";

export function IniciarSesion() {

    const {
        register,
        handleSubmit,
        formState: {errors}} = useForm();
    
    const onSubmit = async (data) => {
        console.log(data);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-0 mb-1">
                <label className="form-label fs-4">Nombre de usuario</label>
                <input className="form-control" id="inputNombreUsuario" placeholder="Nombre de usuario"
                {...register("nombre", {
                    required: "Este campo es requerido.",
                    pattern: {
                        value: /^[A-Za-z\s'-]+$/,
                        message: "Nombre invalido. El nombre solo deben ser letras mayusculas o minusculas."
                    },
                    minLength: {
                        value: 3,
                        message: "El nombre debe tener al menos 3 caracteres."
                    },
                })}/>
                <div>
                    {errors.nombre && <p className="mt-1 mb-0" style={{color: "darkred"}}>{errors.nombre.message}</p>}
                </div>
            </div>
            <div className="mt-2 mb-3">
                <label className="form-label fs-4">Contraseña</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Contraseña"{...register("password", {
                           required: "Este campo es requerido.",
                           minLength: {
                               value: 6,
                               message: "La contrasena debe tener al menos 6 caracteres."
                           },
                           maxLength: {
                               value: 20,
                               message: "La contrasena debe tener como maximo de 20 caracteres."
                           }
                       })}/>
                <div>
                    {errors.password && <p className="mt-1 mb-0" style={{color: "darkred"}}>{errors.password.message}</p>}
                </div>
            </div>
            <div className="d-grid">
                <button className="btn btn-aceptar">Iniciar sesion</button>
            </div>
        </form>
    )

}