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
        console.error("Error fetching cliente by id:", error);
        return { error: error.message };
    }
};

const getAllClientes = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_NOAUTH}/getclientes`);
        console.log(response);

        if (response.data.status === 400) {
            return 400;
        }

        if (response.data.body) {
            return response.data.body.map((c) => ({
                id: c.clienteId,
                idUsuario: c.clienteUsuarioId, // No se usa en los ejemplos, pero mantenido por consistencia
                documento: c.clienteDocumento,
                tipoDocumento: c.clienteTipoDocumento,
                cuit: c.clienteCuit, // No se usa en los ejemplos, pero mantenido por consistencia
                apellido: c.clienteApellido,
                nombre: c.clienteNombre,
                email: c.clienteEmail,
                telefono: c.clienteTelefono,
                estado: c.clienteEstadoId,
                fechaAlta: c.clienteFechaAlta,
                fechaModificacion: c.clienteFechaModificacion,
                fechaBaja: c.clienteFechaBaja,
                usuarioAlta: c.clienteUsuarioAlta, // Parece no estar en uso
                usuarioModificacion: c.clienteUsuarioModificacion, // Parece no estar en uso
                usuarioBaja: c.clienteUsuarioBaja, // Parece no estar en uso
                observaciones: c.clienteObservaciones,
                domicilioId: c.domicilioId,
                barrio: c.domicilioBarrio,
                codigoPostal: c.domicilioCodigoPostal,
                direccion: c.domicilioDireccion,
                ubicacion: c.domicilioUbicacion, // Corregido typo de "ubicaion" a "ubicacion"
                localidad: c.localidadNombre,
                provincia: c.provinciaNombre,
                tipoDomicilio: c.tipoDomicilioDescripcion,
                pedidos: c.pedidos || [], // Atributo opcional que no aparece en el ejemplo actual
                carritos: c.carritos || [], // Atributo opcional que no aparece en el ejemplo actual
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

const createClienteConUsuarioYDomicilios = async (clienteData) => {
    console.log("Se activo la funcion de crear cliente", clienteData);
    try {
        const response = await axios.post(`${ENDPOINT_NOAUTH}/clientes/new`, clienteData);
        console.log(response);
        console.log(response.data);
        console.log(response.data.body);
        console.log('Se creo el cliente');

        return response.data;
    } catch (error) {
        console.error("Error al crear cliente:", error);
        console.log("Error al crear cliente:", error);
        throw error;
    }
};

const darDeBajaCliente = async (cliente, usuarioAlta) => {
    try {
        // Mapeo del cliente al formato del DTO
        const body = {
            usuario_id: cliente.idUsuario,
            cliente_documento: cliente.documento,
            cliente_tipo_documento: cliente.tipoDocumento,
            cliente_apellido: cliente.apellido,
            cliente_nombre: cliente.nombre,
            cliente_email: cliente.email,
            cliente_telefono: cliente.telefono,
            cliente_observaciones: cliente.observaciones,
            cliente_cuit: cliente.cuit, // Si es null o no se utiliza, puede dejarse tal cual
            domicilioTipoDomicilioId: 0, // No proporcionado en cliente, ajustar según sea necesario
            domicilioDireccion: cliente.direccion,
            domicilioBarrio: cliente.barrio,
            domicilioUbicacion: cliente.ubicacion, 
            domicilioLocalidadId: 545, 
            domicilioCodigoPostal: cliente.codigoPostal,
            domicilioEsPrincipal: 'Y',  
            usuario_contrasena: "", 
            usuario_rol_id: 1, 
            usuario_observaciones: " ", // No proporcionado en cliente, ajustar si es necesario
            usuario_alta: usuarioAlta,
        };

        // Realizar la solicitud PUT para dar de baja al cliente
        const response = await axios.put(
            `${ENDPOINT_NOAUTH}/clientes/upd`,
            body,
            { params: { setbaja: true } }
        );

        if (response.status === 200) {
            console.log("Cliente dado de baja correctamente");
            console.log(cliente, usuarioAlta);
            console.log(response);
            return response.data;
        } else {
            console.error("Error al intentar dar de baja al cliente:", response.data.message);
            return { error: response.data.message };
        }
    } catch (error) {
        console.error("Error al dar de baja cliente:", error);
        return { error: error.message };
    }
};

const modificarCliente = async (cliente, usuarioAlta) => {
    try {
        // Mapeo del cliente al formato del DTO
        const body = {
            usuario_id: cliente.idUsuario,
            cliente_documento: cliente.documento,
            cliente_tipo_documento: cliente.tipoDocumento,
            cliente_apellido: cliente.apellido,
            cliente_nombre: cliente.nombre,
            cliente_email: cliente.email,
            cliente_telefono: cliente.telefono,
            cliente_observaciones: cliente.observaciones,
            cliente_cuit: cliente.cuit, 
            domicilioTipoDomicilioId: 0, 
            domicilioDireccion: cliente.direccion,
            domicilioBarrio: cliente.barrio,
            domicilioUbicacion: cliente.ubicacion, 
            domicilioLocalidadId: 545, 
            domicilioCodigoPostal: cliente.codigoPostal,
            domicilioEsPrincipal: 'Y',  
            usuario_contrasena: "", 
            usuario_rol_id: 1, 
            usuario_observaciones: " ", 
            usuario_alta: usuarioAlta,
        };
        console.log("Se activo la funcion de modificar cliente", body);

        // Realizar la solicitud PUT para dar de baja al cliente
        const response = await axios.put(
            `${ENDPOINT_NOAUTH}/clientes/upd`,
            body,
            { params: { setbaja: false } }
        );

        if (response.status === 200) {
            console.log("Cliente dado de baja correctamente");
            console.log(cliente, usuarioAlta);
            console.log(response);
            return response.data;
        } else {
            console.error("Error al intentar dar de baja al cliente:", response.data.message);
            return { error: response.data.message };
        }
    } catch (error) {
        console.error("Error al dar de baja cliente:", error);
        return { error: error.message };
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

    getDomicilioByClienteId,
    createClienteConUsuarioYDomicilios,
    darDeBajaCliente,
    modificarCliente,
    modificarDatosCliente

};



export default clienteService;
