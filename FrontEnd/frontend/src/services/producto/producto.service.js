import axios from 'axios';
<<<<<<< Updated upstream
import productosMock from './producto.mocks';

const getAllProductos = async () => {
    try {
        // Cambiar por el endpoint que corresponda
        return productosMock();
=======
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
>>>>>>> Stashed changes

    } catch (error) {
        return []
    };
};

const getProductosCategoria = async (categoria) => {
    try {
        // Cambiar por el endpoint que corresponda
        const productos = await getAllProductos();
        return productos.filter(p => p.categoria === categoria);

    } catch (error) {
        return []
    };
}

const productoService = {
    getAllProductos,
    getProductosCategoria
}

export default productoService;