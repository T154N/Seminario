import axios from 'axios';
import loginService from "../login/login.service";


const ENDPOINT_NOAUTH = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const getDomicilioByClienteId = async (clienteId) => {
    try {
        const response = await axios.get(`${ENDPOINT_NOAUTH}/domicilios/cliente/${clienteId}`);

        if (response.data.status === 400) {
            return 400;
        }
        if (Array.isArray(response.data.body)) {
            return response.data.body.map(d => ({
                id: d.domicilio_id,
                direccion: d.domicilioDireccion,
                ubicacion: d.domicilioUbicacion || "",
                barrio: d.domicilioBarrio || "",
                codigoPostal: d.domicilioCodigoPostal || "",
                localidad: d.domicilioLocalidadId,
                provincia: null, // No hay datos de provincia en el body proporcionado
                tipoDomicilio: d.domicilioTipoDomicilioId?.tipo_domicilio_descripcion || "",
            }));
        }

        return [];
    } catch (error) {
        console.error("Error fetching domicilio by cliente id:", error);
        return { error: error.message };
    }
};




const getClienteById = async (id) => { // Agregar el parámetro `id` para buscar cliente por ID.
    try {
        const response = await axios.get(`${ENDPOINT_NOAUTH}/clientes/${id}`);
        if (response.data.status === 400) {
            return 400;
        }
        if (response.data.body) {
            const c = response.data.body;
            return {
                id: c.clienteId,
                documento: c.clienteDocumento,
                tipoDocumento: c.clienteTipoDocumento,
                cuit: c.clienteCuit,
                apellido: c.clienteApellido,
                nombre: c.clienteNombre,
                email: c.clienteEmail,
                telefono: c.clienteTelefono,
                estado: c.clienteEstadoId,
                fechaAlta: c.clienteFechaAlta,
                fechaModificacion: c.clienteFechaModificacion,
                fechaBaja: c.clienteFechaBaja,
                usuarioAlta: c.clienteUsuarioAlta,
                usuarioModificacion: c.clienteUsuarioModificacion,
                usuarioBaja: c.clienteUsuarioBaja,
                observaciones: c.clienteObservaciones,
                barrio: c.domicilioBarrio,
                codigoPostal: c.domicilioCodigoPostal,
                domicilioId: c.domicilioId,
                direccion: c.domicilioDireccion,
                ubicaion: c.domicilioUbicacion,
                localidad: c.localidadNombre,
                provincia: c.provinciaNombre,
                tipoDomicilio: c.tipoDomicilioDescripcion,
                pedidos: c.pedidos || [], // Validación para evitar undefined.
                carritos: c.carritos || [],
            };
        }
    } catch (error) {
        console.error("Error fetching cliente by id:", error);
        return { error: error.message };
    }
};

const getAllClientes = async () => { // Cambiar función para que obtenga todos los clientes sin filtrar por ID.
    try {
        const response = await axios.get(`${ENDPOINT_NOAUTH}/getclientes`);
        console.log(response);

        console.log(response.data.body);
        if (response.data.status === 400) {
            return 400;
        }
        if (response.data.body) {
            return response.data.body.map((c) => ({
                id: c.clienteId,
                documento: c.clienteDocumento,
                tipoDocumento: c.clienteTipoDocumento,
                cuit: c.clienteCuit,
                apellido: c.clienteApellido,
                nombre: c.clienteNombre,
                email: c.clienteEmail,
                telefono: c.clienteTelefono,
                estado: c.clienteEstadoId,
                fechaAlta: c.clienteFechaAlta,
                fechaModificacion: c.clienteFechaModificacion,
                fechaBaja: c.clienteFechaBaja,
                usuarioAlta: c.clienteUsuarioAlta,
                usuarioModificacion: c.clienteUsuarioModificacion,
                usuarioBaja: c.clienteUsuarioBaja,
                observaciones: c.clienteObservaciones,
                domicilioId: c.domicilioId,
                barrio: c.domicilioBarrio,
                codigoPostal: c.domicilioCodigoPostal,
                direccion: c.domicilioDireccion,
                ubicaion: c.domicilioUbicacion,
                localidad: c.localidadNombre,
                provincia: c.provinciaNombre,
                tipoDomicilio: c.tipoDomicilioDescripcion,
                pedidos: c.pedidos || [], // Validación para evitar undefined.
                carritos: c.carritos || [],
            }));
        }
    } catch (error) {
        console.error("Error fetching all clientes nose que pasaaaaaaa:", error);
        return { error: error.message };
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

        const clientes = response.data.body;
        if (!Array.isArray(clientes)) {
            throw new Error("Se esperaba un arreglo de clientes");
        }

        const cliente = clientes.map((c) => {
            return {
                nombre: c.cliente_nombre,
                apellido: c.cliente_apellido,
                clienteId: c.cliente_id,
                domicilioId: c.domicilios[0]?.domicilio_id, // Validación de existencia.
                domicilioNombre: c.domicilios[0]?.domicilioDireccion // Validación de existencia.
            };
        });

        localStorage.setItem('direccionNombre', cliente[0]?.domicilioNombre || '');
        return cliente[0];
    } catch (error) {
        console.error("Error al obtener datos del cliente pedido:", error);
        return 400;
    }
};
const clienteService = {
    getAllClientes,
    getClienteById,
    getDatosClientePedido,
    getDomicilioByClienteId
};

export default clienteService;
