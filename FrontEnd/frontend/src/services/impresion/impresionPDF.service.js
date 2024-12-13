import axios from "axios";

const ENDPOINT_IMPRESION_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const imprimirPDF = async (pedidoId) => {
    try {
        const response = await axios.get(`${ENDPOINT_IMPRESION_URL}/impresion/pedido/${pedidoId}`, { responseType: 'blob' });
        console.log(response);
        return response;
    } catch (err) {
        return 400;
    }
};

const impresionPDFService = {
    imprimirPDF,
};

export default impresionPDFService;