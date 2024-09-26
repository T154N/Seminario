import React, { useState } from "react";
import './productoTarjeta.css'; 

export function ProductoTarjeta({ nombre, descripcion, imagen }) {
    const [cantidad, setCantidad] = useState(0);

    const incrementarCantidad = () => {
        setCantidad(cantidad + 1);
    };

    const disminuirCantidad = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    };

    const agregarAlCarrito = () => {
    };

    return (
        <div className="card producto-card">
            <div className="row g-0">
                <div className="col-md-3">
                <img src="https://via.placeholder.com/150" className="img-fluid rounded-start" alt="Producto" />
                </div>

                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{nombre}</h5>
                        <p className="card-text">{descripcion}</p>
                    </div>
                </div>

                <div className="col-md-3 d-flex align-items-center justify-content-end flex-column">
                    <div className="cantidad-control">
                        <button className="btn btn-outline-secondary" onClick={disminuirCantidad}>-</button>
                        <span className="mx-2">{cantidad}</span>
                        <button className="btn btn-outline-secondary" onClick={incrementarCantidad}>+</button>
                    </div>
                    <button className="btn btn-success mt-3" onClick={agregarAlCarrito}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

