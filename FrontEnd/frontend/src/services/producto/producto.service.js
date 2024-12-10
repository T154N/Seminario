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

const getProductoByIdAdmin = async (id) => {
    try {
        const response = await axios.get(`${ENDPOINT_PRODUCTO_URL}/productos/admin/${id}`);
        console.log(response);

        // Verificar que response.data.body sea un objeto y no un array
        if (response.data.body) {
            const c = response.data.body;
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
const getAllProductosAdmin = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_PRODUCTO_URL}/productos/admin`);
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

const postProducto = async (producto_nombre, producto_descripcion, producto_precio, producto_url_imagen, Categoria, producto_usuario_creacion) => {
    try {
        const response = await axios.post(`${ENDPOINT_PRODUCTO_URL}/productos/alta`, {
            producto_nombre: producto_nombre.toString(),
            producto_descripcion: producto_descripcion.toString(),
            producto_precio: producto_precio.toString(),
            producto_url_imagen: producto_url_imagen.toString(),
            categoria: {
                categoriaId: Categoria
            },
            producto_usuario_alta: producto_usuario_creacion.toString()
        });
        console.log(response);
        return response;
    } catch (error) {
        return 500;
    }
}

const updateProducto = async (producto_id, producto_nombre, producto_descripcion, producto_precio, producto_url_imagen, Categoria, producto_usuario_modificacion,producto_estado_id) => {
    try {
        const response = await axios.put(`${ENDPOINT_PRODUCTO_URL}/productos/mod`, {
            producto_id: producto_id.toString(),
            producto_nombre: producto_nombre.toString(),
            producto_descripcion: producto_descripcion.toString(),
            producto_precio: producto_precio.toString(),
            producto_url_imagen: producto_url_imagen.toString(),
            categoria: {
                categoriaId: Categoria
            },
            producto_usuario_modificacion: producto_usuario_modificacion.toString(),
            producto_estado_id: producto_estado_id.toString()

        });
        console.log(response);
        return response;
    } catch (error) {
        return 500;
    }
}

const setBajaProducto = async (producto_id, producto_usuario_modificacion) => {
    try {
        const response = await axios.put(`${ENDPOINT_PRODUCTO_URL}/productos/baja`, {
            producto_id: producto_id.toString(),
            producto_usuario_modificacion: producto_usuario_modificacion.toString()
        });
        console.log(response);
        console.log("Producto dadod de baja correctamente");
        return response;
    } catch (error) {
        return 500;
    }
}

export const updatePrecioProducto = async (data) => {
    try {
        console.log('URL: ', ENDPOINT_PRODUCTO_URL);
        console.log('Data actualizar ', data);

        // Realizamos la llamada a la API para actualizar productos
        const response = await fetch(`${ENDPOINT_PRODUCTO_URL}/actualizacionmas`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoryId: data.categoryId,
                productIds: data.productIds,  // Si es un arreglo, pasa el array
                percentage: data.percentage,
                usuarioMod: data.usuarioMod,
                fechaMod: data.fechaMod,
            }),
        });

        // Verificamos si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Si la respuesta es exitosa, la convertimos a JSON
        const result = await response.json();

        console.log('Actualización exitosa:', result);
        return result;  // Retornamos el resultado de la API

    } catch (error) {
        console.error("Error al actualizar productos:", error);
        throw error;  // Lanza el error para que pueda ser manejado en el componente
    }
};



const productoService = {
    getAllProductos,
    getProductosCategoria,
    postProducto,
    getProductoById,
    getProductoByIdAdmin,
    updateProducto,
    getAllProductosAdmin,
    setBajaProducto,
    updatePrecioProducto
}

export default productoService;