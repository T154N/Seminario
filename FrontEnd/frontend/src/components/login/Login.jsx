import {useForm} from "react-hook-form";
import React from "react-hook-form";
import {useState} from "react";
import './login.css';
import {CambiarContrasena} from "./CambiarContrasena";
import {IniciarSesion} from "./IniciarSesion";

export function Login() {

    const {
        register,
        handleSubmit,
        formState: {errors}} = useForm();

    const [mostrarCambiarPwd, setMostrarCambiarPwd] = useState(false);
    const [mostrarIniciarSesion, setMostrarIniciarSesion] = useState(true);

    const onSubmit = async (data) => {
        //Aca va axios
        console.log(data);
    }

    const mostrarCambiarContrasena = () => {
        setMostrarCambiarPwd(!mostrarCambiarPwd);
        setMostrarIniciarSesion(!mostrarIniciarSesion);
    }

    return(
        <div className="login">
            <h1 className="h1">Iniciar Sesion</h1>
            <div className="card">
                <div className="card-body fondoTarjeta">
                    {mostrarIniciarSesion &&
                        <IniciarSesion/>
                    }
                    {mostrarCambiarPwd &&
                        <CambiarContrasena/>
                    }

                    <div className="elementosForm">
                        <p className="cambiarContrasena" onClick={mostrarCambiarContrasena}>Cambiar contraseña</p>
                    </div>

                </div>
            </div>
        </div>
    )
}