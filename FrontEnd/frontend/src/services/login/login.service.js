import axios from 'axios';

axios.defaults.withCredentials = true;

const LOGIN_API_URL = process.env.REACT_APP_SEMINARIO_BACKEND_URL;

const iniciarSesion = async (email, password) => {
    try {
        console.log(LOGIN_API_URL)
        const response = await axios.post(`${LOGIN_API_URL}/rest/auth/login`, {email, password});
        console.log(response)
        if (response.status === 200 && response.data.body.token) {
            localStorage.setItem('token', response.data.body.token);
        } 
        return 200;
    } catch (err) {
        return err
    }
}

const loginService = {
    iniciarSesion,
}

export default loginService;