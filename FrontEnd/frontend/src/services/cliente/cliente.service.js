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


const getAllClientesActivos = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_NOAUTH}/getclientes`);
        console.log(response);

        if (response.data.status === 400) {
            return 400;
        }

        if (response.data.body) {
            return response.data.body
                .filter(c => c.clienteEstadoId === 1) // Filtrar clientes con estadoId === 1
                .map((c) => ({
                    id: c.clienteId,
                    idUsuario: c.clienteUsuarioId, // No se usa en los ejemplos, pero mantenido por consistencia
                    documento: c.clienteDocumento,
                    tipoDocumento: c.clienteTipoDocumento,
                    cuit: c.clienteCuit, // No se usa en los ejemplos, pero mantenido por consistencia
                    apellido: c.clienteApellido,
                    nombre: c.clienteNombre,
                    email: c.clienteEmail,
                    telefono: c.clienteTelefono,
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


const getAllClientes = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_NOAUTH}/getclientes`);
        console.log(response);

        if (response.data.status === 400) {
            return 400;
        }

        if (response.data.body) {
            const clientes = response.data.body.map((c) => ({
                id: c.clienteId,
                idUsuario: c.clienteUsuarioId, // No se usa en los ejemplos, pero mantenido por consistencia
                documento: c.clienteDocumento,
                tipoDocumento: c.clienteTipoDocumento,
                cuit: c.clienteCuit, // No se usa en los ejemplos, pero mantenido por consistencia
                apellido: c.clienteApellido,
                nombre: c.clienteNombre,
                email: c.clienteEmail,
                telefono: c.clienteTelefono,
                rolId: c.rolid,
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

            // Eliminar duplicados basados en el campo "id"
            const uniqueClientes = [];
            const seenIds = new Set();

            for (const cliente of clientes) {
                if (!seenIds.has(cliente.id)) {
                    uniqueClientes.push(cliente);
                    seenIds.add(cliente.id);
                }
            }

            return uniqueClientes;
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
            const domicilioPrincipal = c.domicilios.find(d => d.domicilioEsPrincipal === "Y");
            return {
                nombre: c.cliente_nombre,
                apellido: c.cliente_apellido,
                clienteId: c.cliente_id,
                domicilioId: domicilioPrincipal?.domicilio_id, // Validación de existencia.
                domicilioNombre: domicilioPrincipal?.domicilioDireccion // Validación de existencia.
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
            usuario_rol_id: cliente.rolId,
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

const activarCliente = async (usuarioEmail, usuarioMod) => {
    try {
        // Realizar la solicitud PUT al endpoint
        const response = await axios.put(
            `${ENDPOINT_NOAUTH}/clientes/setact/`,
            null, // Sin cuerpo para esta solicitud
            {
                params: {
                    usuarioEmail: usuarioEmail,
                    usuarioMod: usuarioMod,
                },
            }
        );

        if (response.status === 200) {
            console.log("Usuario/Cliente activado correctamente.");
            return response.data; // Devuelve la respuesta exitosa
        } else {
            console.error("Error al activar el Usuario/Cliente:", response.data.message);
            return { error: response.data.message };
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error.message);
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
            clienteEstadoId: cliente.estado,
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
            usuario_rol_id: cliente.rolId, 
            usuario_observaciones: " ", 
            usuario_alta: usuarioAlta,
        };
        console.log("Se activo la funcion de modificar cliente", body);
        console.log(body.clienteEstadoId);

        if (body.clienteEstadoId === 1) {
            const response = await axios.put(
                `${ENDPOINT_NOAUTH}/clientes/upd`,
                body,
                { params: { setbaja: false } }
            );

            if (response.status === 200) {
                console.log("Cliente modificado correctamente");
                console.log(cliente, usuarioAlta);
                console.log(response);
                await activarCliente(cliente.email, usuarioAlta);
                return response.data;
            } else {
                console.error("Error al intentar modificar al cliente:", response.data.message);
                return { error: response.data.message };
            }
        } else if (body.clienteEstadoId === 2) {
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
                console.error("Error al intentar modificar al cliente:", response.data.message);
                return { error: response.data.message };
            }
        }
    } catch (error) {
        console.error("Error al modificar cliente:", error);
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

const getClientesConRolId = async () => {
    try {
        // Obtener usuarios y clientes en paralelo
        const [usuarios, clientes] = await Promise.all([getAllUsuarios(), getAllClientes()]);

        // Crear un diccionario de usuarios por su id para buscar rápidamente
        const usuariosMap = new Map(usuarios.map((u) => [u.id, u.rol?.id || null]));

        // Mapear clientes para agregar el rolId
        const clientesConRolId = clientes.map((cliente) => ({
            ...cliente, // Mantiene todos los atributos originales
            rolId: usuariosMap.get(cliente.idUsuario) || null, // Agrega solo el id del rol
        }));

        return clientesConRolId;
    } catch (error) {
        console.error("Error al fusionar clientes con el rolId:", error);
        return [];
    }
};

const getAllUsuarios = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_NOAUTH}/usuarios`);
        
        // Mapea solo las propiedades que están presentes en la respuesta del backend
        return response.data.body.map((u) => {
            return {
                id: u.usuario_id,
                authorities: u.authorities.map((auth) => auth.authority), // Extrae las authorities
                rol: {
                    id: u.rol?.rol_id || null,
                    nombre: u.rol?.rolNombre || null,
                    estadoId: u.rol?.rolEstadoId || null,
                    observaciones: u.rol?.rolObservaciones || null,
                    fechaAlta: u.rol?.rolFechaAlta || null,
                    fechaModificacion: u.rol?.rolFechaModificacion || null,
                    fechaBaja: u.rol?.rolFechaBaja || null,
                    usuarioAlta: u.rol?.rolUsuarioAlta || null,
                    usuarioModificacion: u.rol?.rolUsuarioModificacion || null,
                    usuarioBaja: u.rol?.rolUsuarioBaja || null,
                }
            };
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
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
    modificarDatosCliente,
    getAllClientesActivos,
    getClientesConRolId,

};

export default clienteService;
