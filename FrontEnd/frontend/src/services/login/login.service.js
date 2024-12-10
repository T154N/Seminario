import axios from 'axios';
// import CryptoJS from "crypto-js";

const LOGIN_API_URL = process.env.REACT_APP_SEMINARIO_BACKEND_URL;
const ENDPOINT_NOAUTH = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;
// const ENCRYPTION_KEY_NOT_PARSED = process.env.REACT_APP_ENCRYPTION_KEY;
// const ENCRYPTION_KEY = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY_NOT_PARSED);



// Error 1: Correo o contraseña incorrectos
// Error 2: El token guardado ya no es válido
// Respuesta 200: Inicio de sesión correcto
// Respuesta 400: Error en el servidor

const iniciarSesion = async (email, password) => {
    try {
        // const encryptedPassword = CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
        const encryptedPassword = await getEncryptedPassword(password);
        console.log(encryptedPassword)
        const response = await axios.post(`${LOGIN_API_URL}/rest/auth/login`, {
            email: email, 
            password: encryptedPassword.toString()
        });
        if (response.status === 200) {
            if (response.data.status === 200 && response.data.body.token) {
                localStorage.setItem('token', response.data.body.token);
                localStorage.setItem('email', response.data.body.email);
                localStorage.setItem('rol', response.data.body.rol);
                return response;
            }
        }
        return response;
    } catch (err) {
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

const getDatosParaRegistro = async () => {
    try {
        const response = await axios.get(`${ENDPOINT_NOAUTH}/getDatosRegistro`);
        const datosMapeados = {
            tipoDomicilios: response.data.body.tipoDomicilios.map((d) => ({
                id: d.tipo_domicilio_id,
                nombre: d.tipo_domicilio_descripcion
            })),
            roles: response.data.body.roles.map((r) => ({
                id: r.rol_id,
                nombre: r.rolNombre
            })).filter((r) => r.nombre === "CLIENTE")
        };
        return datosMapeados;
    } catch (err) {
        return {tipoDomicilios: [], roles: []};
    }
}

const crearCuenta = async (nombre, apellido, dni, telefono, 
    correo, password, direccion, idTipoDireccion, observaciones, rolId) => {
   try {
    // const encryptedPassword = CryptoJs.AES.encrypt(password, ENCRYPTION_KEY).toString();
    const encryptedPassword = await getEncryptedPassword(password);
    const response = await axios.post(`${ENDPOINT_NOAUTH}/clientes/new`, {
        cliente_documento: dni,
        cliente_tipo_documento: "DNI",
        cliente_cuit: "",
        cliente_apellido: apellido,
        cliente_nombre: nombre,
        cliente_email: correo,
        cliente_telefono: telefono,
        cliente_observaciones: "",
        domicilioTipoDomicilioId: idTipoDireccion,
        domicilioDireccion: direccion,
        domicilioBarrio: "",
        domicilioUbicacion: "",
        domicilioLocalidadId: 545,
        domicilioCodigoPostal: "",
        domicilioEsPrincipal: "Y",
        usuario_contrasena: encryptedPassword.toString(),
        usuario_rol_id: rolId,
        usuario_observaciones: "",
        usuario_alta: "CLIENTE"
    });
    return response;
   } catch (err) {
        console.log(err)
       return 400;
   }
}

const crearCuentaAdmin = async (nombre, apellido, dni, telefono,
                           correo, password, direccion, idTipoDireccion, observaciones, rolId) => {
    try {
        // const encryptedPassword = CryptoJs.AES.encrypt(password, ENCRYPTION_KEY).toString();
        const encryptedPassword = await getEncryptedPassword(password);
        const response = await axios.post(`${ENDPOINT_NOAUTH}/clientes/new`, {
            cliente_documento: dni,
            cliente_tipo_documento: "DNI",
            cliente_cuit: "",
            cliente_apellido: apellido,
            cliente_nombre: nombre,
            cliente_email: correo,
            cliente_telefono: telefono,
            cliente_observaciones: "",
            domicilioTipoDomicilioId: idTipoDireccion,
            domicilioDireccion: direccion,
            domicilioBarrio: "",
            domicilioUbicacion: "",
            domicilioLocalidadId: 545,
            domicilioCodigoPostal: "",
            domicilioEsPrincipal: "Y",
            usuario_contrasena: encryptedPassword.toString(),
            usuario_rol_id: rolId,
            usuario_observaciones: "",
            usuario_alta: "ADMIN"
        });
        return response;
    } catch (err) {
        console.log(err)
        return 400;
    }
}


const crearCuentaClienteAdmin = async (nombre, apellido, dni, telefono,
                                correo, password, direccion, idTipoDireccion, observaciones ) => {
    try {
        // const encryptedPassword = CryptoJs.AES.encrypt(password, ENCRYPTION_KEY).toString();
        const encryptedPassword = await getEncryptedPassword(password);
        const response = await axios.post(`${ENDPOINT_NOAUTH}/clientes/new`, {
            cliente_documento: dni,
            cliente_tipo_documento: "DNI",
            cliente_apellido: apellido,
            cliente_nombre: nombre,
            cliente_email: correo,
            cliente_telefono: telefono,
            cliente_observaciones: "",
            domicilioTipoDomicilioId: idTipoDireccion,
            domicilioDireccion: direccion,
            domicilioBarrio: "",
            domicilioUbicacion: "",
            domicilioLocalidadId: 545,
            domicilioCodigoPostal: "5000",
            domicilioEsPrincipal: "Y",
            usuario_contrasena: encryptedPassword.toString(),
            usuario_rol_id: 3,
            usuario_observaciones: observaciones,
            usuario_alta: "ADMIN"
        });
        return response;
    } catch (err) {
        console.log(err)
        return 400;
    }
}

const getCorreoRecuperacion = async (correo) => {
    try {
        const response = await axios.post(`${LOGIN_API_URL}/rest/auth/forgot-password?email=${correo}`);
        return response;
    } catch (err) {
        return 400;
    }
}

const confirmarResetPassword = async (token, password) => {
    try {
        const encryptedPassword = await getEncryptedPassword(password);
        const response = await axios.post(`${LOGIN_API_URL}/rest/auth/reset-password`, {}, {
            params: {
                token: token,
                newPassword: encryptedPassword.toString()
            }
        });
        return response;
    } catch (err) {
        return 400;
    }
}

const getEncryptedPassword = async (password) => {
    try {
        const pass = password.toString();
        const response = await axios.post(`${ENDPOINT_NOAUTH}/encryption/encrypt`, pass, {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        console.log(response.data)
        return response.data
    } catch (err) {
        return 400;
    }
}

const getEmailUsuario = () => {
    return localStorage.getItem('email');
}

const esAdmin = () => {
    return localStorage.getItem('rol') === 'ADMIN' || localStorage.getItem('rol') === 'SUPERUSER';
}

const loginService = {
    iniciarSesion,
    estaIniciadaSesion,
    cerrarSesion,
    crearCuenta,
    getDatosParaRegistro,
    getCorreoRecuperacion,
    confirmarResetPassword,
    getEmailUsuario,
    esAdmin,
    crearCuentaAdmin,
    crearCuentaClienteAdmin
}


export default loginService;