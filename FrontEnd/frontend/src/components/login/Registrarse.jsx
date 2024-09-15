import {useForm} from "react-hook-form";
import React from "react-hook-form";
import './login.css';

export function Registrarse() {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset} = useForm();

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

            <div className="mb-3 elementosForm">
                <label className="form-label tituloForm">Confirmar Contraseña</label>
                <input type="password"
                       className="form-control textoForm"
                       id="inputPassword"
                       placeholder="Confirmar contraseña"
                       {...register("confirmPassword", {
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

            <div className="mb-3 elementosForm">
                <label className="form-label tituloForm">Dirección de entrega</label>
                <input className="form-control textoForm"
                       id="inputDireccion"
                       placeholder="Direccion"
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
                    {errors.direccion && <p className="errorInput">{errors.direccion.message}</p>}
                </div>
            </div>


            <div className="mb-3 elementosForm">
                <label className="form-label tituloForm">Teléfono</label>
                <input className="form-control textoForm"
                       id="inputTelefono"
                       placeholder="Teléfono"
                       {...register("telefono", {
                           required: "Este campo es requerido.",
                           pattern: {
                               value: /^[0-9]+$/,
                               message: "Teléfono inválido. El teléfono debe tener sólo números."
                           },
                           maxLength: {
                               value: 10,
                               message: "El teléfono debe tener 10 números."
                           },
                       })}/>
                <div>
                    {errors.telefono && <p className="errorInput">{errors.telefono.message}</p>}
                </div>
            </div>

            <div className="button-container">
                <div className="botonRegistrarseForm">
                    <button className="btn btn-aceptar" type="submit">Crear cuenta</button>
                </div>
            </div>

        </form>
    );
}