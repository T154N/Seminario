//import axios from 'axios';

import categoriasMock from './categoria.mocks';

const getAllCategorias = async () => {
    try {
        return categoriasMock;
    } catch (error) {
        return []
    }

};

const categoriaService = {
    getAllCategorias,
}

export default categoriaService;