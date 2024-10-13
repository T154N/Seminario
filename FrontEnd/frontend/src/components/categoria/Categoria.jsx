import React from "react";
import './categoria.css';
import { ProductoTarjeta } from "./ProductoTarjeta";

export function Categoria() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-6">
                        <h1 className="text-start">Nombre Categoria</h1>

                        <form className="d-flex search-bar" role="search">
                            <input
                                className="form-control me-2 w-50"
                                type="search"
                                placeholder="Nombre del producto"
                                aria-label="Search"
                            />
                            <button className="btn btn-orange" type="submit">
                                Buscar
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-4 mt-4">
                        {productos.map((producto, index) => (
                            <ProductoTarjeta
                                key={index}
                                nombre={ producto.nombre }
                                descripcion={ producto.descripcion }
                                imagen={ producto.imagen }
                            />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}
