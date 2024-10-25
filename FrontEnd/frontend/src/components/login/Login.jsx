import { useState, useEffect } from "react";
import "./login.css";
import "../../scss/custom.css";
import { useNavigate } from "react-router";

import { IniciarSesion } from "./IniciarSesion";
import { CambiarContrasena } from "./CambiarContrasena";
import { Registrarse } from "./Registrarse";
import { MensajesRegistro } from "./MensajesRegistro";
import { MensajesIniciarSesion } from "./MensajesIniciarSesion";

import loginService from "../../services/login/login.service";

export function Login() {

    const navigate = useNavigate();

    const [mostrarCambiarPwd, setMostrarCambiarPwd] = useState(false);
    const [mostrarIniciarSesion, setMostrarIniciarSesion] = useState(true);
    const [mostrarRegistrarse, setMostrarRegistrarse] = useState(false);
    const [titulo, setTitulo] = useState("Iniciar sesión");

    const [sesionYaIniciada, setSesionYaIniciada] = useState(false);
    const [mostrarAlertaRegistro, setMostrarAlertaRegistro] = useState(false);
    const [mostrarAlertaInicioSesion, setMostrarAlertaInicioSesion] = useState(false);
    const [mensajeRegistro, setMensajeRegistro] = useState("");
    const [mensajeInicioSesion, setMensajeInicioSesion] = useState("");
    const [tipoError, setTipoError] = useState(0);

    useEffect(() => {
        if (loginService.estaIniciadaSesion()) {
            setSesionYaIniciada(true);
        }
    }, []);

    const cerrarSesion = () => {
        loginService.cerrarSesion();
        setSesionYaIniciada(false);
        volverALogin();
    }

    const navegarHaciaCatalogoLogin = () => {
        setTimeout(() => {
            navigate('/catalogo');
        }, 4000);
    }

    const mostrarCambiarContrasena = () => {
        setMostrarCambiarPwd(true);
        setMostrarIniciarSesion(false);
        setMostrarRegistrarse(false);
        setMostrarAlertaInicioSesion(false);
        setMostrarAlertaRegistro(false);
        if (sesionYaIniciada) {
            setSesionYaIniciada(false);
        }
        setTitulo("Cambiar contraseña");
    }

    const volverALogin = () => {
        setMostrarCambiarPwd(false);
        setMostrarIniciarSesion(true);
        setMostrarRegistrarse(false);
        setMostrarAlertaRegistro(false);
        if (loginService.estaIniciadaSesion()) {
            setSesionYaIniciada(true);
        }
        setTitulo("Iniciar sesión");
    }

    const mostrarMsjRegistro = (mensaje, tipoError) => {
        setMostrarAlertaInicioSesion(false);
        setMostrarAlertaRegistro(true);
        setMensajeRegistro(mensaje);
        setTipoError(tipoError);
    }

    const mostrarMsjInicioSesion = (mensaje, tipoError) => {
        setMostrarAlertaInicioSesion(true);
        setMostrarAlertaRegistro(false);
        setMensajeInicioSesion(mensaje);
        setTipoError(tipoError);
        if (tipoError === 200) {
            navegarHaciaCatalogoLogin();
        }
    }

    const cerrarAlertaRegistro = () => {
        setMostrarAlertaRegistro(false);
    }

    const cerrarAlertaInicioSesion = () => {
        setMostrarAlertaInicioSesion(false);
    }

    const mostrarReg = () => {
        setMostrarRegistrarse(true);
        setMostrarIniciarSesion(false);
        setMostrarCambiarPwd(false);
        setMostrarAlertaRegistro(false);
        setMostrarAlertaInicioSesion(false);
        if (sesionYaIniciada) {
            setSesionYaIniciada(false);
        }
        setTitulo("Registro de cuenta");
    }
    return(
        <>
            <div className="">
                <div className="container">
                    <div className="row">
                        <div className="col"/>
                            <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-6">
                                <div className="">
                                    <h1 className="fs-1">{titulo}</h1>
                                    {mostrarAlertaRegistro && <MensajesRegistro mensaje={mensajeRegistro} tipoError={tipoError} onClose={cerrarAlertaRegistro}/>}
                                    {mostrarAlertaInicioSesion && <MensajesIniciarSesion mensaje={mensajeInicioSesion} tipoError={tipoError} onClose={cerrarAlertaInicioSesion}/>}
                                    <div className="card border-0 shadow" style={{background: "#FCBB3A", borderRadius: "30px"}}>
                                        <div className="card-body text-start px-3">
                                            {sesionYaIniciada && <div className="alert alert-success mt-3 fs-5 text-center" style={{borderRadius: "10px"}}>La sesion esta iniciada</div>}
        
                                            {/* Solo mostrar iniciar sesión si la sesión no está iniciada */}
                                            {mostrarIniciarSesion && !sesionYaIniciada && <IniciarSesion mostrarMsjInicioSesion={mostrarMsjInicioSesion}/>}
        
                                            {/* Solo mostrar cambiar contraseña si la sesión no está iniciada */}
                                            {mostrarCambiarPwd && !sesionYaIniciada && <CambiarContrasena volverALogin={volverALogin}/>}
        
                                            {/* Solo mostrar registrarse si la sesión no está iniciada */}
                                            {mostrarRegistrarse && !sesionYaIniciada && <Registrarse mostrarMsjRegistro={mostrarMsjRegistro}/>}
        
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
