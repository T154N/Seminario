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
