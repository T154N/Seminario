import { useNavigate } from 'react-router-dom';

import pedidoflex from '../../images/Header Icons/PedidoFlexlineal.png';

export function Principal() {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); 
    };

    const handleCatalogClick = () => {
        navigate('/catalogo');
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8 col-xxl-8">
                        <div className="justify-content-center">
                            <div className='card border-0 shadow mt-5' style={{background: "#FCBB3A", borderRadius: "40px"}}>
                                <div className="text-center fs-1 fw-bold mx-3 my-2">
                                    <h1>Bienvenid@ a</h1>
                                    <img src={pedidoflex} alt='logoPF' className='img-fluid'></img>
                                </div>
                                <div className='text-center fs-4'>
                                    <p>Para comenzar seleccioná una opción</p>
                                </div>
                                <div className='d-flex justify-content-center mb-3'>
                                    <button className='btn btn-principal text-black me-1' onClick={handleLoginClick}>Iniciar sesión</button>
                                    <button className='btn btn-principal text-black ms-1' onClick={handleCatalogClick}>Ver catálogo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    );
}
