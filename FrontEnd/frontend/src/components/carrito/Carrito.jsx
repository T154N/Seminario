import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './carrito.css';

const productosIniciales = [
    { nombre: "Producto 1", imagen: "https://via.placeholder.com/150", precioUnitario: 100, cantidad: 1 },
    { nombre: "Producto 2", imagen: "https://via.placeholder.com/150", precioUnitario: 200, cantidad: 1 },
    { nombre: "Producto 3", imagen: "https://via.placeholder.com/150", precioUnitario: 300, cantidad: 1 },
    { nombre: "Producto 4", imagen: "https://via.placeholder.com/150", precioUnitario: 400, cantidad: 3 },
];

export function Carrito() {
    const [productos, setProductos] = useState(() => [...productosIniciales]);
    const [total, setTotal] = useState(0);

    const incrementarCantidad = (index) => {
        const nuevosProductos = [...productos];
        nuevosProductos[index].cantidad += 1;
        setProductos(nuevosProductos);
    };

    const disminuirCantidad = (index) => {
        const nuevosProductos = [...productos];
        if (nuevosProductos[index].cantidad > 1) {
            nuevosProductos[index].cantidad -= 1;
            setProductos(nuevosProductos);
        }
    };

    const eliminar = (index) => {
        const nuevosProductos = productos.filter((_, i) => i !== index);
        setProductos(nuevosProductos);
    };

    useEffect(() => {
        const total = productos.reduce((ac, el) => ac + el.precioUnitario * el.cantidad, 0);
        setTotal(total);
    }, [productos]);

    return (
        <div>
            <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
            >
                Carrito
            </button>

            <div className="offcanvas offcanvas-end custom-offcanvas-width"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabIndex="-1"
                id="offcanvasScrolling"
                aria-labelledby="offcanvasScrollingLabel"
            >
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
                        productos.map((producto, index) => (
                            <div className="card producto-card" key={index}>
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img src={producto.imagen} className="img-fluid rounded-start" alt={producto.nombre} />
                                    </div>

                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <div className="cantidad-control">
                                                <button className="btn btn-outline-secondary" onClick={() => disminuirCantidad(index)}>-</button>
                                                <span className="mx-2">{producto.cantidad}</span>
                                                <button className="btn btn-outline-secondary" onClick={() => incrementarCantidad(index)}>+</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3 d-flex align-items-center justify-content-end flex-column">
                                        <button className="btn btn-danger mt-3" onClick={() => eliminar(index)}>
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
                    <button className="btn btn-primary">Iniciar Compra</button>
                </div>
            </div>
        </div>
    );
}
