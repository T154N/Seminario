import { useState } from "react";
import "./login.css";

import { IniciarSesion } from "./IniciarSesion";

export function Login() {

    const [mostrarCambiarPwd, setMostrarCambiarPwd] = useState(false);
    const [mostrarIniciarSesion, setMostrarIniciarSesion] = useState(true);
    const [mostrarRegistrarse, setMostrarRegistrarse] = useState(false);

    const mostrarCambiarContrasena = () => {
        setMostrarCambiarPwd(true);
        setMostrarIniciarSesion(false);
        setMostrarRegistrarse(false);
    }

    const volverALogin = () => {
        setMostrarCambiarPwd(false);
        setMostrarIniciarSesion(true);
        setMostrarRegistrarse(false);
    }

    const mostrarReg = () => {
        setMostrarRegistrarse(true);
        setMostrarIniciarSesion(false);
        setMostrarCambiarPwd(false);
    }
        // TODO: Cambiar tamano de las columnas segun el tamano de la pantalla (con breakpoints)
    return(

        <>
            <div className="fondo vh-100">
                <div className="container">
                    <div className="row">
                        <div className="col-3"/>
                        <div className="col-6">
                            <div className="">
                                <h1 className="fs-1">Iniciar sesion</h1>
                                <div className="card shadow" style={{background: "#FCBB3A", borderRadius: "30px"}}>
                                    <div className="card-body text-start">
                                        {mostrarIniciarSesion && <IniciarSesion/>}

                                        {!mostrarCambiarPwd && !mostrarRegistrarse &&
                                        <div className="mt-2 text-start fs-6">
                                            <div className="d-flex justify-content-start gap-2">
                                                <span>No tienes cuenta?</span>
                                                <p style={{color: "darkblue", cursor: "pointer", textDecoration: "underline"}}
                                                onClick={mostrarReg}>Registrarse</p>
                                            </div>

                                            <div className="d-flex justify-content-start gap-2">
                                                <span className="d-flex justify-content-start">Olvidaste tu contraseña?</span>
                                                <p style={{color: "darkblue", cursor: "pointer", textDecoration: "underline"}} 
                                                onClick={mostrarCambiarContrasena}>Recuperar contraseña</p>
                                            </div>
                                        </div>}

                                        {(mostrarRegistrarse || mostrarCambiarPwd)  &&
                                            <div className="mt-2">
                                                <div>
                                                    <button className="btn btn-aceptar" onClick={volverALogin}>Volver</button>
                                                </div>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3"/>
                    </div>
                </div>
            </div>
        </>
    )
}
