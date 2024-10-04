import './header.css';
import CMLogo from '../images/Header Icons/cmDistribuidora-removebg-preview.png'
import usuario from '../images/Header Icons/usuario.png'
import carrito from '../images/Header Icons/carrito.png'
import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router

export function Header() {
    const navigate = useNavigate(); // Hook para navegar

    // Funciones para manejar clics
    const goToUserProfile = () => {
        navigate('/login'); // Ruta del perfil de usuario
    };

    const goToCart = () => {
        navigate('/catalogo'); // Ruta del carrito de compras
    };

    return(
        <div>
            <header className="header text-white">
                <img src={CMLogo} alt='CMDistribuidora' className='cmlogo'></img>
                <div className="header-icons">
                    <button className="icon-button" onClick={goToUserProfile}>
                        <img src={usuario} alt="Usuario" className="usuario" />
                    </button>
                    <button className="icon-button" onClick={goToCart}>
                        <img src={carrito} alt="Carrito" className="carrito" />
                    </button>
                </div>
                
            </header>
        </div>
    )
}