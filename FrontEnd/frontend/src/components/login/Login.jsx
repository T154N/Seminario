import {useForm} from "react-hook-form";
import React from "react-hook-form";
import {useState, useEffect} from "react";
import './login.css';

export function Login() {

    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    }

    return(
        <div className="login">
            <h1 className="h1">Iniciar Sesion</h1>
            <div className="card">
                <div className="card-body fondoTarjeta">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3 elementosForm">
                            <label className="form-label tituloForm">Nombre de usuario</label>
                            <input type="email"
                                   className="form-control textoForm"
                                   id="inputNombreUsuario"
                                   aria-describedby="emailHelp"
                                   placeholder="Nombre de usuario"
                                   {...register("email")}/>
                        </div>

                        <div className="mb-3 elementosForm">
                            <label className="form-label tituloForm">Contraseña</label>
                            <input type="password"
                                   className="form-control textoForm"
                                   id="inputPassword"
                                   placeholder="Contraseña"
                                   {...register("password")}/>
                            <div id="passwordHelpBlock" className="form-text">
                                La contrasena debe ser entre 8 y 20 caracteres.
                            </div>
                        </div>

                            <div className="button-container">
                                <div className="botonRegistrarseForm">
                                    <button className="btn btn-aceptar" type="submit">Registrarse</button>
                                </div>

                                <div className="botonAceptarForm">
                                    <button className="btn btn-aceptar" type="submit">Aceptar</button>
                                </div>
                            </div>
                    </form>

                </div>
            </div>
        </div>
    )
}