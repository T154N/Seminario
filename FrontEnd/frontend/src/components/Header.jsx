import React from "react";
import { useNavigate } from "react-router-dom";
import './header.css';
import PFLogo from '../images/Header Icons/PedidoFlex.png';
import { Carrito } from './carrito/Carrito';
import { useState } from "react";

export function Header() {
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/principal');
    };

    const actualizarTotal = (total) => {
        setTotal(total);
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
                <div className="header bg-dark text-white d-flex justify-content-between align-items-center p-3">
                    <button
                        className="btn btn-primary"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling"
                        aria-controls="offcanvasScrolling"
                    >
                        Carrito
                    </button>

                    <div className="offcanvas offcanvas-end custom-offcanvas-width"
                        data-bs-scroll="true"
                        data-bs-backdrop="false"
                        tabIndex="-1"
                        id="offcanvasScrolling"
                        aria-labelledby="offcanvasScrollingLabel"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
                                Carrito de Compras
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>

                       
                        <div className="offcanvas-body carrito-body">
                            <Carrito
                            actualizarTotal={actualizarTotal} />
                        </div>

                    
                        <div className="carrito-footer">
                            <h5>Total: ${total}</h5> 
                            <button className="btn btn-primary">Iniciar Compra</button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}


