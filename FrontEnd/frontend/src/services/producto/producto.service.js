import axios from 'axios';
import sinImagen from '../../images/Other Icons/sinImagen.png';

const ENDPOINT_PRODUCTO_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const getAllProductos = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_PRODUCTO_URL}/productos`);
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
    };
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

const productoService = {
    getAllProductos,
    getProductosCategoria,
    postNuevoProducto
}

export default productoService;