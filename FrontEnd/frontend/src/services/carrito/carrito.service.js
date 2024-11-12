import axios from "axios";

const ENDPOINT_CARRITO_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const newCarrito = async (carrito) => {
    axios.post(`${ENDPOINT_CARRITO_URL}/new`, {
        params: {
            clienteId: carrito.clienteId,
            usuarioTransaccion: carrito.usuarioTransaccion
        },
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}