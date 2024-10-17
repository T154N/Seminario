import './header.css';
import CMLogo from '../images/Header Icons/cmDistribuidora-removebg-preview.png';
import usuario from '../images/Header Icons/usuario.png';
import carrito from '../images/Header Icons/carrito.png';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router
import { Carrito } from './carrito/Carrito';

export function Header() {
    const navigate = useNavigate(); // Hook para navegar

    // Función para manejar clics en el perfil de usuario
    const goToUserProfile = () => {
        navigate('/login'); // Ruta del perfil de usuario
    };

    // Función para navegar a la página principal
    const goToHomePage = () => {
        navigate('/'); // Ruta de la página principal
    };

    return (
        <div>
            <header className="header text-white">
                <button onClick={goToHomePage} className="logo-button">
                    <img src={CMLogo} alt="CMDistribuidora" className="cmlogo" />
                </button>
                <div className="header-icons">
                    <button className="icon-button" onClick={goToUserProfile}>
                        <img src={usuario} alt="Usuario" className="usuario" />
                    </button>
                    <div className="header bg-dark d-flex justify-content-between align-items-center p-3">
                        <Carrito />
                    </div>
                </div>
            </header>
        </div>
    );
}
