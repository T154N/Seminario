import axios from 'axios';
import sinImagen from '../../images/Other Icons/sinImagen.png';

const ENDPOINT_CATEGORIA_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const getAllCategorias = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_CATEGORIA_URL}/categorias`);
        return response.data.body
            .map((c) => {
                return {
                    id: c.categoriaId,
                    nombre: c.categoriaNombre.toUpperCase(),
                    imagen: c.categoriaUrlImagen ? c.categoriaUrlImagen : sinImagen,
                    estado: c.categoriaEstado
                };
            })
            .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar alfabéticamente por nombre
    } catch (error) {
        return [];
    }
};

const getCategoriaById = async (id) => {
    try {
        const response = await axios.get(`${ENDPOINT_CATEGORIA_URL}/categorias/${id}`);
        console.log(response);

        // Verificar que response.data.body sea un objeto y no un array
        if (response.data.body) {
            const c = response.data.body;
            return {
                id: c.categoriaId,
                nombre: c.categoriaNombre,
                observaciones: c.categoriaObservaciones,
                imagen: c.categoriaUrlImagen ? c.categoriaUrlImagen : sinImagen,
                estado: c.categoriaEstado
            };
        }

    } catch (error) {
        console.error(error);
        return null; // Puedes devolver un objeto vacío o algo más adecuado para manejar el error
    }
}


const updateCategoria = async(categoriaId,categoriaNombre,categoriaObservaciones,categoriaUrlImagen,categoriaUsuarioModificacion,categoriaEstadoId) => {
    try{
        const response = await axios.put(`${ENDPOINT_CATEGORIA_URL}/categorias/upd`,{
            categoriaId: categoriaId.toString(),
            categoriaNombre: categoriaNombre.toString(),
            categoriaObservaciones: categoriaObservaciones.toString(),
            categoriaUrlImagen: categoriaUrlImagen.toString(),
            categoriaUsuarioModificacion: categoriaUsuarioModificacion.toString(),
            categoriaEstadoId: categoriaEstadoId.toString()
        });
        console.log(response.data.body);
        return response.data.body;

    }catch (error) {
        return 500;
    }
}


const categoriaService = {
    getAllCategorias,
    getCategoriaById,
    updateCategoria
}

export default categoriaService;