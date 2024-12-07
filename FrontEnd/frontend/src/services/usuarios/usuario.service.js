import axios from 'axios';
const ENDPOINT_USUARIO_URL = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const getAllUsuarios = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_USUARIO_URL}/usuarios`);
        console.log(response);
        return response.data.body.map((u) => {
            return {
                id: u.usuario_id,
                nombre: u.nombre,
                apellido: u.apellido,
                email: u.email,
                telefono: u.telefono,
                direccion: u.direccion,
                localidad: u.localidad,
                provincia: u.provincia,
                pais: u.pais,
                fechaNacimiento: u.fechaNacimiento,
                dni: u.dni,
                estado: u.estado
            }
        })
    }catch (error) {
        return []
    }
};

const modificarDatosUsuario = async (usuarioId, clienteDocumento, clienteNombre, clienteApellido, clienteTelefono,
                                     clienteEmail) => {
    try {
        let rolId = 0;
        let rolNombre = localStorage.getItem('rol');
        if (rolNombre === 'SUPERUSER') {
            rolId = 1;
        } else if (rolNombre === 'ADMIN') {
            rolId = 2;
        } else if (rolNombre === 'CLIENTE') {
            rolId = 3;
        } else if (rolNombre === 'EMPLEADO') {
            rolId = 4;
        };
        const response = await axios.put(`${ENDPOINT_USUARIO_URL}/clientes/upd/?setbaja=false`, {
            usuario_id: usuarioId,
            cliente_documento: clienteDocumento,
            cliente_tipo_documento: "DNI",
            cliente_cuit: "",
            cliente_apellido: clienteApellido,
            cliente_nombre: clienteNombre,
            cliente_email: clienteEmail,
            cliente_telefono: clienteTelefono,
            cliente_observaciones: "",
            domicilioTipoDomicilioId: 0,
            domicilioDireccion: "",
            domicilioBarrio: "",
            domicilioUbicacion: "",
            domicilioLocalidadId: 0,
            domicilioCodigoPostal: "0",
            domicilioEsPrincipal: "Y",
            usuario_contrasena: null,
            usuario_rol_id: rolId,
            usuario_observaciones: "",
            usuario_alta: clienteEmail
        });
        console.log("Usuario modificado: ", response);
        return response
    } catch (err) {
        return 400;
    }
};

const usuariosService = {
    getAllUsuarios,
    modificarDatosUsuario
}

export default usuariosService;