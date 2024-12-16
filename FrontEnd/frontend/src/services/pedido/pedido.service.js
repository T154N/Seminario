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


const crearPedido = async (carritoId, domicilioId, medioPagoId, usuarioTransaccion) => {
    try {
        const response = await axios.post(`${ENDPOINT_PEDIDO_URL}/pedidos/generate?carritoID=${carritoId}&domicilioId=${domicilioId}&medioPagoId=${medioPagoId}&usuarioTransaccion=${usuarioTransaccion}`);
        console.log(response)
        return {
            pedidoId: response.data.body.id,
            nroPedido: response.data.body.nroPedido
        }
    } catch (err) {
        return 400;
    }
};


// Obtener todos los pedidos
const getAllPedidos = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_PEDIDO_URL}/pedidos/all`);
        console.log(response);

        const pedidos = response.data.body.map((p) => ({
            id: p.pedido_nro, // El id es el numero de pedido, que es distinto al id y NO se debe usar como id unico
            pedidoId: p.pedido_id, // Para compatibilidad de PDF
            numeroPedido: p.pedido_nro,
            nombre: `${p.nombre_cliente} ${p.apellido_cliente}`,
            email: p.email_cliente,
            direccionEnvio: p.pedido_direccion_entrega,
            fecha: p.pedido_fecha_alta,
            montoTotal: p.pedido_total_dinero,
            total: p.pedido_total_dinero,
            estado: p.estado_pedido_id,
            estadoRegistro: p.estado_pedido_registro,
            productos: p.productos || [], // verificar si se puede hacer un map de productos
            observaciones: p.observaciones || "Sin observaciones"
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
        const response = await axios.get(`${ENDPOINT_PEDIDO_URL}/pedidos/detalle?pedidoID=${pedidoID}`);
        console.log("Detalles del pedido:", response);
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



const generarPedido = async (clienteId, domicilioId, medioPagoId, usuarioTransaccion) => {
    try {
        const response = await axios.post(`${ENDPOINT_PEDIDO_URL}/pedidos/generatepedido`, null, {
            params: {
                clienteId,
                domicilioId,
                medioPagoId,
                usuarioTransaccion
            }
        });
        console.log(response);
        return response.data.body;
    } catch (error) {
        console.error(error);
        return 500;
    }
};

const addItemToPedido = async (pedidoId, cantidad, usuarioTransaccion, productoData) => {
    try {
        const response = await axios.post(
            `${ENDPOINT_PEDIDO_URL}/pedidos/add`,
            productoData,
            {
                params: {
                    pedidoId,
                    cantidad,
                    usuarioTransaccion
                }
            }
        );
        console.log("Item agregado exitosamente al pedido:", response.data);
        return response.status;
    } catch (error) {
        console.error("Error al agregar el item al pedido:", error?.response?.data || error.message);
        return error?.response?.status || 500;
    }
};

// Remover un item del pedido
const removeItemFromPedido = async (pedidoId, productoId, usuarioTransaccion) => {
    try {
        const response = await axios.put(
            `${ENDPOINT_PEDIDO_URL}/api/v1/pedidos/remove/item`,
            null,
            {
                params: {
                    pedidoId,
                    productoId,
                    usuarioTransaccion
                }
            }
        );
        console.log("Item removido exitosamente del pedido:", response.data);
        return response.status;
    } catch (error) {
        console.error("Error al remover el item del pedido:", error?.response?.data || error.message);
        return error?.response?.status || 500;
    }
};

const formatDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const getPedidosPorCadaCliente = async (clienteId) => {
    try {
        const response = await axios.get(`${ENDPOINT_PEDIDO_URL}/pedidos/getpedidoscliente`, {
            params: { clienteId }
        });

        const pedidos = await Promise.all(response.data.body.map(async (p) => {
            const productos = await getDetallePedido(p.pedido_id);
            return {
                id: p.pedido_nro, // El id es el número de pedido, que es distinto al id y NO se debe usar como id unico
                pedidoId: p.pedido_id, // El pedidoId es el id unico del pedido
                fecha: p.pedido_fecha_alta,
                fechaEstimada: p.pedido_fecha_estimada_entrega,
                total: p.pedido_total_dinero,
                // estado: p.estado_pedido,
                estado: p.estado_pedido_id,
                metodoPago: p.medio_pago,
                direccionEnvio: p.pedido_direccion_entrega,
                nombre: p.nombre_cliente + " " + p.apellido_cliente,
                productos: productos
            };
        }));

        return pedidos;
    } catch (err) {
        return [];
    }
};

const getDetallePedido = async (pedidoId) => {
    try {
        const response = await axios.get(`${ENDPOINT_PEDIDO_URL}/pedidos/detalle`, {
            params: { pedidoID: pedidoId }
        });
        return response.data.body.map((p) => ({
            id: p.productoID,
            nombre: p.productoName,
            cantidad: p.cantidad,
            precioUnitario: p.precioIndividual,
        }));
    } catch (err) {
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
    getPedidoDetalles,
    addItemToPedido,
    generarPedido,
    removeItemFromPedido,

    crearPedido,
    getPedidosPorCadaCliente
};

export default pedidoService;
