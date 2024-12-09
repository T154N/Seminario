import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import clienteService from "../../../services/cliente/cliente.service";
import {ModificarDatos} from "./ModificarDatos";
import {MensajesLogin} from "../../Mensajes/Mensajes";

export function MiCuenta() {
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [datosUsuario, setDatosUsuario] = useState({});

    const [mensajeMiCuenta, setMensajeMiCuenta] = useState("");
    const [tipoError, setTipoError] = useState("");
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const getDatosCliente = async () => {
            const datosCliente = await clienteService.getClienteById(localStorage.getItem('clienteId'));
            setDatosUsuario(datosCliente);
            setLoading(false);
        };
        getDatosCliente();
    }, [datosUsuario]);

    const mostrarMsjMiCuenta = (mensaje, tipoError) => {
        setMensajeMiCuenta(mensaje);
        setTipoError(tipoError);
        setMostrarMensaje(true);
    };

    const cerrarAlertaMiCuenta = () => {
        setMostrarMensaje(false);
    };

    if (!isLoggedIn) {
        return null;
    }

    if (loading) {
        return <div className="fs-3">Cargando tus datos...</div>
    }

    return (
        <>
            <div className="">
                <div className="container">
                    <div className="row">
                        <div className="col" />
                        <div className="col-sm-12 col-md-10 col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-6">
                            <div className="">
                                <h1 className="fs-1">Perfil</h1>
                                {/* Aca van los mensajes */}
                                {mostrarMensaje && <MensajesLogin mensaje={mensajeMiCuenta} tipoError={tipoError} onClose={cerrarAlertaMiCuenta}/>}

                                <div className="card border-0 shadow mt-3"
                                    style={{ background: "#FCBB3A", borderRadius: "30px" }}>
                                    <div className="card-body text-start px-3">

                                        <ModificarDatos datosUsuario={datosUsuario} mostrarMsjMiCuenta={mostrarMsjMiCuenta}/>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col" />
                    </div>
                </div>
            </div>
        </>
    );
}