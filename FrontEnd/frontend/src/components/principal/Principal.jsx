import { useNavigate } from 'react-router-dom';
import styles from './principal.module.css'; // Asegúrate de que el nombre coincida

import logo from '../../images/Header Icons/cmDistribuidora.png';

export function Principal() {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginContainer + ' shadow'} style={{ backgroundColor: "#FCBB3A", borderRadius: '30px' }}>
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-center">
                            <img src={logo} alt='Logo' className='logo'></img>
                        </div>
                        <div className="text-center fs-1 fw-bold">Bienvenido a PEDIDOFLEX</div>
                        <div>Para comenzar seleccione una opcion</div>
                        <div className={styles.buttonGroup}>
                            <button className={`${styles.btnAceptar} btn text-black mt-3`} onClick={handleLoginClick}>Iniciar Sesion</button>
                            <button className={`${styles.btnAceptar} btn text-black mt-3`}>Ver Catalogo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
