import './header.css';
// imagenes
import CMLogo from '../images/Header Icons/CMDistribuidoraLogo.png'
import usuario from '../images/Header Icons/usuario.png'
import catalogo from '../images/Header Icons/catalogo.png'
import informacion from '../images/Header Icons/informacion.png'

import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router
import { Carrito } from './carrito/Carrito';

export function Header() {
    const navigate = useNavigate(); // Hook para navegar

    // Funciones para manejar clics
    const goToUserProfile = () => {
        navigate('/login');
    };

    const goToCatalogue = () => {
        navigate('/catalogo');
    };

    const goToInformacion = () => {
        navigate('/info');
    };

    return(
        <div>
            <header className="header text-white">
                <img src={CMLogo} alt='CMDistribuidora' className='cmlogo'></img>
                <div className="header-icons">
                    <button className='icon-button' onClick={goToInformacion}>
                        <img src={informacion} alt="informacion" className='usuario' style={{width: '2.5rem'}}/>
                    </button>
                    <button className='icon-button' onClick={goToCatalogue}>
                        <img src={catalogo} alt="Catalogo" className='header d-flex justify-content-between align-items-center p-3'/>
                    </button>
                    <button className="icon-button" onClick={goToUserProfile}>
                        <img src={usuario} alt="Usuario" className="usuario" />
                    </button>
                    <div className="header d-flex justify-content-between align-items-center p-3">
                        <Carrito />
                    </div>
                </div>
                
            </header>
        </div>
    )
}