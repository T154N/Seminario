import axios from "axios";

const ENDPOINT_CARRITO_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const cargarCarrito = async (agregarProducto) => {
    try {
        const clienteId = localStorage.getItem('clienteId');
        const carritoYaExistente = await findByCliente(clienteId);
        if (carritoYaExistente === 404) {
            // No tiene ningun carrito
            return 404;
        } else if (carritoYaExistente.carritoId) {
            // Ya tiene un carrito creado
            localStorage.setItem('carritoId', carritoYaExistente.carritoId);
            const productosDelCarrito = await getDetalleCarrito(carritoYaExistente.carritoId);
            console.log("ID del carrito: ", carritoYaExistente.carritoId);
            console.log("Detalle carrito", productosDelCarrito);
            // Cargar los productos del carrito al carritoContext
            productosDelCarrito.forEach(producto => {
                agregarProducto(producto);
            });
        } else {
            return 400;
        }
    } catch (err) {
        return 400;
    }
}

const findByCliente = async (clienteId) => {
    try {
        const response = await axios.get(`${ENDPOINT_CARRITO_URL}/carrito/cliente/${clienteId}`);
        if (response.data.status === 404) {
            // No tiene ningun carrito
            return 404;
        }
        return {
            carritoId: response.data.body.carrito_id,
        }
    } catch (error) {
        return 400;
    }
};

const crearNuevoCarrito = async (usuarioTransaccion) => {
    try {
        const clienteId = localStorage.getItem('clienteId');
        const carritoYaExistente = await findByCliente(clienteId);
        // No tiene ningun carrito creado
        if (carritoYaExistente === 404) {
            // Crea un nuevo carrito
            const nuevoCarrito = await newCarrito(clienteId, usuarioTransaccion)
            console.log("Nuevo carrito", nuevoCarrito.data.body.carrito_id)
            localStorage.setItem('carritoId', nuevoCarrito.data.body.carrito_id);
            return nuevoCarrito.data.body.carrito_id;
        } else {
            // Ya tiene un carrito creado
            return localStorage.getItem('carritoId');
        }
    } catch (err) {
        return 400;
    }
}

const cargarProductosAlCarrito = async (carritoId, productos, usuarioTransaccion) => {
    try {
        console.log("Cargando carritos al producto")
        for (let i = 0; i < productos.length; i++) {
            console.log("Productos", productos)
            await addCarrito(carritoId, productos[i].cantidad, usuarioTransaccion,
                productos[i].id, productos[i].nombre, productos[i].precioUnitario, productos[i].categoriaNombre);
            // console.log("Cargando Producto:", productos[i].id)
        }
    } catch (err) {
        return 400
    }
}

const getDetalleCarrito = async (carritoId) => {
    try {
        const response = await axios.get(`${ENDPOINT_CARRITO_URL}/carrito/detalle/${carritoId}`);
        return response.data.body.map((p) => {
            return {
                id: p.productoID,
                nombre: p.productoName,
                precioUnitario: p.precio_individual,
                cantidad: p.cantidad,
                descripcion: p.descripcion ? p.descripcion : "Producto sin descripción",
                categoria: null,
                imagen: null,
                estado: null
            }
        });
    } catch (error) {
        return 400
    }
}

const newCarrito = async (clienteId, usuarioTransaccion) => {
    try {
        const response = await axios.post(`${ENDPOINT_CARRITO_URL}/carrito/new`, {}, {
            params: {
                clienteId: clienteId,
                usuarioTransaccion: usuarioTransaccion
            }
        });
        return response
    } catch (error) {
        return 400
    }
};

const addCarrito = async (carritoId, cantidad, usuarioTransaccion,
                          productoId, productoNombre, productoPrecio, categoriaNombre) => {
    try {
        const response = await axios.post(`${ENDPOINT_CARRITO_URL}/carrito/add`, {
            id: productoId,
            nombre: productoNombre,
            descripcion: "",
            precio: productoPrecio,
            observaciones: "",
            categoriaNombre: categoriaNombre,
            urlImagen: ""
        }, {
            params: {
                carritoId: carritoId,
                cantidad: cantidad,
                usuarioTransaccion: usuarioTransaccion
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

const removeItemFromCarrito = async (carritoId, productoId, usuarioTransaccion) => {
    try {
        const response = await axios.put(`${ENDPOINT_CARRITO_URL}/remove/item`, {}, {
            params: {
                carritoId: carritoId,
                productoId: productoId,
                usuarioTransaccion: usuarioTransaccion
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

const removeCarrito = async (carritoId, usuarioTransaccion) => {
    try {
        const response = await axios.put(`${ENDPOINT_CARRITO_URL}/carrito/remove`, {}, {
            params: {
                carritoId: carritoId,
                usuarioTransaccion: usuarioTransaccion
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

const carritoService = {
    findByCliente,
    getDetalleCarrito,
    removeCarrito,
    removeItemFromCarrito,
    addCarrito,
    newCarrito,
    crearNuevoCarrito,
    cargarProductosAlCarrito,
    cargarCarrito

}

export default carritoService;


