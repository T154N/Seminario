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
            numeroPedido: p.pedido_nro,
            nombre: `${p.nombre_cliente} ${p.apellido_cliente}`,
            email: p.email_cliente,
            direccionEntrega: p.pedido_direccion_entrega,
            fecha: p.pedido_fecha_alta,
            montoTotal: p.pedido_total_dinero,
            estado: p.estado_pedido_id,
            estadoRegistro: p.estado_pedido_registro,

            productos: p.productos || [],//verificar si se puede hacer un map de productos
            observaciones: p.observaciones || "Sin observaciones",

            //productos: [
            //    { id: 101, nombre: 'Pila', cantidad: 2, precioUnitario: 10000 },
            //    { id: 102, nombre: 'Producto B', cantidad: 1, precioUnitario: 30140 },
            //    { id: 103, nombre: 'Producto C', cantidad: 3, precioUnitario: 15000 },
            //    { id: 104, nombre: 'Producto D', cantidad: 4, precioUnitario: 20000 },
            //    { id: 105, nombre: 'Producto E', cantidad: 5, precioUnitario: 25000 },
            //    { id: 106, nombre: 'Producto F', cantidad: 6, precioUnitario: 30000 },
            //    { id: 107, nombre: 'Producto G', cantidad: 7, precioUnitario: 35000 },
            //    { id: 108, nombre: 'Producto H', cantidad: 8, precioUnitario: 40000 },
            //    { id: 109, nombre: 'Producto I', cantidad: 9, precioUnitario: 45000 },
            //    { id: 110, nombre: 'Producto J', cantidad: 10, precioUnitario: 50000 },
            //    { id: 111, nombre: 'Producto K', cantidad: 11, precioUnitario: 55000 }]

        }));



        console.log("Listado de todos los pedidos:", pedidos);

        return pedidos;
    } catch (error) {
        console.error(error);
        return [];
    }
};


const getPedidoDetalles = async (pedidoID) => {
    try {
        const response = await axios.get(`${ENDPOINT_PEDIDO_URL}/pedidos/detalle`, {
            params: { pedidoID }
        });

        // Estructura de los detalles de pedido
        const detalles = response.data.body.map(detalle => ({
            pedidoID: detalle.pedidoID,
            detalleID: detalle.detalleID,
            cantidad: detalle.cantidad,
            precioIndividual: detalle.precioIndividual,
            subtotal: detalle.subtotal,
            productoID: detalle.productoID,
            productoName: detalle.productoName,
            medioPagoID: detalle.medioPagoID,
            medioPagoName: detalle.medioPagoName
        }));

        console.log("Detalles del pedido:", detalles);
        return detalles;

    } catch (error) {
        console.error("Error al obtener los detalles del pedido:", error);
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
            null,  // No enviamos cuerpo, pero necesitamos incluir null para agregar los query params.
            {
                params: {
                    pedidoId,
                    estadoId,
                    usuarioTransaccion,
                    estado
                }
            }
        );
        console.log("Pedido actualizado exitosamente:", response.data);
        console.log(estadoId)
        return response.status;
    } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error?.response?.data || error.message);
        return error?.response?.status || 500;
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
    getAllPedidosBaja,
    getPedidoDetalles
};

export default pedidoService;