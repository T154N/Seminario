import axios from 'axios';
import loginService from "../login/login.service";

const ENDPOINT_CLIENTE_URL = process.env.REACT_APP_SEMINARIO_BACKEND_URL;
const ENDPOINT_NOAUTH = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const getAllClientes = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_CLIENTE_URL}/clientes`);
        console.log(response);
        return response.data.body.map((c) => {
            return {
                id: c.cliente_id,
                nombre: c.cliente_nombre,
                apellido: c.cliente_apellido,
                cuit: c.cliente_cuit,
                telefono: c.cliente_telefono,
                email:c.cliente_email,
                observaciones: c.cliente_observaciones,
                domicilio: c.domicilios,
                estado: c.cliente_estado_id
            }
        })
    } catch (error) {
        return []
    }

}

const getClienteById = async (id) => {
    try {
        const response = await axios.get(`${ENDPOINT_NOAUTH}/clientes/${id}`);

        if (response.data.body) {
            const c = response.data.body;
            if (c.cliente_estado_id === 1) {
                const domiciliosFiltrados = c.domicilios.filter(d => d.domicilioEstadoId === 1);
                return {
                    id: c.cliente_id,
                    nombre: c.cliente_nombre,
                    apellido: c.cliente_apellido,
                    cuit: c.cliente_cuit,
                    telefono: c.cliente_telefono,
                    email: c.cliente_email,
                    observaciones: c.cliente_observaciones,
                    domicilio: domiciliosFiltrados,
                    estado: c.cliente_estado_id,
                    dni: c.cliente_documento
                };
            } else {
                return null; // or handle it as needed
            }
        }

    } catch (error) {
        console.error(error);
        return null; // Puedes devolver un objeto vacío o algo más adecuado para manejar el error
    }
};

const getDatosClientePedido = async () => {
    try {
        const email = loginService.getEmailUsuario();
        const response = await axios.post(`${ENDPOINT_NOAUTH}/clientes/filter`, {
            id: 0,
            nombre: "",
            apellido: "",
            email: email.toString(),
            telefono: "",
            direccion: "",
            estadoId: 0,
            documento: ""
        });
        const cliente = response.data.body.map((c) => {
            return {
                nombre: c.cliente_nombre,
                apellido: c.cliente_apellido,
                clienteId: c.cliente_id,
                domicilioId: c.domicilios[0].domicilio_id,
                domicilioNombre: c.domicilios[0].domicilioDireccion
            };
        });
        localStorage.setItem('domicilioId', cliente[0].domicilioId);
        localStorage.setItem('direccionNombre', cliente[0].domicilioNombre);
        return cliente[0]
    } catch (error) {
        console.error(error);
        return 400;
    }
};

const modificarDatosCliente = async (usuarioId, clienteDocumento, clienteNombre, clienteApellido, clienteTelefono,
                                     clienteEmail) => {
    try {
        const response = await axios.put(`${ENDPOINT_NOAUTH}/clientes/updClienteContacto/?setbaja=false`, {
            clienteId: usuarioId,
            clienteNombre: clienteNombre,
            clienteApellido: clienteApellido,
            clienteDocumento: clienteDocumento.toString(),
            clienteTipoDocumento: "",
            clienteCuit: "",
            clienteTelefono: clienteTelefono.toString(),
            usuarioUpdate: localStorage.getItem('email'),
            clienteEmail: clienteEmail,
        });
        return response
    } catch (err) {
        return 400;
    }
};

const clienteService = {
    getAllClientes,
    getClienteById,
    getDatosClientePedido,
    modificarDatosCliente
}

export default clienteService;