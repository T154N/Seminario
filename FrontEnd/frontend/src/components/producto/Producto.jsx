import React, { useState } from "react";
import './producto.css'; 
import chupetin from '../../images/Header Icons/chupetin.jpeg'

// Mock data de productos
const productosMock = [
    {
        id: 1,
        nombre: "Chupetin",
        descripcion: "Caja de 32 chupetines surtidos",
        imagen: chupetin,
        marca: "Marca Chupetin"
    },
    {
        id: 2,
        nombre: "Galletas",
        descripcion: "Paquete de 10 galletas de chocolate",
        imagen: chupetin, // Puedes cambiar por otra imagen si la tienes
        marca: "Marca Galletas"
    },
    {
        id: 3,
        nombre: "Caramelos",
        descripcion: "Bolsa de caramelos surtidos",
        imagen: chupetin,
        marca: "Marca Caramelos"
    }
];

export function Producto() {
    
    const [busqueda, setBusqueda] = useState('');
    const [cantidad, setCantidad] = useState(0);

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    }

       // Incrementar y disminuir cantidad de un producto específico
       const incrementarCantidad = (id) => {
        setCantidad((prevCantidad) => ({
            ...prevCantidad,
            [id]: (prevCantidad[id] || 0) + 1
        }));
    };

    const disminuirCantidad = (id) => {
        setCantidad((prevCantidad) => ({
            ...prevCantidad,
            [id]: Math.max((prevCantidad[id] || 0) - 1, 0)
        }));
    };


    const agregarAlCarrito = (id) => {
        console.log('Producto ${id} agregado al carrito');
    };

     // Filtrar productos según la búsqueda
     const productosFiltrados = productosMock.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
     );

    return (
        <div>
            <div className="row mb-4">
                <div className="col-md-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar producto..."
                        value={busqueda}
                        onChange={handleBusquedaChange}
                    />
                </div>
            </div>

            {/* Mapeo del array de productos para generar las cards */}
            {productosFiltrados.map(producto =>(
                <div key={producto.id} className="card producto-card mb-3">
                    <div className="row g-0">
                        <div className="col-md-1 col-12">
                            <img src={producto.imagen} className="img-fluid rounded-start" alt={producto.nombre} />
                        </div>

                        <div className="col-md-6 col-12">
                            <h5 className="card-title">{producto.nombre}</h5>
                            <p className="card-text">{producto.descripcion}</p>
                            <p className="card-text">{producto.marca}</p>
                        </div>

                        <div className="col-md-3 col-12 d-flex align-items-center justify-content-end flex-column">
                        <div className="cantidad-control">
                            <button className="btn btn-outline-secondary" onClick={() => disminuirCantidad(producto.id)}>-</button>
                            <span className="mx-2">{cantidad[producto.id] || 0}</span>
                            <button className="btn btn-outline-secondary" onClick={() => incrementarCantidad(producto.id)}>+</button>
                        </div>
                        <button className="btn btn-success mt-3" onClick={() => agregarAlCarrito(producto.id)}>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        ))}              
    </div>
    );
}

                    

                
