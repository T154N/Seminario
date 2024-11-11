import axios from 'axios';

const ENDPOINT_PEDIDO_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

// Obtener un pedido por su ID
const getPedidoById = async (id) => {
    try {
        const response = await axios.get(`${ENDPOINT_PEDIDO_URL}/pedidos/${id}`);
        console.log(response);

        if (response.data.body) {
            const p = response.data.body;
            console.log(p); 
            return {
                id: p.id,
                cliente: p.clienteNombre,
                fecha: p.fecha,
                montoTotal: p.montoTotal,
                estado: p.estado,
                productos: p.productos || [],
                observaciones: p.observaciones || "Sin observaciones"
            };
        }

    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener todos los pedidos
const getAllPedidos = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_PEDIDO_URL}/pedidos/all`);
        console.log(response);

        const pedidos = response.data.body.map((p) => ({
            id: p.pedido_id,
            nombre: `${p.nombre_cliente}, ${p.apellido_cliente}`,
            fecha: p.pedido_fecha_alta,
            montoTotal: p.pedido_total_dinero,
            estado: p.estado_pedido_id,
            productos: p.productos || [],
            observaciones: p.observaciones || "Sin observaciones"
        }));

        console.log("Listado de todos los pedidos:", pedidos);

        return pedidos;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener pedidos filtrados por cliente
const getPedidosPorCliente = async (clienteId) => {
    try {
        const response = await axios.get(`${ENDPOINT_PEDIDO_URL}/pedidos/cliente/${clienteId}`);
        console.log(response);

        return response.data.body.map((p) => ({
            id: p.id,
            cliente: p.clienteNombre,
            fecha: p.fecha,
            montoTotal: p.montoTotal,
            estado: p.estado,
            productos: p.productos || [],
        }));

    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener pedidos filtrados por estado
const getPedidosPorEstado = async (estado) => {
    try {
        const response = await axios.get(`${ENDPOINT_PEDIDO_URL}/pedidos/estado/${estado}`);
        console.log(response);

        return response.data.body.map((p) => ({
            id: p.id,
            cliente: p.clienteNombre,
            fecha: p.fecha,
            montoTotal: p.montoTotal,
            estado: p.estado,
            productos: p.productos || [],
        }));

    } catch (error) {
        console.error(error);
        return [];
    }
};

// Crear un nuevo pedido
const postNuevoPedido = async (data) => {
    try {
        const response = await axios.post(`${ENDPOINT_PEDIDO_URL}/pedidos`, data);
        console.log(response);
        return response.status;
    } catch (error) {
        console.error(error);
        return 500;
    }
};

// Actualizar un pedido existente
const updatePedido = async (pedidoId, data) => {
    try {
        const response = await axios.put(`${ENDPOINT_PEDIDO_URL}/pedidos/mod/${pedidoId}`, data);
        console.log(response);
        return response.status;
    } catch (error) {
        console.error(error);
        return 500;
    }
};

// Función para actualizar el estado de un pedido
const updatePedidoEstado = async (pedidoId, estadoId, usuarioTransaccion, estado) => {
    try {
        const response = await axios.put(
            `${ENDPOINT_PEDIDO_URL}/pedidos/updatestatus`, 
            null,  // No enviamos cuerpo, pero necesitamos incluir `null` para agregar los query params.
            {
                params: {
                    pedidoId,
                    estadoId,
                    usuarioTransaccion,
                    estado
                }
            }
        );
        console.log(response);
        return response.status;
    } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error);
        return 500;
    }
};

// Obtener pedidos con estado de baja (si es necesario)
const getAllPedidosBaja = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_PEDIDO_URL}/pedidos/baja`);
        console.log(response);

        return response.data.body.map((p) => ({
            id: p.id,
            cliente: p.clienteNombre,
            fecha: p.fecha,
            montoTotal: p.montoTotal,
            estado: p.estado,
            productos: p.productos || [],
        }));

    } catch (error) {
        console.error(error);
        return [];
    }
};

// Definir el objeto de servicio de pedidos
const pedidoService = {
    getPedidoById,
    getAllPedidos,
    getPedidosPorCliente,
    getPedidosPorEstado,
    postNuevoPedido,
    updatePedido,
    updatePedidoEstado, // Agregado aquí
    getAllPedidosBaja
};

export default pedidoService;
