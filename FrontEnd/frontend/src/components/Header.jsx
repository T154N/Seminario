import React from "react";
import { useNavigate } from "react-router-dom";
import './header.css';
import PFLogo from '../images/Header Icons/PedidoFlex.png';
import { Carrito } from './carrito/Carrito';

export function Header() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/principal');
    };

    return (
        <div>
            <header className="header text-white">
                <img
                    src={PFLogo}
                    alt='PedidoFlex'
                    className='pflogo'
                    onClick={handleLogoClick}
                    style={{ cursor: 'pointer' }}
                />
                <div className="header bg-dark text-white d-flex justify-content-between align-items-center p-3">
                    <Carrito />
                </div>
            </header>
        </div>
    );
}
