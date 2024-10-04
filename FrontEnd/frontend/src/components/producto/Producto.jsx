import React, { useState, useEffect } from "react";
import './producto.css'; 
import productoService from "../../services/producto/producto.service";
import { useParams } from "react-router"; // Solo necesitas useParams para manejar la URL

export function Producto() {
    const [busqueda, setBusqueda] = useState('');
    const [cantidad, setCantidad] = useState({});
    const [productos, setProductos] = useState([]); // Inicializamos productos como array vacío
    const [loading, setLoading] = useState(true); // Controlar el estado de carga

    const { categoria } = useParams(); // Capturar la categoría desde la URL

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Iniciar el estado de carga

            if (!categoria) {
                // Si no hay categoría en la URL, se muestran todos los productos
                // console.log("No se recibió ninguna categoría, mostrando todos los productos...");
                const productos = await productoService.getAllProductos(); // Obtener todos los productos
                setProductos(productos);
            } else {
                // Si hay categoría en la URL, se filtran los productos por esa categoría
                // console.log(`Filtrando productos de la categoría: ${categoria}`);
                const productos = await productoService.getProductosCategoria(categoria);
                setProductos(productos);
            }
            
            setLoading(false); // Finalizar el estado de carga
        };
        
        fetchData();
    }, [categoria]); // Dependencia de categoriaUrl para actualizar cuando la URL cambie

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

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
        console.log(`Producto ${id} agregado al carrito`);
    };

    // Filtrar productos según la búsqueda
    const productosFiltrados = Array.isArray(productos) ? productos.filter(p =>
        p.nombre && p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    ) : [];

    if (loading) {
        return <div>Cargando productos...</div>; // Mostrar un mensaje de carga mientras los productos se están obteniendo
    }

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
            {productosFiltrados.map(producto => (
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
