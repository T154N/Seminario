import axios from 'axios';

// Utiliza la URL de tu backend
const ENDPOINT_INFORMES_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

export const obtenerAniosPedidos = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_INFORMES_URL}/pedidosanios`);

        if (response.status === 200) {
            if (response.data.status === 200 && Array.isArray(response.data.body)) {
                console.log('Años de pedidos:', response.data.body);
                return response.data.body;
            }
        }
        return response;
    } catch (err) {
        console.error('Error al obtener los años de pedidos:', err);
        return 400;
    }
};


const getTotalDXD = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_INFORMES_URL}/informes/getTotalDxD`);
        if (response.status === 200) {
            return response.data.body;
        }
    } catch (error) {
        console.error('Error al obtener el total DXD:', error);
        throw error;
    }
};
const getTotalDXS = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_INFORMES_URL}/informes/getTotalDx5`);
        if (response.status === 200) {
            return response.data.body;
        }
    } catch (error) {
        console.error('Error al obtener el total DXD:', error);
        throw error;
    }
};
const getTotalDXM = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_INFORMES_URL}/informes/getTotalDxM`);
        if (response.status === 200) {
            return response.data.body;
        }
    } catch (error) {
        console.error('Error al obtener el total DXD:', error);
        throw error;
    }
};
const getTotalDXA = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_INFORMES_URL}/informes/getTotalDxA`);
        if (response.status === 200) {
            return response.data.body;
        }
    } catch (error) {
        console.error('Error al obtener el total DXD:', error);
        throw error;
    }
};



const getProductosPedidos = async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(`${ENDPOINT_INFORMES_URL}/informes/productos/pedidos`, {
            params: { fechaInicio, fechaFin },
        });
        console.log('Respuesta completa de la API:', response);
        console.log('productos pedidos:', response.data.body);
        return response.data.body;
    } catch (error) {
        console.error('Error al obtener los productos/pedidos:', error);
        throw error;
    }
};

const getProductosClientes = async (fechaInicio, fechaFin, clienteID) => {
    try {
        const response = await axios.get(`${ENDPOINT_INFORMES_URL}/informes/productos/clientes`, {
            params: { fechaInicio, fechaFin, clienteID },
        });
        return response.data.body;
    } catch (error) {
        console.error('Error al obtener los productos/clientes:', error);
        throw error;
    }
};

const getTotalPedidosPorFecha = async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(`${ENDPOINT_INFORMES_URL}/informes/pedidos/totalpedidos`, {
            params: { fechaInicio, fechaFin },
        });
        return response.data.body;
    } catch (error) {
        console.error('Error al obtener los totalpedidos:', error);
        throw error;
    }
};

const getClientesActivos = async (fechaInicio, fechaFin, clienteId) => {
    try {
        const response = await axios.get(`${ENDPOINT_INFORMES_URL}/informes/clientes/activos`, {
            params: { fechaInicio, fechaFin, clienteId },
        });
        return response.data.body;
    } catch (error) {
        console.error('Error al obtener los clientes activos:', error);
        throw error;
    }
};

const getTotalPedidosPorMes = async (anio) => {
    try {
        const response = await axios.get(`${ENDPOINT_INFORMES_URL}/informes/pedidos/mesanio`, {
            params: { anio },
        });
        return response.data.body;
    } catch (error) {
        console.error('Error al obtener los totalpedidos por mes:', error);
        throw error;
    }
};





const informesService = {
    getProductosPedidos,
    getProductosClientes,
    getTotalPedidosPorFecha,
    getClientesActivos,
    getTotalPedidosPorMes,
    getTotalDXM,
    getTotalDXA,
    getTotalDXS,
    getTotalDXD,
};

export default informesService;