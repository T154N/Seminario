import { useState, useEffect } from "react";
import "./login.css";
import "../../scss/custom.css";
import { useNavigate } from "react-router";

import { IniciarSesion } from "./IniciarSesion";
import { CambiarContrasena } from "./CambiarContrasena";
import { Registrarse } from "./Registrarse";

import loginService from "../../services/login/login.service";

export function Login() {

    const navigate = useNavigate();

    const [mostrarCambiarPwd, setMostrarCambiarPwd] = useState(false);
    const [mostrarIniciarSesion, setMostrarIniciarSesion] = useState(true);
    const [mostrarRegistrarse, setMostrarRegistrarse] = useState(false);

    const [mostrarAlertaFalloIniciarSesion, setMostrarAlertaFalloIniciarSesion] = useState(false);
    const [sesionYaIniciada, setSesionYaIniciada] = useState(false);

    useEffect(() => {
        if (loginService.estaIniciadaSesion()) {
            setSesionYaIniciada(true);
        }
    }, []);

    const falloIniciarSesion = () => {
        setMostrarAlertaFalloIniciarSesion(true);
    }

    const cerrarSesion = () => {
        loginService.cerrarSesion();
        setSesionYaIniciada(false);
        volverALogin();
    }

    const navegarHaciaCatalogoLogin = () => {
        navigate('/catalogo');
    }

    const mostrarCambiarContrasena = () => {
        setMostrarCambiarPwd(true);
        setMostrarIniciarSesion(false);
        setMostrarRegistrarse(false);
        setMostrarAlertaFalloIniciarSesion(false);
        if (sesionYaIniciada) {
            setSesionYaIniciada(false);
        }
    }

    const volverALogin = () => {
        setMostrarCambiarPwd(false);
        setMostrarIniciarSesion(true);
        setMostrarRegistrarse(false);
        if (loginService.estaIniciadaSesion()) {
            setSesionYaIniciada(true);
        }
    }

    const mostrarReg = () => {
        setMostrarRegistrarse(true);
        setMostrarIniciarSesion(false);
        setMostrarCambiarPwd(false);
        setMostrarAlertaFalloIniciarSesion(false);
        if (sesionYaIniciada) {
            setSesionYaIniciada(false);
        }
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
                                {mostrarAlertaFalloIniciarSesion && <div className="alert alert-danger" role="alert">Fallo el inicio de sesion</div>}
                                <div className="card border-0 shadow" style={{background: "#FCBB3A", borderRadius: "30px"}}>
                                    <div className="card-body text-start px-3">
                                        {sesionYaIniciada && <div className="mt-3 fs-5 text-center alert alert-success" style={{borderRadius: "15px"}}>La sesion esta iniciada</div>}

                                        {mostrarIniciarSesion && !sesionYaIniciada && <IniciarSesion falloIniciarSesion={falloIniciarSesion} navegarHaciaCatalogoLogin={navegarHaciaCatalogoLogin}/>}
                                        {mostrarCambiarPwd && <CambiarContrasena volverALogin={volverALogin}/>}
                                        {mostrarRegistrarse && <Registrarse volverALogin={volverALogin}/>}

                                        {sesionYaIniciada &&
                                            <div className="d-grid">
                                            <button className="btn btn-principal" onClick={cerrarSesion}>Cerrar sesion</button>
                                        </div>}

                                        {!mostrarCambiarPwd && !mostrarRegistrarse &&
                                        <div className="mt-2 text-start fs-6 px-0">
                                            <div className="justify-content-start gap-2 mb-3">
                                                <span>¿No tenés cuenta?</span>
                                                <div className="mt-2">
                                                    <button className="btn btn-principal" onClick={mostrarReg}>Registrate</button>
                                                </div>
                                            </div>
                                        
                                            <div className="justify-content-start gap-2 mb-1">
                                                <span>¿Olvidaste tu contraseña?</span>
                                                <div className="mt-2">
                                                    <button className="btn btn-principal" onClick={mostrarCambiarContrasena}>Recuperar contraseña</button>
                                                </div>
                                            </div>
                                        </div>}

                                        {(mostrarRegistrarse || mostrarCambiarPwd)  &&
                                            <div className="mt-2">
                                                <div>
                                                    <button className="btn btn-principal mb-2" onClick={volverALogin}>Volver</button>
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
