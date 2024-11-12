import axios from "axios";
const ENDPOINT_PEDIDO_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;




const findAllPedido = async () => {
    try{
        const response = await axios.get(`${ENDPOINT_PEDIDO_URL}/pedidos/all`);
        if (response.data.status === 400){
            return 400
        }
        return {
            pedidos: response.data.body,
        }
    }catch (error){
        console.error(error);
        return null;
    }
}

const generatePedido = async (carritoID, domicilioId, medioPagoId, usuarioTransaccion) => {
    try {
        const response = await axios.post(`${ENDPOINT_PEDIDO_URL}/pedidos/generate`, {}, {
            params: {
                carritoID,
                domicilioId,
                medioPagoId,
                usuarioTransaccion
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateStatusPedido = async (pedidoId, estadoId, usuarioTransaccion, estado) => {
    try {
        const response = await axios.put(`${ENDPOINT_PEDIDO_URL}/pedidos/updatestatus`, {}, {
            params: {
                pedidoId,
                estadoId,
                usuarioTransaccion,
                estado
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const findPedidossFilters = async (filtroPedidoDTO) => {
    try {
        const response = await axios.post(`${ENDPOINT_PEDIDO_URL}/pedidos/filter`, filtroPedidoDTO);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const pedidoService = {
    findAllPedido,
    generatePedido,
    updateStatusPedido,
    findPedidossFilters
}



export default pedidoService;
















