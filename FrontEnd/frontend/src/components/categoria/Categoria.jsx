import React from "react";
import './categoria.css';
import { ProductoTarjeta } from "./ProductoTarjeta";



const productos = [
    { nombre: "Producto 1", descripcion: "Descripción del producto 1", imagen: "ruta-imagen-1.jpg" },
    { nombre: "Producto 2", descripcion: "Descripción del producto 2", imagen: "ruta-imagen-2.jpg" },
    { nombre: "Producto 3", descripcion: "Descripción del producto 3", imagen: "ruta-imagen-3.jpg" },
    { nombre: "Producto 4", descripcion: "Descripción del producto 4", imagen: "ruta-imagen-4.jpg" },
    { nombre: "Producto 5", descripcion: "Descripción del producto 5", imagen: "ruta-imagen-5.jpg" },
    { nombre: "Producto 6", descripcion: "Descripción del producto 6", imagen: "ruta-imagen-6.jpg" }
];


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
