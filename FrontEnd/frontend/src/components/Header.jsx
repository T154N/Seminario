import React from "react";

import './header.css';
import logo from '../images/Header Icons/logoPF.png';

export function Header() {
    return(
        <header className="header text-white p-3">
            <img src={logo} alt='Logo' className='logo'></img>
            <h1>PedidoFlex</h1>
        </header>
    )
}