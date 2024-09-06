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
            <div className="mb-3 elementosForm">
                <label className="form-label tituloForm">Nombre de usuario</label>
                <input className="form-control textoForm" id="inputNombreUsuario"
                       placeholder="Nombre de usuario"
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
                    {errors.nombre && <p className="errorInput">{errors.nombre.message}</p>}
                </div>
            </div>

            <div className="mb-3 elementosForm">
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

            <div className="button-container">
                <div className="botonRegistrarseForm">
                    <button className="btn btn-aceptar" type="submit">Crear cuenta</button>
                </div>

                <div className="botonAceptarForm">
                    <button className="btn btn-aceptar" type="submit">Iniciar sesion</button>
                </div>
            </div>

        </form>
    );
}