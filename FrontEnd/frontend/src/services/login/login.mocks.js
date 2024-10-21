const loginMocks = async (email, password) => {
    return {
        status: 200,
        data: {
            status: 200,
            body: {
                token: 'abcd1234',
                usuario: 'usuariomock@pedidoflex.com.ar'
            }
        }
    }
}

const loginMocksService = {
    loginMocks
}

export default loginMocksService;