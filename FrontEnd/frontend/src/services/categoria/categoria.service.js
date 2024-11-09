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


const categoriaService = {
    getAllCategorias,
}

export default categoriaService;