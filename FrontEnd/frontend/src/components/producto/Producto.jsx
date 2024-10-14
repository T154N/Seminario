import React, { useState, useEffect } from "react";
import './producto.css'; 
import productoService from "../../services/producto/producto.service";
import { useParams, useNavigate } from "react-router"; // Asegúrate de importar useNavigate
import { useCarrito } from '../carrito/CarritoContext'; // Importa el hook de contexto del carrito

export function Producto() {
    const navigate = useNavigate(); // Inicializa useNavigate
    const [busqueda, setBusqueda] = useState('');
    const [cantidad, setCantidad] = useState({});
    const [productos, setProductos] = useState([]); // Inicializamos productos como array vacío
    const [loading, setLoading] = useState(true); // Controlar el estado de carga
    const { categoria } = useParams(); // Capturar la categoría desde la URL
    const { agregarProducto } = useCarrito(); // Accede a la función agregarProducto del contexto del carrito

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Iniciar el estado de carga

            if (!categoria) {
                const productos = await productoService.getAllProductos(); // Obtener todos los productos
                setProductos(productos);
            } else {
                const productos = await productoService.getProductosCategoria(categoria);
                setProductos(productos);
            }
            
            setLoading(false); // Finalizar el estado de carga
        };
        
        fetchData();
    }, [categoria]); // Dependencia de categoria para actualizar cuando la URL cambie

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleVolverCatalogo = () => {
        navigate("/catalogo"); // Navegar a la ruta /catalogo
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

    // Manejar el cambio en el campo de entrada de cantidad
    const manejarCambioCantidad = (id, e) => {
        const valor = e.target.value;
        // Validar que el valor sea un número positivo
        if (!isNaN(valor) && valor >= 0) {
            setCantidad((prevCantidad) => ({
                ...prevCantidad,
                [id]: parseInt(valor) || 0
            }));
        }
    };

    // Agregar producto al carrito usando el contexto del carrito
    const agregarAlCarrito = (producto) => {
        const cantidadProducto = cantidad[producto.id] || 1;
        agregarProducto({ ...producto, cantidad: cantidadProducto });
        console.log(`Producto ${producto.nombre} agregado al carrito con cantidad ${cantidadProducto}`);
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
            <div>
                <h2 className="fs-1 mb-3">{categoria ? categoria : 'Todos los productos'}</h2>
            </div>
            <div className="container">
                <div className="row mb-3">  
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                        <div className="d-flex align-items-start">
                            <button className="btn btn-success" onClick={handleVolverCatalogo}>Volver al catalogo</button>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
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
                <div className="row">
                    {productosFiltrados.map(producto => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={producto.id}>
                            <div className="card h-100 shadow">
                                <img src={producto.imagen} className="rounded mx-4 d-block mt-4 producto-img" alt={producto.nombre}/>
                                <div className="card-body">
                                    <h5 className="card-title">{producto.nombre}</h5>
                                    <p className="card-text">{producto.descripcion}</p>
                                    <p className="card-text">{producto.marca}</p>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button className="btn btn-outline-secondary" onClick={() => disminuirCantidad(producto.id)}>-</button>
                                        <input
                                            type="number"
                                            value={cantidad[producto.id] || 1}
                                            onChange={(e) => manejarCambioCantidad(producto.id, e)}
                                            className="mx-2 input-cantidad"
                                            style={{ width: "50px" }}
                                            min="0"
                                        />
                                        <button className="btn btn-outline-secondary" onClick={() => incrementarCantidad(producto.id)}>+</button>
                                    </div>
                                    <button className="btn btn-success mt-3 w-100" onClick={() => agregarAlCarrito(producto)}>
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/*
                {productosFiltrados.map(producto => (
                    <div className="row" key={producto.id}>
                        <div className="col">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
                                            style={{ objectFit: 'cover' }}>
                                            <img src={producto.imagen} className="img-fluid rounded d-block mx-auto" alt={producto.nombre} />
                                        </div>
                                        <div className="col-12 col-sm-4 col-md-6 col-lg-7 col-xl-7 col-xxl-7">
                                            <h5 className="card-title text-start">{producto.nombre}</h5>
                                            <p className="card-text text-start">{producto.descripcion}</p>
                                            <p className="card-text text-start">{producto.marca}</p>
                                        </div>
                                        <div className="col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                            <div>
                                                <button className="btn btn-outline-secondary" onClick={() => disminuirCantidad(producto.id)}>-</button>
                                                <input
                                                    type="number"
                                                    value={cantidad[producto.id] || 1}
                                                    onChange={(e) => manejarCambioCantidad(producto.id, e)}
                                                    className="mx-2 input-cantidad"
                                                    style={{ width: "50px" }}
                                                    min="0"
                                                />
                                                <button className="btn btn-outline-secondary" onClick={() => incrementarCantidad(producto.id)}>+</button>
                                            </div>
                                            <div>
                                                <button className="btn btn-success mt-3" onClick={() => agregarAlCarrito(producto)}>
                                                    Agregar al carrito
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                */}
            </div>
        </div>
    );
}
