import React, { useState } from "react";
import TarjetaProducto from "./TarjetaProducto";
import Categoria from "./Categoria";

const productos1 = [
    { titulo: "Producto A", descripcion: "Descripcion del producto A", imagen: "RutaA" },
    { titulo: "Producto B", descripcion: "Descripcion del producto B", imagen: "RutaB" },
    { titulo: "Producto C", descripcion: "Descripcion del producto C", imagen: "RutaC" },
    { titulo: "Producto D", descripcion: "Descripcion del producto D", imagen: "RutaD" },
    { titulo: "Producto D", descripcion: "Descripcion del producto D", imagen: "RutaD" },
    // Puedes agregar más productos aquí
];

const productos2 = [
    { titulo: "Producto E", descripcion: "Descripcion del producto E", imagen: "RutaE" },
    { titulo: "Producto F", descripcion: "Descripcion del producto F", imagen: "RutaF" },
    { titulo: "Producto G", descripcion: "Descripcion del producto G", imagen: "RutaG" },
    { titulo: "Producto H", descripcion: "Descripcion del producto H", imagen: "RutaH" },
    // Puedes agregar más productos aquí
];

const productos3 = [
    { titulo: "Producto I", descripcion: "Descripcion del producto I", imagen: "RutaI" },
    { titulo: "Producto J", descripcion: "Descripcion del producto J", imagen: "RutaJ" },
    { titulo: "Producto K", descripcion: "Descripcion del producto K", imagen: "RutaK" },
    { titulo: "Producto L", descripcion: "Descripcion del producto L", imagen: "RutaL" },
    // Puedes agregar más productos aquí
];

const productos4 = [
    { titulo: "Producto M", descripcion: "Descripcion del producto M", imagen: "RutaM" },
    { titulo: "Producto N", descripcion: "Descripcion del producto N", imagen: "RutaN" },
    { titulo: "Producto O", descripcion: "Descripcion del producto O", imagen: "RutaO" },
    { titulo: "Producto P", descripcion: "Descripcion del producto P", imagen: "RutaP" },
    // Puedes agregar más productos aquí
];


const categorias = ["Categoria 1", "Categoria 2", "Categoria 3", "Categoria 4", "Categoria 5"];

function Productos() {
    const [IndiceSeleccionado, setActiveBotonIndice] = useState(0);
    const [productos, setProductos] = useState(productos1);

    const handleButtonClick = (indice) => {
        setActiveBotonIndice(indice);
        setProductos(indice === 0 ? productos1 : indice === 1 ? productos2 : indice === 2 ? productos3 : productos4);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2 g-5">
                    <div className="list-group">
                        <Categoria categorias={categorias} 
                        IndiceSeleccionado={IndiceSeleccionado} 
                        handleButtonClick={handleButtonClick} />
                    </div>
                </div>
                <div className="col-sm-9 g-5">
                    <div className="row row-cols-md-2 g-4">
                        {productos.map((producto, index) => (
                            <TarjetaProducto
                                key={index}
                                imagen={producto.imagen}
                                titulo={producto.titulo}
                                descripcion={producto.descripcion}
                            />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productos;



/*   return (
        <div className="container">
            <div className="row">
                <div className="col-sm-2">
                    <div className="list-group">

                        {categorias.forEach(element => {
                            <button
                                type="button"
                                className={`list-group-item list-group-item-action ${IndiceSeleccionado === 0 ? "active" : ""}`}
                                onClick={() => handleButtonClick(0)}
                                aria-current={IndiceSeleccionado === 0 ? "true" : "false"}
                            >
                                {element}
                            </button>
                        })}
                        
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${IndiceSeleccionado === 0 ? "active" : ""}`}
                            onClick={() => handleButtonClick(0)}
                            aria-current={IndiceSeleccionado === 0 ? "true" : "false"}
                        >
                            Categoria 1
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${IndiceSeleccionado === 1 ? "active" : ""}`}
                            onClick={() => handleButtonClick(1)}
                        >
                            Categoria 2
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${IndiceSeleccionado === 2 ? "active" : ""}`}
                            onClick={() => handleButtonClick(2)}
                        >

                            Categoria 3
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${IndiceSeleccionado === 3 ? "active" : ""}`}
                            onClick={() => handleButtonClick(3)}
                        >
                            Categoria 4
                        </button>
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {productos.map((producto, index) => ( 
                            <TarjetaProducto
                                key={index}
                                imagen={producto.imagen}
                                titulo={producto.titulo}
                                descripcion={producto.descripcion}
                            />  
                        ))}  
                    </div>
                </div>
                
            </div>
        </div>
    );
} */