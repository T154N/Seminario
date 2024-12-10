import React, { useEffect, useState } from 'react';
import productoService from '../../services/producto/producto.service';
import './SeleccionProducto.css';
import categoriaService from "../../services/categoria/categoria.service";

const SeleccionarProductos = ({
                                  onProductosSeleccionados = () => {},
                                  onProductoAgregado = () => {},
                                  productosSeleccionados = []
                              }) => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [seleccionados, setSeleccionados] = useState({});
    const [busqueda, setBusqueda] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const productosObtenidos = await productoService.getAllProductos();
                setProductos(productosObtenidos);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        obtenerProductos();
    }, []);

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const categoriasObtenidas = await categoriaService.getAllCategorias();
                setCategorias(categoriasObtenidas);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };

        obtenerCategorias();
    }, []);

    useEffect(() => {
        const filtrarProductos = () => {
            let productosFiltradosPorCategoria = productos;
            let productosFiltradosPorBusqueda = productos;

            // Filtrar por categoría
            if (categoria !== '') {
                productosFiltradosPorCategoria = productosFiltradosPorCategoria.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase());
            }
            // Filtrar por búsqueda
            if (busqueda !== '') {
                productosFiltradosPorBusqueda = productosFiltradosPorCategoria.filter(producto =>
                    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
                );
            } else {
                // Si no hay búsqueda, usamos los productos filtrados por categoría
                productosFiltradosPorBusqueda = productosFiltradosPorCategoria;
            }
            // Actualizamos el estado con los productos filtrados
            setProductosFiltrados(productosFiltradosPorBusqueda);
        };

        filtrarProductos();
    }, [productos, busqueda, categoria]);

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value);
    };

    const handleCantidadChange = (productoId, cantidad) => {
        setSeleccionados((prevSeleccionados) => ({
            ...prevSeleccionados,
            [productoId]: Math.max(cantidad, 0),
        }));
    };

    const estaProductoAgregado = (productoId) => {
        return productosSeleccionados.some((p) => p.id === productoId);
    };

    const agregarProducto = (producto) => {
        if (estaProductoAgregado(producto.id)) return;

        const cantidadProducto = seleccionados[producto.id] || 1;
        if (cantidadProducto <= 0) return;

        const productoConCantidad = { ...producto, cantidad: cantidadProducto };
        onProductosSeleccionados((prevSeleccionados) => [...prevSeleccionados, productoConCantidad]);
        onProductoAgregado(productoConCantidad);

        setSeleccionados((prevState) => ({
            ...prevState,
            [producto.id]: 0,
        }));
    };

    return (
        <div>
            <label className="form-label m-1 mt-2" style={{ fontSize: '20px' }}>Seleccionar Productos</label>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    placeholder="Buscar productos por nombre"
                    value={busqueda}
                    onChange={handleBusquedaChange}
                    className="form-control me-2"
                />
                <select
                    className="form-select"
                    value={categoria}
                    onChange={handleCategoriaChange}
                >
                    <option value="">Todas las categorías</option>
                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="productos-container">
                <div className="row">
                    {productosFiltrados.map((producto) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={producto.id}>
                            <div className="card h-100 shadow d-flex flex-column">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="card-title">{producto.nombre}</h5>
                                        <p className="card-text">$ {producto.precioUnitario.toFixed(2)}</p>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center mt-auto">
                                        <input
                                            type="number"
                                            value={seleccionados[producto.id] || 1}
                                            onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value, 10))}
                                            className="mx-2 input-cantidad"
                                            style={{ width: "50px" }}
                                            min="1"
                                        />
                                    </div>
                                    <button
                                        className="btn btn-secundario text-white mt-3 w-100"
                                        onClick={() => agregarProducto(producto)}
                                        disabled={estaProductoAgregado(producto.id)}
                                    >
                                        {!estaProductoAgregado(producto.id) && "🛒 Agregar Producto"}
                                        {estaProductoAgregado(producto.id) && "✔️ Producto agregado"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SeleccionarProductos;