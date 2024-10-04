import axios from 'axios';
import productosMock from './producto.mocks';

const getAllProductos = async () => {
    try {
        // Cambiar por el endpoint que corresponda
        return productosMock();

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