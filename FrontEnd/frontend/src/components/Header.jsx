import React from "react";

import './header.css';
import logo from '../images/Header Icons/PFlogo.png';
import PFLogo from '../images/Header Icons/PedidoFlex.png';

export function Header() {
    return(
        <header className="header text-white p-3">
            <img src={logo} alt='Logo' className='logo'></img>
            <img src={PFLogo} alt='PedidoFlex' className='pflogo'></img>
        </header>
    )
}