import { useContext, useState, useEffect } from "react";
import "./login.css";
import "../../scss/custom.css";
import { useNavigate } from "react-router";
import { IniciarSesion } from "./IniciarSesion";
import { CambiarContrasena } from "./CambiarContrasena";
import { Registrarse } from "./Registrarse";
import { MensajesLogin } from "../Mensajes/Mensajes";
import loginService from "../../services/login/login.service";
import { UserContext } from "./UserContext";

export function Login() {
    const navigate = useNavigate();
    const { login, logout } = useContext(UserContext);

    const [mostrarCambiarPwd, setMostrarCambiarPwd] = useState(false);
    const [mostrarIniciarSesion, setMostrarIniciarSesion] = useState(true);
    const [mostrarRegistrarse, setMostrarRegistrarse] = useState(false);
    const [titulo, setTitulo] = useState("Iniciar Sesión");
    const [sesionYaIniciada, setSesionYaIniciada] = useState(false);
    const [mostrarAlertaRegistro, setMostrarAlertaRegistro] = useState(false);
    const [mensajeRegistro, setMensajeRegistro] = useState("");
    const [mostrarAlertaInicioSesion, setMostrarAlertaInicioSesion] = useState(false);
    const [mensajeInicioSesion, setMensajeInicioSesion] = useState("");
    const [mostrarAlertaRecuperarContrasena, setMostrarAlertaRecuperarContrasena] = useState(false);
    const [mensajeRecuperarContrasena, setMensajeRecuperarContrasena] = useState("");
    const [tipoError, setTipoError] = useState("");

    useEffect(() => {
        if (loginService.estaIniciadaSesion()) {
            setSesionYaIniciada(true);
        }
    }, []);

    const cerrarSesion = () => {
        loginService.cerrarSesion();
        setSesionYaIniciada(false);
        logout();
        volverALogin();
    }

    const navegarHaciaCatalogoLogin = () => {
        setTimeout(() => {
            navigate('/catalogo');
        }, 3000);
    }

    const navegarHaciaLogin = () => {
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    const navegarHaciaInicioAdmin = () => {
        setTimeout(() => {
            navigate('/inicioAdmin');
        }, 3000);
    };

    const mostrarCambiarContrasena = () => {
        setMostrarCambiarPwd(true);
        setMostrarIniciarSesion(false);
        setMostrarRegistrarse(false);
        setMostrarAlertaInicioSesion(false);
        setMostrarAlertaRegistro(false);
        setMostrarAlertaRecuperarContrasena(false);
        if (sesionYaIniciada) {
            setSesionYaIniciada(false);
        }
        setTitulo("Cambiar contraseña");
    }

    const mostrarReg = () => {
        setMostrarRegistrarse(true);
        setMostrarIniciarSesion(false);
        setMostrarCambiarPwd(false);
        setMostrarAlertaRegistro(false);
        setMostrarAlertaInicioSesion(false);
        setMostrarAlertaRecuperarContrasena(false);
        if (sesionYaIniciada) {
            setSesionYaIniciada(false);
        }
        setTitulo("Registro de cuenta");
    }

    const volverALogin = () => {
        setMostrarCambiarPwd(false);
        setMostrarIniciarSesion(true);
        setMostrarRegistrarse(false);
        setMostrarAlertaRegistro(false);
        setMostrarAlertaInicioSesion(false);
        setMostrarAlertaRecuperarContrasena(false);
        if (loginService.estaIniciadaSesion()) {
            setSesionYaIniciada(true);
        }
        setTitulo("Iniciar Sesión");
    }

    const mostrarMsjRegistro = (mensaje, tipoError) => {
        setMostrarAlertaInicioSesion(false);
        setMostrarAlertaRegistro(true);
        setMostrarAlertaRecuperarContrasena(false);
        setMensajeRegistro(mensaje);
        setTipoError(tipoError);
        if (tipoError === "exitoso") {
            navegarHaciaLogin();
        }
    }

    const mostrarMsjInicioSesion = (mensaje, tipoError) => {
        setMostrarAlertaInicioSesion(true);
        setMostrarAlertaRegistro(false);
        setMostrarAlertaRecuperarContrasena(false);
        setMensajeInicioSesion(mensaje);
        setTipoError(tipoError);
        if (tipoError === "exitoso" && localStorage.getItem("rol") === "CLIENTE") {
            login();
            navegarHaciaCatalogoLogin();
    } else if (tipoError === "exitoso" && ["ADMIN", "SUPERUSER", "EMPLEADO"].includes(localStorage.getItem("rol"))) {
        login();
        navegarHaciaInicioAdmin();
}
    }

    const mostrarMsjRecuperarContrasena = (mensaje, tipoError) => {
        setMostrarAlertaInicioSesion(false);
        setMostrarAlertaRegistro(false);
        setMostrarAlertaRecuperarContrasena(true);
        setMensajeRecuperarContrasena(mensaje);
        setTipoError(tipoError);
    };

    const cerrarAlertaRegistro = () => {
        setMostrarAlertaRegistro(false);
    }

    const cerrarAlertaInicioSesion = () => {
        setMostrarAlertaInicioSesion(false);
    }

    const cerrarAlertaRecuperarContrasena = () => {
        setMostrarAlertaRecuperarContrasena(false);
    }

    const onRegistroExitoso = () => {
        setTimeout(() => {
            setMostrarIniciarSesion(true);
            setMostrarAlertaRegistro(false);
            setMostrarRegistrarse(false);
        }, 3000);
    };

    return (
        <>
            <div className="">
                <div className="container">
                    <div className="row">
                        <div className="col"/>
                            <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-6">
                                <div className="">
                                    <h1 className="fs-1">{titulo}</h1>
                                    {mostrarAlertaRegistro && <MensajesLogin mensaje={mensajeRegistro} tipoError={tipoError} onClose={cerrarAlertaRegistro}/>}
                                    {mostrarAlertaInicioSesion && <MensajesLogin mensaje={mensajeInicioSesion} tipoError={tipoError} onClose={cerrarAlertaInicioSesion}/>}
                                    {mostrarAlertaRecuperarContrasena && <MensajesLogin mensaje={mensajeRecuperarContrasena} tipoError={tipoError} onClose={cerrarAlertaRecuperarContrasena}/>}
                                    <div className="card border-0 shadow mt-3" style={{background: "#FCBB3A", borderRadius: "30px"}}>
                                        <div className="card-body text-start px-3">
                                            {sesionYaIniciada && <div className="alert alert-success mt-3 fs-5 text-center" style={{borderRadius: "10px"}}>La sesión está iniciada</div>}

                                            {/* Solo mostrar iniciar sesión si la sesión no está iniciada */}
                                            {mostrarIniciarSesion && !sesionYaIniciada && <IniciarSesion mostrarMsjInicioSesion={mostrarMsjInicioSesion}/>}

                                            {/* Solo mostrar cambiar contraseña si la sesión no está iniciada */}
                                            {mostrarCambiarPwd && !sesionYaIniciada && <CambiarContrasena mostrarMsjRecuperarContrasena={mostrarMsjRecuperarContrasena}/>}

                                            {/* Solo mostrar registrarse si la sesión no está iniciada */}
                                            {mostrarRegistrarse && !sesionYaIniciada && <Registrarse mostrarMsjRegistro={mostrarMsjRegistro} onRegistroExitoso={onRegistroExitoso}/>}

                                            {/* Mostrar botón de cerrar sesión si la sesión está iniciada */}
                                            {sesionYaIniciada &&
                                                <div className="d-grid mt-2">
                                                    <button className="btn btn-principal mb-2" onClick={cerrarSesion}>Cerrar Sesión</button>
                                                </div>
                                            }

                                            {/* Solo mostrar opciones de registro y recuperación de contraseña si la sesión no está iniciada */}
                                            {!sesionYaIniciada && !mostrarCambiarPwd && !mostrarRegistrarse &&
                                            <div className="mt-2 text-start fs-6 px-0">
                                                <div className="justify-content-start gap-2 mb-3">
                                                    <span>¿No tenés cuenta?</span>
                                                    <div className="mt-2">
                                                        <button className="btn btn-principal" onClick={mostrarReg}>Regístrate</button>
                                                    </div>
                                                </div>

                                                <div className="justify-content-start gap-2 mb-1">
                                                    <span>¿Olvidaste tu contraseña?</span>
                                                    <div className="mt-2">
                                                        <button className="btn btn-principal" onClick={mostrarCambiarContrasena}>Recuperar Contraseña</button>
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