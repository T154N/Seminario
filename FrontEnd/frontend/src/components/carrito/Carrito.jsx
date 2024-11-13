import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './carrito.css';
import { useCarrito } from './CarritoContext';
import { useNavigate } from 'react-router-dom';
import loginService from "../../services/login/login.service";
import {useState} from "react";
import {MensajesLogin} from "../Mensajes/Mensajes";

export function Carrito() {
    const { productos, incrementarCantidad, disminuirCantidad, eliminarDelCarrito, generarPedido, vaciarCarrito, total } = useCarrito();
    const navigate = useNavigate();

    const [mostrarAlerta, setmostrarAlerta] = useState(false);
    const [mensajeRegistro, setMensajeRegistro] = useState("");
    const [tipoError, setTipoError] = useState("");

    const cerrarAlerta = () => {
        setmostrarAlerta(false);
    }

    const handleGenerarPedido = () => {
        const toggleButton = document.getElementById('toggleOffcanvasButton');

        if (productos.length > 0) {
            if (!loginService.estaIniciadaSesion()) {
                setmostrarAlerta(true);
                setMensajeRegistro("Debes iniciar sesión para realizar el pedido.");
                setTipoError("alerta")
            } else {
                generarPedido(navigate);
                toggleButton.click()
            }
        } else {
            setmostrarAlerta(true);
            setMensajeRegistro("No hay productos en el carrito.");
            setTipoError("alerta")
        }
};

    return (
        <div>
            <div className="offcanvas offcanvas-end custom-offcanvas-width"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabIndex="-1"
                id="offcanvasScrolling"
                aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
                        Carrito de Compras
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                {mostrarAlerta && <MensajesLogin mensaje={mensajeRegistro}
                                                 tipoError={tipoError} onClose={cerrarAlerta} bordeRedondeado={true}/>}

                <div className="offcanvas-body carrito-body" style={{backgroundColor: "#fff8e1", paddingBottom: "100px"}}>
                    {productos.length === 0 ? (
                        <p className="mensaje-carrito-vacio">No hay productos en el carrito</p>
                    ) : (
                        productos.map((producto) => (
                            <div className="card producto-card" key={producto.id}>
                                <div className="row g-0">
                                    <div className="col-12 col-md-3">
                                        <img src={producto.imagen} className="img-fluid rounded-start"
                                             alt={producto.nombre}/>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="card-body">
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <div className="cantidad-control d-flex align-items-center">
                                                <button className="btn btn-outline-secondary" onClick={() => disminuirCantidad(producto.id)}>-</button>
                                                <span className="mx-2">{producto.cantidad}</span>
                                                <button className="btn btn-outline-secondary" onClick={() => incrementarCantidad(producto.id)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3 d-flex flex-column justify-content-between">
                                        <div className="text-start producto-precios">
                                            <p className="mb-1">
                                                Precio unitario:
                                                <span className="d-block">${producto.precioUnitario.toFixed(2)}</span>
                                            </p>
                                            <p className="mb-1">
                                                Precio total:
                                                <span className="d-block">${(producto.precioUnitario * producto.cantidad).toFixed(2)}</span>
                                            </p>
                                        </div>
                                        <button className="btn btn-eliminar mt-3" onClick={() => eliminarDelCarrito(producto.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="carrito-footer">
                    <h5>Total: ${total}</h5>
                    <button className="btn btn-primary md-2" onClick={handleGenerarPedido}>Iniciar Compra</button>
                    <button className="btn btn-danger btn-vaciar md-2" onClick={vaciarCarrito}>Vaciar Carrito</button>
                </div>
            </div>
        </div>
    );
}