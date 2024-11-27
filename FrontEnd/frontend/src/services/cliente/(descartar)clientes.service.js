import axios from "axios";

const ENDPOINT_CLIENTE_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const findAllClientes = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_CLIENTE_URL}/clientes`);
        if (response.data.status === 400) {
            return 400;
        }
        return {
            clientes: response.data.body,
        };
    } catch (error) {
        console.error("Error fetching all clientes:", error);
        return { error: error.message };
    }
};

const findClienteById = async (id) => {
    try {
        const response = await axios.get(`${ENDPOINT_CLIENTE_URL}/clientes/${id}`);
        if (response.data.status === 400) {
            return 400;
        }
        return {
            cliente: response.data.body,
        };
    } catch (error) {
        console.error("Error fetching cliente by id:", error);
        return { error: error.message };
    }
};

const createCliente = async (newClienteUsuarioDomicilioDTO) => {
    try {
        const response = await axios.post(`${ENDPOINT_CLIENTE_URL}/clientes/new`, newClienteUsuarioDomicilioDTO);
        if (response.data.status === 400) {
            return 400;
        }
        return {
            cliente: response.data.body,
        };
    } catch (error) {
        console.error("Error creating cliente:", error);
        return { error: error.message };
    }
};

const validateCliente = async (email, documento) => {
    try {
        const response = await axios.get(`${ENDPOINT_CLIENTE_URL}/clientes/validatecliente`, {
            params: { email, documento },
        });
        if (response.data.status === 400) {
            return 400;
        }
        return {
            message: response.data.body,
        };
    } catch (error) {
        console.error("Error validating cliente:", error);
        return { error: error.message };
    }
};

const updateCliente = async (updateClienteUsuario, setbaja) => {
    try {
        const response = await axios.put(`${ENDPOINT_CLIENTE_URL}/clientes/upd/`, updateClienteUsuario, {
            params: { setbaja },
        });
        if (response.data.status === 400) {
            return 400;
        }
        return {
            message: response.data.body,
        };
    } catch (error) {
        console.error("Error updating cliente:", error);
        return { error: error.message };
    }
};

const setActivoCliente = async (usuarioEmail, usuarioMod) => {
    try {
        const response = await axios.put(`${ENDPOINT_CLIENTE_URL}/clientes/setact/`, null, {
            params: { usuarioEmail, usuarioMod },
        });
        if (response.data.status === 400) {
            return 400;
        }
        return {
            message: response.data.body,
        };
    } catch (error) {
        console.error("Error setting cliente active:", error);
        return { error: error.message };
    }
};

const findClientesByFilter = async (filtroClienteDTO) => {
    try {
        const response = await axios.post(`${ENDPOINT_CLIENTE_URL}/clientes/filter`, filtroClienteDTO);
        if (response.data.status === 400) {
            return 400;
        }
        return {
            clientes: response.data.body,
        };
    } catch (error) {
        console.error("Error fetching clientes with filter:", error);
        return { error: error.message };
    }
};

export {
    findAllClientes,
    findClienteById,
    createCliente,
    validateCliente,
    updateCliente,
    setActivoCliente,
    findClientesByFilter,
};
