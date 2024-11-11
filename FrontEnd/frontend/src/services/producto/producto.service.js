import axios from 'axios';
import sinImagen from '../../images/Other Icons/sinImagen.png';

const ENDPOINT_PRODUCTO_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;


const getProductoById = async (id) => {
    try {
        const response = await axios.get(`${ENDPOINT_PRODUCTO_URL}/productos/${id}`);
        console.log(response);

        // Verificar que response.data.body sea un objeto y no un array
        if (response.data.body) {
            const c = response.data.body;
            console.log(c); // Log the entire response body
            return {
                id: c.id,
                nombre: c.nombre,
                descripcion: c.descripcion ? c.descripcion : "Producto sin descripción",
                precioUnitario: c.precio,
                observaciones: c.observaciones,
                categoria: c.categoriaNombre,
                imagen: c.urlImagen ? c.urlImagen : sinImagen,
                estado: c.productoEstado,
                categoriaId: c.categoriaId,
            };
        }

    } catch (error) {
        console.error(error);
        return null; // Puedes devolver un objeto vacío o algo más adecuado para manejar el error
    }
};




const getAllProductos = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_PRODUCTO_URL}/productos`);
        console.log(response);
        const productos = response.data.body.map((c) => ({
            id: c.id,
            nombre: c.nombre,
            descripcion: c.descripcion ? c.descripcion : "Producto sin descripción",
            precioUnitario: c.precio,
            observaciones: c.observaciones,
            categoria: c.categoriaNombre,
            imagen: c.urlImagen ? c.urlImagen : sinImagen,
            estado: c.productoEstado
        }));

        // Mostrar todos los productos por consola
        console.log("Listado de todos los productos:", productos);

        return productos;

    } catch (error) {
        return []
    }
};

const getAllProductosBaja = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_PRODUCTO_URL}/productos/baja`);
        console.log(response);
        return response.data.body.map((c) => {
            return {
                id: c.id,
                nombre: c.nombre,
                descripcion: c.descripcion ? c.descripcion : "Producto sin descripción",
                precioUnitario: c.precio,
                observaciones: c.observaciones,
                categoria: c.categoriaNombre,
                imagen: c.urlImagen ? c.urlImagen : sinImagen,
                estado: c.productoEstado
            }
        })

    } catch (error) {
        return []
    }
};

const getProductosCategoria = async (categoriaId) => {
    try {
        const response = await axios.get(`${ENDPOINT_PRODUCTO_URL}/productos/categoria/${categoriaId}`);
        console.log(response);
        return response.data.body.map((p) => {
            return {
                id: p.id,
                nombre: p.nombre,
                descripcion: p.descripcion ? p.descripcion : "Producto sin descripción",
                precioUnitario: p.precio,
                observaciones: p.observaciones,
                categoria: p.categoriaNombre,
                imagen: p.urlImagen ? p.urlImagen : sinImagen
            }
        });

    } catch (error) {
        return []
    };
}

const postNuevoProducto = async (data) => {
    try {
        console.log(data);
    } catch (error) {
        return 500;
    }
}

const updateProducto = async (producto_id, producto_nombre, producto_descripcion, producto_precio, producto_url_imagen, Categoria, producto_usuario_modificacion) => {
    try {
        const response = await axios.put(`${ENDPOINT_PRODUCTO_URL}/productos/mod`, {
            producto_id: producto_id.toString(),
            producto_nombre: producto_nombre.toString(),
            producto_descripcion: producto_descripcion.toString(),
            producto_precio: producto_precio.toString(),
            producto_url_imagen: producto_url_imagen.toString(),
            categoria: {
                categoriaId: Categoria.toString()
            },
            producto_usuario_modificacion: producto_usuario_modificacion.toString()
        });
        console.log(response);
        return response;
    } catch (error) {
        return 500;
    }
}
const productoService = {
    getAllProductos,
    getProductosCategoria,
    postNuevoProducto,
    getAllProductosBaja,
    getProductoById,
    updateProducto
}

export default productoService;