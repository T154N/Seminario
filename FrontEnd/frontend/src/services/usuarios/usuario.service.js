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
                estado: u.estado,
                rol: {
                    rol_id: u.rol?.rol_id || null,
                    rolNombre: u.rol?.rolNombre || null,
                    rolEstadoId: u.rol?.rolEstadoId || null,
                    rolObservaciones: u.rol?.rolObservaciones || null,
                    rolFechaAlta: u.rol?.rolFechaAlta || null,
                    rolFechaModificacion: u.rol?.rolFechaModificacion || null,
                    rolFechaBaja: u.rol?.rolFechaBaja || null,
                    rolUsuarioAlta: u.rol?.rolUsuarioAlta || null,
                    rolUsuarioModificacion: u.rol?.rolUsuarioModificacion || null,
                    rolUsuarioBaja: u.rol?.rolUsuarioBaja || null
                }
            }
        })
    } catch (error) {
        return []
    }
};

const usuariosService = {
    getAllUsuarios,
}

export default usuariosService;