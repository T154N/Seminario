import React from "react";
import "./TarjetaProducto.css";

function TarjetaProducto({ imagen, titulo, descripcion }) {
    return (
        <div>
            <div className="card">
                <img src={imagen} alt={`Imagen de ${titulo}`} />
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{descripcion}</p>
                <div className="container">
                    <div className="row">
                        <div className="input-group mb-3">
                            <input
                                type="number"
                                className="cuadro-cantidad"
                                placeholder="Cantidad"
                                defaultValue="1"
                            />
                            <button type="button" className="btn-agregar">
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TarjetaProducto;
