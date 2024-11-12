import React, { useState, useEffect } from "react";
import './producto.css'; 
import productoService from "../../services/producto/producto.service";
import { useParams, useNavigate, useLocation } from "react-router"; // Asegúrate de importar useNavigate
import { useCarrito } from '../carrito/CarritoContext'; // Importa el hook de contexto del carrito

export function Producto() {
    const navigate = useNavigate(); // Inicializa useNavigate
    const location = useLocation(); // Inicializa useLocation
    const [busqueda, setBusqueda] = useState('');
    const [cantidad, setCantidad] = useState({});
    const [productos, setProductos] = useState([]); // Inicializamos productos como array vacío
    const [loading, setLoading] = useState(true); // Controlar el estado de carga
    const { categoria: categoriaId } = useParams(); // Capturar la categoría desde la URL
    const { agregarProducto } = useCarrito(); // Accede a la función agregarProducto del contexto del carrito
    const [categoriaNombre, setCategoriaNombre] = useState(location.state?.categoriaNombre || null); // Inicializa el estado de la categoría

    useEffect(() => {
        if (!categoriaNombre) {
            setCategoriaNombre("Todos los productos");
        }
    }, [categoriaNombre]);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
    
            // Chequea si `categoriaNombre` necesita ser actualizado a "Todos los productos"
            if (!categoriaNombre || categoriaNombre === "Todos los productos") {
                const productos = await productoService.getAllProductos();
                setProductos(productos);
                if (!categoriaNombre) {
                    setCategoriaNombre("Todos los productos");
                }
            } else {
                const productos = await productoService.getProductosCategoria(categoriaId);
                setProductos(productos);
            }
    
            setLoading(false);
        };
    
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoriaId]);

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleVolverCatalogo = () => {
        navigate("/catalogo"); // Navegar a la ruta /catalogo
    };

    // Incrementar y disminuir cantidad de un producto específico
    const incrementarCantidad = (id) => {
        setCantidad((prevCantidad) => {
            const nuevaCantidad = (prevCantidad[id] || 1) + 1;
            return { ...prevCantidad, [id]: nuevaCantidad };
        });
    };
    
    const disminuirCantidad = (id) => {
        setCantidad((prevCantidad) => {
            const nuevaCantidad = Math.max((prevCantidad[id] || 1) - 1, 0);
            return { ...prevCantidad, [id]: nuevaCantidad };
        });
    };
    
    const manejarCambioCantidad = (id, e) => {
        const valor = e.target.value;
        if (!isNaN(valor) && valor >= 0) {
            setCantidad((prevCantidad) => ({
                ...prevCantidad,
                [id]: parseInt(valor) || 0,
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
        return <div className="fs-3">Cargando productos...</div>; // Mostrar un mensaje de carga mientras los productos se están obteniendo
    }

    return (
        <div>
            <div>
                <h2 className="fs-1 mb-3">{categoriaNombre.toUpperCase()}</h2>
            </div>
            <div className="container">
                <div className="row mb-3">  
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                        <div className="d-flex align-items-start">
                            <button className="btn btn-secundario text-white" onClick={handleVolverCatalogo}>Volver al catálogo</button>
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
                            <div className="card h-100 shadow d-flex flex-column">
                                {/* Sección de la imagen */}
                                <div className="d-flex justify-content-center">
                                    <img
                                        src={producto.imagen}
                                        className="rounded mx-auto d-block mt-4"
                                        style={{width: "50%", height: "auto"}}
                                        alt={producto.descripcion}
                                    />
                                </div>
                                {/* Sección del contenido (nombre, descripción, precio, cantidad, botón) */}
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="card-title">{producto.nombre}</h5>
                                        <p className="card-text">{producto.descripcion}</p>
                                        <p className="card-text">$ {producto.precioUnitario.toFixed(2)}</p>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center mt-auto">
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
                                    <button className="btn btn-secundario text-white mt-3 w-100" onClick={() => agregarAlCarrito(producto)}>
                                        🛒 Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
