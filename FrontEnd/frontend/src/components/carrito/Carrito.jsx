// Carrito.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './carrito.css';
import { useCarrito } from './CarritoContext';
import carrito from '../../images/Header Icons/carrito.png';

export function Carrito() {
    const { productos, incrementarCantidad, disminuirCantidad, eliminarProducto, generarPedido, vaciarCarrito, total } = useCarrito();

    return (
        <div>
            <button className='icon-button'
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling">
                <img src={carrito} alt="Carrito" className="carrito" />
            </button>

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

                <div className="offcanvas-body carrito-body">
                    {productos.length === 0 ? (
                        <p className="mensaje-carrito-vacio">No hay productos en el carrito</p>
                    ) : (
                        productos.map((producto) => (
                            <div className="card producto-card" key={producto.id}>
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img src={producto.imagen} className="img-fluid rounded-start" alt={producto.nombre} />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <div className="cantidad-control">
                                                <button className="btn btn-outline-secondary" onClick={() => disminuirCantidad(producto.id)}>-</button>
                                                <span className="mx-2">{producto.cantidad}</span>
                                                <button className="btn btn-outline-secondary" onClick={() => incrementarCantidad(producto.id)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 d-flex align-items-center justify-content-end flex-column">
                                        <button className="btn btn-danger mt-3" onClick={() => eliminarProducto(producto.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <div className="text-start mt-5">
                                            <p className="mb-3">Precio unitario: ${producto.precioUnitario}</p>
                                            <p className="mb-3">Precio total: ${producto.precioUnitario * producto.cantidad}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="carrito-footer">
                    <h5>Total: ${total}</h5>
                    <button className="btn btn-primary" onClick={generarPedido}>Iniciar Compra</button>
                    <button className="btn btn-danger ms-2" onClick={vaciarCarrito}>Vaciar Carrito</button>
                </div>
            </div>
        </div>
    );
}
