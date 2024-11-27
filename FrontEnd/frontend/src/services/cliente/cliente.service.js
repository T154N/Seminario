import axios from 'axios';
import loginService from "../login/login.service";

const ENDPOINT_CLIENTE_URL = process.env.REACT_APP_SEMINARIO_BACKEND_URL;
const ENDPOINT_NOAUTH = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const getClienteById = async (id) => { // Agregar el parámetro `id` para buscar cliente por ID.
    try {
        const response = await axios.get(`${ENDPOINT_CLIENTE_URL}/clientes/${id}`);
        if (response.data.status === 400) {
            return 400;
        }
        if (response.data.body) {
            const c = response.data.body;
            return {
                id: c.cliente_id,
                documento: c.cliente_documento,
                tipoDocumento: c.cliente_tipo_documento,
                cuit: c.cliente_cuit,
                apellido: c.cliente_apellido,
                nombre: c.cliente_nombre,
                email: c.cliente_email,
                telefono: c.cliente_telefono,
                estado: c.cliente_estado_id,
                fechaAlta: c.cliente_fecha_alta,
                fechaModificacion: c.cliente_fecha_modificacion,
                fechaBaja: c.cliente_fecha_baja,
                usuarioAlta: c.cliente_usuario_alta,
                usuarioModificacion: c.cliente_usuario_modificacion,
                usuarioBaja: c.cliente_usuario_baja,
                observaciones: c.cliente_observaciones,
                domicilios: c.domicilios?.map((domicilio) => ({ // Uso de c.domicilios con validación opcional.
                    id: domicilio.domicilio_id,
                    tipo: domicilio.domicilioTipoDomicilioId.tipo_domicilio_descripcion,
                    direccion: domicilio.domicilioDireccion,
                    barrio: domicilio.domicilioBarrio,
                    localidadId: domicilio.domicilioLocalidadId,
                    estadoId: domicilio.domicilioEstadoId,
                    codigoPostal: domicilio.domicilioCodigoPostal,
                    esPrincipal: domicilio.domicilioEsPrincipal === "Y",
                })) || [],
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
        const response = await axios.get(`${ENDPOINT_CLIENTE_URL}/api/v1/clientes`);
        console.log(response);

        console.log(response.data.body);
        if (response.data.status === 400) {
            return 400;
        }
        if (response.data.body) {
            return response.data.body.map((c) => ({
                id: c.cliente_id,
                documento: c.cliente_documento,
                tipoDocumento: c.cliente_tipo_documento,
                cuit: c.cliente_cuit,
                apellido: c.cliente_apellido,
                nombre: c.cliente_nombre,
                email: c.cliente_email,
                telefono: c.cliente_telefono,
                estado: c.cliente_estado_id,
                fechaAlta: c.cliente_fecha_alta,
                fechaModificacion: c.cliente_fecha_modificacion,
                fechaBaja: c.cliente_fecha_baja,
                usuarioAlta: c.cliente_usuario_alta,
                usuarioModificacion: c.cliente_usuario_modificacion,
                usuarioBaja: c.cliente_usuario_baja,
                observaciones: c.cliente_observaciones,
                domicilios: c.domicilios?.map((domicilio) => ({
                    id: domicilio.domicilio_id,
                    tipo: domicilio.domicilioTipoDomicilioId.tipo_domicilio_descripcion,
                    direccion: domicilio.domicilioDireccion,
                    barrio: domicilio.domicilioBarrio,
                    localidadId: domicilio.domicilioLocalidadId,
                    estadoId: domicilio.domicilioEstadoId,
                    codigoPostal: domicilio.domicilioCodigoPostal,
                    esPrincipal: domicilio.domicilioEsPrincipal === "Y",
                })) || [],
                pedidos: c.pedidos || [],
                carritos: c.carritos || [],
            }));
        }
    } catch (error) {
        console.error("Error fetching all clientes:", error);
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
        const cliente = response.data.body.map((c) => {
            return {
                nombre: c.cliente_nombre,
                apellido: c.cliente_apellido,
                clienteId: c.cliente_id,
                domicilioId: c.domicilios[0]?.domicilio_id, // Validación de existencia.
                domicilioNombre: c.domicilios[0]?.domicilioDireccion // Validación de existencia.
            };
        });
        localStorage.setItem('domicilioId', cliente[0]?.domicilioId || '');
        localStorage.setItem('direccionNombre', cliente[0]?.domicilioNombre || '');
        return cliente[0];
    } catch (error) {
        console.error("Error fetching datos cliente pedido:", error);
        return 400;
    }
};

const clienteService = {
    getAllClientes,
    getClienteById,
    getDatosClientePedido,
};

export default clienteService;
