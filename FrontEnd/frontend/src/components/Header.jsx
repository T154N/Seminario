import React from "react";
import { useNavigate } from "react-router-dom"; 
import './header.css';
import PFLogo from '../images/Header Icons/PedidoFlex.png';

export function Header() {
    const navigate = useNavigate(); 

    const handleLogoClick = () => {
        navigate('/principal');
    }

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
                <p className="fs-4 text-center my-3 mx-2">Bienvenido/a, USUARIO</p>
            </header>
        </div>
    )
}
