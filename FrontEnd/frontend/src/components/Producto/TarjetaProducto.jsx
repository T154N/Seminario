import React from "react";
import "./TarjetaProducto.css";
function TarjetaProducto({ imagen, titulo, descripcion }) {
    return (
        <div>
            <div className="card">
                <img src={imagen} alt={`Imagen de ${titulo}`} />
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{descripcion}</p>
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
    );
}

export default TarjetaProducto;

/*<div className="col-sm-10">
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <div className="col">
                            <div className="card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="Ruta" alt="Imagen del producto" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Producto 1</h5>
                                            <p className="card-text">Descripcion del producto</p>
                                            <div className="input-group mb-3">
                                                <input type="number" className="form-control" placeholder="Cantidad" value= "1" />
                                                <button type="button" className="btn btn-primary">Agregar al carrito</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="Ruta" alt="Imagen del producto" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Producto 2</h5>
                                            <p className="card-text">Descripcion del producto</p>
                                            <div className="input-group mb-3">
                                                <input type="number" className="form-control" placeholder="Cantidad" value= "1"/>
                                                <button type="button" className="btn btn-primary">Agregar al carrito</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="Ruta" alt="Imagen del producto" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Producto 3</h5>
                                            <p className="card-text">Descripcion del producto</p>
                                            <div className="input-group mb-3">
                                                <input type="number" className="form-control" placeholder="Cantidad" value= "1"/>
                                                <button type="button" className="btn btn-primary">Agregar al carrito</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="Ruta" alt="Imagen del producto" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Producto 4</h5>
                                            <p className="card-text">Descripcion del producto</p>
                                            <div className="input-group mb-3">
                                                <input type="number" className="form-control" placeholder="Cantidad" value= "1"/>
                                                <button type="button" className="btn btn-primary">Agregar al carrito</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */
