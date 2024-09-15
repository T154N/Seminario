import {useForm} from "react-hook-form";
import './login.css';

export function CambiarContrasena({volverALogin}) {

    const {
        register,
        handleSubmit,
        formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        // Aquí va el código de axios
        console.log(data);

        // Volver a la pantalla de inicio de sesión
        volverALogin();
    }

    return (
        <>
            <h2 style={{textAlign: "center", fontSize: "30px"}} className="tituloForm">Cambiando contraseña</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 elementosForm">
                    <label className="form-label tituloForm">Introduzca el usuario</label>
                    <input className="form-control textoForm" id="cambiarPwdUsuario"
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
                           })}>
                    </input>
                    <div>
                        {errors.nombre && <p className="errorInput">{errors.nombre.message}</p>}
                    </div>
                </div>

                <div className="mb-3 elementosForm">
                    <label className="form-label tituloForm">Introduzca la nueva contraseña</label>
                    <input type="password"
                           className="form-control textoForm"
                           id="inputPassword"
                           placeholder="Contraseña"
                           {...register("password", {
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
                        {errors.password && <p className="errorInput">{errors.password.message}</p>}
                    </div>
                </div>

                <div className="button-container mb-3">
                    <div className="botonRegistrarseForm">
                        <button className="btn btn-aceptar" type="submit">Aceptar</button>
                    </div>
                </div>
            </form>
        </>
    )
}
