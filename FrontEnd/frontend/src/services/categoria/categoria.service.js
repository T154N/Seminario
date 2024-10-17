import axios from 'axios';
import imagen from '../../images/Header Icons/categoriasImagenesMock/chupetin.jpeg';

const ENDPOINT_CATEGORIA_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

// import categoriasMock from './categoria.mocks';

const getAllCategorias = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_CATEGORIA_URL}/categorias`);
        return response.data.body.map((c) => {
            return {
                id: c.categoriaId,
                nombre: c.categoriaNombre.toUpperCase(),
                imagen: imagen
            }
        })
    } catch (error) {
        return []
    }

};

const categoriaService = {
    getAllCategorias,
}

export default categoriaService;