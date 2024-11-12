import React, { useState, useEffect } from "react";
import './producto.css';
import productoService from "../../services/producto/producto.service";
import { useParams, useNavigate, useLocation } from "react-router";
import { useCarrito } from '../carrito/CarritoContext';

export function Producto() {
    const navigate = useNavigate();
    const location = useLocation();
    const [busqueda, setBusqueda] = useState('');
    const [cantidad, setCantidad] = useState({});
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoria: categoriaId } = useParams();
    const { agregarProducto } = useCarrito();
    const [categoriaNombre, setCategoriaNombre] = useState(location.state?.categoriaNombre || null);
    const [productoAgregado, setProductoAgregado] = useState({});

    useEffect(() => {
        if (!categoriaNombre) {
            setCategoriaNombre("Todos los productos");
        }
    }, [categoriaNombre]);

    useEffect(() => {
    const fetchData = async () => {
        setLoading(true);

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
}, [categoriaId, categoriaNombre]);

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleVolverCatalogo = () => {
        navigate("/catalogo");
    };

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

    const agregarAlCarrito = (producto) => {
        const cantidadProducto = cantidad[producto.id] || 1;
        agregarProducto({ ...producto, cantidad: cantidadProducto });
        setProductoAgregado((prevState) => ({
            ...prevState,
            [producto.id]: true,
        }));
    };

    const productosFiltrados = Array.isArray(productos) ? productos.filter(p =>
        p.nombre && p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    ) : [];

    if (loading) {
        return <div className="fs-3">Cargando productos...</div>;
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
                <div className="row">
                    {productosFiltrados.map(producto => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={producto.id}>
                            <div className="card h-100 shadow d-flex flex-column">
                                <div className="d-flex justify-content-center">
                                    <img
                                        src={producto.imagen}
                                        className="rounded mx-auto d-block mt-4"
                                        style={{width: "50%", height: "auto"}}
                                        alt={producto.descripcion}
                                    />
                                </div>
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
                                        {!productoAgregado[producto.id] && "🛒 Agregar al carrito"}
                                        {productoAgregado[producto.id] && "✔️ Producto agregado"}
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