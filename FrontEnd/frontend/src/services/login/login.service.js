import axios from 'axios';

const LOGIN_API_URL = process.env.REACT_APP_SEMINARIO_BACKEND_URL;

// Error 1: Correo o contraseña incorrectos
// Error 2: El token guardado ya no es válido
// Respuesta 200: Inicio de sesión correcto
// Respuesta 400: Error en el servidor

const iniciarSesion = async (email, password) => {
    try {
        const response = await axios.post(`${LOGIN_API_URL}/rest/auth/login`, {
            email: email, 
            password: password
        });
        console.log(response);
        // Manejo de errores
        // El servidor respondio correctamente
        if (response.status === 200) {
            // El servidor respondio con un token
            if (response.data.status === 200 && response.data.body.token) {
                localStorage.setItem('token', response.data.body.token);
                localStorage.setItem('email', response.data.body.email);
                localStorage.setItem('rol', response.data.body.rol);
                return 200;
            // El servidor respondio con un error
            } else if (response.data.status === 400) {
                return 1;
            }
        }
    } catch (err) {
        console.log(err);
        return 400;
    }
}

const estaIniciadaSesion = () => {
    return localStorage.getItem('token') !== null;
}

const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
}

const loginService = {
    iniciarSesion,
    estaIniciadaSesion,
    cerrarSesion
}

export default loginService;