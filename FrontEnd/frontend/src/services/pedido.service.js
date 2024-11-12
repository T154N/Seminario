import axios from "axios";

const ENDPOINT_PEDIDO_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const crearPedido = async (carritoId, domicilioId, medioPagoId, usuarioTransaccion) => {
    try {
        const response = await axios.post(`${ENDPOINT_PEDIDO_URL}/pedidos/generate`, {}, {
            params: {
                carritoID: carritoId,
                domicilioId: domicilioId,
                medioPagoId: medioPagoId,
                usuarioTransaccion: usuarioTransaccion
            }
        });
        return {
            pedidoId: response.data.body
        }
    } catch (err) {
        return 400;
    }
};

const carritoService = {
    crearPedido
};

export default carritoService;