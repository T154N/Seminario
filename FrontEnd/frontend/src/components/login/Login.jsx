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
        setTimeout(() => {
            navigate('/catalogo');
        }, 1000);
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
        
                                            {/* Solo mostrar iniciar sesión si la sesión no está iniciada */}
                                            {mostrarIniciarSesion && !sesionYaIniciada && <IniciarSesion falloIniciarSesion={falloIniciarSesion} navegarHaciaCatalogoLogin={navegarHaciaCatalogoLogin}/>}
        
                                            {/* Solo mostrar cambiar contraseña si la sesión no está iniciada */}
                                            {mostrarCambiarPwd && !sesionYaIniciada && <CambiarContrasena volverALogin={volverALogin}/>}
        
                                            {/* Solo mostrar registrarse si la sesión no está iniciada */}
                                            {mostrarRegistrarse && !sesionYaIniciada && <Registrarse volverALogin={volverALogin}/>}
        
                                            {/* Mostrar botón de cerrar sesión si la sesión está iniciada */}
                                            {sesionYaIniciada &&
                                                <div className="d-grid">
                                                    <button className="btn btn-principal" onClick={cerrarSesion}>Cerrar sesión</button>
                                                </div>
                                            }
        
                                            {/* Solo mostrar opciones de registro y recuperación de contraseña si la sesión no está iniciada */}
                                            {!sesionYaIniciada && !mostrarCambiarPwd && !mostrarRegistrarse &&
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
        
                                            {/* Botón para volver al login si se muestra registrarse o cambiar contraseña */}
                                            {(mostrarRegistrarse || mostrarCambiarPwd) &&
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
