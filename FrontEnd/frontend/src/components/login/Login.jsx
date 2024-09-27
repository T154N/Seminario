import { useState } from "react";
import "./login.css";

import { IniciarSesion } from "./IniciarSesion";
import { CambiarContrasena } from "./CambiarContrasena";
import { Registrarse } from "./Registrarse";

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
    return(

        <>
            <div className=" ">
                <div className="container">
                    <div className="row">
                        <div className="col"/>
                        <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-6">
                            <div className="">
                                <h1 className="fs-1">Iniciar sesión</h1>
                                <div className="card shadow" style={{background: "#FCBB3A", borderRadius: "30px"}}>
                                    <div className="card-body text-start">

                                        {mostrarIniciarSesion && <IniciarSesion/>}
                                        {mostrarCambiarPwd && <CambiarContrasena volverALogin={volverALogin}/>}
                                        {mostrarRegistrarse && <Registrarse volverALogin={volverALogin}/>}

                                        {!mostrarCambiarPwd && !mostrarRegistrarse &&
                                        <div className="mt-2 text-start fs-6">
                                            <div className="d-flex justify-content-start gap-2">
                                                <span>¿No tenés cuenta?</span>
                                                <p style={{color: "darkblue", cursor: "pointer", textDecoration: "underline"}}
                                                onClick={mostrarReg}>Registrate</p>
                                            </div>

                                            <div className="d-flex justify-content-start gap-2">
                                                <span className="d-flex justify-content-start">¿Olvidaste la contraseña?</span>
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
                        <div className="col"/>
                    </div>
                </div>
            </div>
        </>
    )
}
