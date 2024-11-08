import axios from 'axios';
const ENDPOINT_CLIENTE_URL = process.env.REACT_APP_SEMINARIO_BACKEND_URL;

const getAllClientes = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_CLIENTE_URL}/clientes`);
        console.log(response);
        return response.data.body.map((c) => {
            return {
                nombre: c.cliente_nombre,
                apellido: c.cliente_apellido,
                telefono: c.cliente_telefono,
                domicilio: c.domicilio,
                estado: c.cliente_estado_id


            }
        })
    }catch (error) {
        return []
    }

}
const clienteService = {
    getAllClientes
}

export default clienteService;
