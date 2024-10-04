import React from "react";

import './header.css';
import PFLogo from '../images/Header Icons/PedidoFlex.png';

export function Header() {
    return(
        <div>
            <header className="header text-white">
                <img src={PFLogo} alt='PedidoFlex' className='pflogo'></img>
                <p className="fs-4 text-center my-3 mx-2" style={{}}>Bienvenido/a, USUARIO</p>
            </header>
        </div>
    )
}