import axios from 'axios';
const ENDPOINT_CLIENTE_URL = process.env.REACT_APP_SEMINARIO_BACKEND_URL;

const getAllClientes = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_CLIENTE_URL}/clientes`);
        console.log(response);
        return response.data.body.map((c) => {
            return {
                id: c.cliente_id,
                nombre: c.cliente_nombre,
                apellido: c.cliente_apellido,
                cuit: c.cliente_cuit,
                telefono: c.cliente_telefono,
                email:c.cliente_email,
                observaciones: c.cliente_observaciones,
                domicilio: c.domicilios,
                estado: c.cliente_estado_id
            }
        })
    }catch (error) {
        return []
    }

}
const getClienteById = async (id) => {
    try {
        const response = await axios.get(`${ENDPOINT_CLIENTE_URL}/clientes/${id}`);
        console.log(response);

        if (response.data.body) {
            const c = response.data.body;
            return {
                id: c.cliente_id,
                nombre: c.cliente_nombre,
                apellido: c.cliente_apellido,
                cuit: c.cliente_cuit,
                telefono: c.cliente_telefono,
                email:c.cliente_email,
                observaciones: c.cliente_observaciones,
                domicilio: c.domicilios,
                estado: c.cliente_estado_id
            };
        }

    } catch (error) {
        console.error(error);
        return null; // Puedes devolver un objeto vacío o algo más adecuado para manejar el error
    }
};


const clienteService = {
    getAllClientes,
    getClienteById
}

export default clienteService;