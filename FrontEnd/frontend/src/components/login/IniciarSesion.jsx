import React, { useState } from "react";
import "../../scss/custom.css";
import { useForm } from "react-hook-form";
import loginService from "../../services/login/login.service";
import { useCarrito } from '../carrito/CarritoContext';

export function IniciarSesion({ mostrarMsjInicioSesion }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [mostrandoMensaje, setMostrandoMensaje] = useState(false);
    const { agregarProducto } = useCarrito();

    const onSubmit = async (data) => {
        await iniciarSesion(data.correo, data.password);
    }

    const iniciarSesion = async (email, password) => {

        setMostrandoMensaje(true);
        mostrarMsjInicioSesion("Iniciando sesión, por favor espere...", "info");

        const response = await loginService.iniciarSesion(email, password, agregarProducto);

        setMostrandoMensaje(false);

        if (response.code && response.code === "ERR_NETWORK") {
            mostrarMsjInicioSesion("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response && response === 400) {
            mostrarMsjInicioSesion("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response.data.status && response.data.status === 500) {
            mostrarMsjInicioSesion("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response.data.status && response.data.status === 403) {
            mostrarMsjInicioSesion("Ocurrió un error en el servidor. Inténtelo de nuevo más tarde.", "peligro");
        } else if (response.data.status === 400 && response.data.message) {
            reset({
                correo: "",
                password: ""
            });
            mostrarMsjInicioSesion(response.data.message, "alerta");
        } else if (response.data.status === 200) {
            if (["CLIENTE"].includes(localStorage.getItem("rol"))) {
                mostrarMsjInicioSesion("Sesión iniciada exitosamente. Redirigiendo al catálogo...", "exitoso");
            } else if (["ADMIN", "SUPERUSER", "EMPLEADO"].includes(localStorage.getItem("rol"))) {
                mostrarMsjInicioSesion("Sesión iniciada exitosamente. Redirigiendo al panel de administración...", "exitoso");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-0 mb-1">
                <label className="form-label fs-4">Correo electrónico <span style={{ color: "darkred" }}>*</span></label>
                <input className="form-control" id="inputCorreo" placeholder="correo@ejemplo.com"
                    {...register("correo", {
                        required: "Este campo es requerido.",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Correo inválido. Verifique el formato del correo."
                        },
                    })} />
                <div>
                    {errors.correo && <p className="mt-1 mb-0 fs-6" style={{ color: "darkred" }}>{errors.correo.message}</p>}
                </div>
            </div>
            <div className="mt-2 mb-3">
                <label className="form-label fs-4">Contraseña <span style={{ color: "darkred" }}>*</span></label>
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
                    })} />
                <div>
                    {errors.password && <p className="mt-1 mb-0 fs-6" style={{ color: "darkred" }}>{errors.password.message}</p>}
                </div>
            </div>

            <div className="d-grid">
                <button className="btn btn-principal" disabled={mostrandoMensaje}>Iniciar Sesión</button>
            </div>
        </form>
    );
}