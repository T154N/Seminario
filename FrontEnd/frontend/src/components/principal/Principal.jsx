import { useNavigate } from 'react-router-dom';
import styles from './principal.module.css'; // Asegúrate de que el nombre coincida

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
        <div className={styles.pageContainer}>
            <div className={styles.loginContainer + ' shadow'} style={{ backgroundColor: "#FCBB3A", borderRadius: '30px' }}>
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-center">
                        </div>
                        <div className="text-center fs-1 fw-bold">
                            <h1>Bienvenido a</h1>
                            <img src={pedidoflex} alt='pedido' className='pedido-img'></img>
                        </div>
                        <div>Para comenzar seleccioná una opción</div>
                        <div className={styles.buttonGroup}>
                            <button className={`${styles.btnAceptar} btn text-black mt-3`} onClick={handleLoginClick}>Iniciar Sesión</button>
                            <button className={`${styles.btnAceptar} btn text-black mt-3`} onClick={handleCatalogClick}>Ver Catálogo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
