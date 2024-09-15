import {useState} from "react";
import './login.css';

import {CambiarContrasena} from "./CambiarContrasena";
import {IniciarSesion} from "./IniciarSesion";
import {Registrarse} from "./Registrarse";

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
        <div className="login">
            <h1 className="h1">Iniciar Sesion</h1>
            <div className="card">
                <div className="card-body fondoTarjeta">
                    {mostrarIniciarSesion &&
                        <IniciarSesion/>
                    }
                    {mostrarCambiarPwd &&
                        <CambiarContrasena volverALogin={volverALogin}/>
                    }
                    {mostrarRegistrarse &&
                        <Registrarse/>
                    }

                    {!mostrarRegistrarse && !mostrarCambiarPwd &&
                        <div className="elementosForm">
                        <div className="botonRegistrarseForm">
                            <button className="btn btn-aceptar" onClick={mostrarReg}>No tienes cuenta?</button>
                        </div>
                        <p className="cambiarContrasena" onClick={mostrarCambiarContrasena}>
                            {!mostrarCambiarPwd && "Cambiar contraseña"}
                        </p>
                    </div>}

                    {
                        (mostrarRegistrarse || mostrarCambiarPwd) && 
                        <div className="elementosForm">
                            <div className="botonRegistrarseForm">
                                <button className="btn btn-aceptar" onClick={volverALogin}>Volver</button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
