import React from "react";
import {useForm} from "react-hook-form";
import "../../scss/custom.css";

export function Registrarse({volverALogin}) {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset} = useForm();
    
    const onSubmit = async (data) => {
        //TODO: Cambiar todos los campos a uppercase
        console.log(data);
        if (data.password !== data.confirmPassword) {
            alert("Las contraseñas no coinciden.");
            reset({
                password: "",
                confirmPassword: ""
            })
            return;
        }
        volverALogin();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="fs-3 text-center">Registro de cuenta</h1>

            <div className="mt-0 mb-1">
            <label className="form-label fs-4">Introduzca el correo electrónico</label>
                <input className="form-control" id="inputCorreoReg" placeholder="correo@ejemplo.com"
                {...register("correo", {
                    required: "Este campo es requerido.",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Correo inválido. Verifique el formato del correo."
                    },
                })}/>
                <div>
                    {errors.correo && <p className="mt-1 mb-0" style={{color: "darkred"}}>{errors.correo.message}</p>}
                </div>
            </div>

            <div className="mt-1 mb-0">
                <label className="form-label fs-4">Introduzca la contraseña</label>
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
                    {errors.password && <p className="mt-1 mb-0" style={{color: "darkred"}}>{errors.password.message}</p>}
                </div>
            </div>

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
                    {errors.password && <p className="mt-1 mb-0" style={{color: "darkred"}}>{errors.password.message}</p>}
                </div>
            </div>

            <div className="mt-1 mb-3">
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
                    {errors.direccion && <p className="mt-1 mb-0" style={{color: "darkred"}}>{errors.direccion.message}</p>}
                </div>
            </div>

            <div className="d-grid mb-3">
                <button className="btn btn-principal">Registrarse</button>
            </div>

        </form>
    )
}