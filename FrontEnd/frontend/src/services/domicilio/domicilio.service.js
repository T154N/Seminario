import axios from "axios";

const ENDPOINT_DOMICILIO = process.env.REACT_APP_SEMINARIO_BACKEND_NOAUTH_URL;

const modificarDomicilio = async (domicilioId, tipoDomicilioId, domicilioDireccion) => {
    try {
        const response = await axios.put(`${ENDPOINT_DOMICILIO}/domicilios/upddomicilio/?setbaja=false`, {
            domicilioId: domicilioId,
            domicilioTipoDomicilioId: tipoDomicilioId,
            domicilioDireccion: domicilioDireccion,
            domicilioBarrio: "",
            domicilioUbicacion: "",
            domicilioLocalidadId: "",
            domicilioCodigoPostal: "",
            domicilioEsPrincipal: "",
            domicilioObservaciones: "",
            usuario_alta: localStorage.getItem('email'),
        });
        return response
    } catch (err) {
        return 400;
    }
};

const eliminarDomicilio = async (domicilioId) => {
    try {
        const response = await axios.put(`${ENDPOINT_DOMICILIO}/domicilios/upddomicilio/?setbaja=true`, {
            domicilioId: domicilioId,
        });
        return response
    } catch (err) {
        return 400;
    }
};

const agregarDomicilio = async (tipoDomicilioId, domicilioDireccion) => {
    try {
        const response = await axios.put(`${ENDPOINT_DOMICILIO}/domicilios/newdomicilio/?clienteid=${localStorage.getItem('clienteId')}`, {
            domicilioTipoDomicilioId: tipoDomicilioId,
            domicilioDireccion: domicilioDireccion,
            domicilioBarrio: "",
            domicilioUbicacion: "",
            domicilioLocalidadId: "",
            domicilioCodigoPostal: "",
            domicilioEsPrincipal: "",
            domicilioObservaciones: "",
            usuario_alta: localStorage.getItem('email'),
        });
        return response
    } catch (err) {
        return 400;
    }
};

const clienteService = {
    modificarDomicilio,
    eliminarDomicilio,
    agregarDomicilio
}

export default clienteService;