import {useForm} from "react-hook-form";
import React from "react-hook-form";
import './login.css';

export function IniciarSesion() {

    const {
        register,
        handleSubmit,
        formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        //Aca va axios
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="elementosForm">
                <label className="form-label">Correo electronico</label>
                <input className="form-control" id="inputNombreUsuario"
                       placeholder="Correo electronico"
                       {...register("correo", {
                           required: "Este campo es requerido.",
                           pattern: {
                               value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                               message: "Correo invalido. Verifique el formato del correo."
                           },
                       })}/>
                <div>
                    {errors.correo && <p className="errorInput">{errors.correo.message}</p>}
                </div>
            </div>

            <div className="elementosForm">
                <label className="form-label tituloForm">Contraseña</label>
                <input type="password"
                       className="form-control textoForm"
                       id="inputPassword"
                       placeholder="Contraseña"
                       {...register("password", {
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
                    {errors.password && <p className="errorInput">{errors.password.message}</p>}
                </div>
            </div>

            <div className="d-flex">
                    <div className="botonAceptarForm">
                        <button className="btn btn-aceptar" type="submit">Iniciar sesion</button>
                    </div>
            </div>

        </form>
    );
}