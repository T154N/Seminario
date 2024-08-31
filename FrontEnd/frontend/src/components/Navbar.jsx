import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar() {
    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="navbar">
                    <Link className='titulo-nav' to="/"> PedidoFlex </Link>
                    <div className="nav-links">
                        <Link to="/carro"><FontAwesomeIcon icon={faShoppingCart} className="carrito-icono" /></Link>
                        <Link to="/producto"> Productos </Link>
                        <Link to="/login"> Login </Link>
                    </div>

                </nav>
            </div></div>
    );
}

export default Navbar;
