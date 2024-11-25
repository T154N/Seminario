// Header.jsx
import './header.css';
import CMLogo from '../images/PedidoFlex Icons/CMDistribuidoraLogo.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carrito } from './carrito/Carrito';
import loginService from "../services/login/login.service";
import carrito from '../images/Header Icons/cart3.svg';
import informacion from '../images/Header Icons/info-circle.svg';
import usuario from '../images/Header Icons/person.svg';
import catalogo from '../images/Header Icons/catalogo.png';
import config from '../images/Header Icons/config.svg';
import { FaBox } from 'react-icons/fa';
import { Offcanvas } from 'bootstrap';
import { useCarrito } from './carrito/CarritoContext'; // Importa tu contexto del carrito

export function Header() {
    const navigate = useNavigate();
    const { productos } = useCarrito(); // Obtener productos del carrito
    const totalProductos = productos.length; // Assuming productos is an array
    const closeOffcanvasNavbar = () => {
        const offcanvasNavbarCloseButton = document.getElementById('offcanvasNavbarCloseButton');
        if (offcanvasNavbarCloseButton) {
            offcanvasNavbarCloseButton.click();
        }
    };

    const goToPage = (path) => {
        navigate(path);
        closeOffcanvasNavbar();
    };

    const mostrarCarrito = () => {
        const offcanvasNavbarCloseButton = document.getElementById('offcanvasNavbarCloseButton');
        const offcanvasElement = document.getElementById('offcanvasScrolling');
        const offcanvasInstance = Offcanvas.getInstance(offcanvasElement);

        if (offcanvasNavbarCloseButton) {
            offcanvasNavbarCloseButton.click();
        }

        if (offcanvasInstance) {
            offcanvasInstance.show();
        }
    };

    return (
        <div>
            <header>
                <nav className="navbar navbar-light" style={{ backgroundColor: "#FCBB3A" }}>
                    <div className="d-flex justify-content-between w-100 ms-2 me-2">
                        <button className="btn logo-button" onClick={() => goToPage('/')}>
                            <img src={CMLogo} style={{
                                width: "150px",
                                height: "auto",
                                marginRight: "3px",
                                verticalAlign: "middle",
                                outline: "none"
                            }} alt="Logo"/>
                        </button>

                        <div className="d-flex align-items-center position-relative">
                            <button id="toggleOffcanvasButton" className="btn btn-header fs-5"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasScrolling"
                                    aria-controls="offcanvasScrolling"
                                    onClick={mostrarCarrito}>
                                <img src={carrito} alt="Carrito" style={{
                                    width: "26px",
                                    height: "auto",
                                    marginRight: "3px",
                                    verticalAlign: "middle",
                                    padding: 0
                                }}/>
                                Carrito
                                {totalProductos > 0 && (
                                   <span className={totalProductos > 99 ? 'badge-circle-large' : 'badge-circle'}>
                                   {totalProductos > 99 ? '99+' : totalProductos}
                               </span>
                                )}
                            </button>

                            <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>

                        <div className="sidebar offcanvas offcanvas-end custom-backdrop" tabIndex="-1"
                             id="offcanvasNavbar"
                             aria-labelledby="offcanvasNavbarLabel" data-bs-backdrop="false" inert>
                            <div className="offcanvas-header text-black">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu de opciones</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                                        aria-label="Close" id="offcanvasNavbarCloseButton"></button>
                            </div>
                            <div className="offcanvas-body" style={{backgroundColor: "#fad892"}}>
                                <ul className="navbar-nav ms-auto justify-content-end flex-grow-1 text-start">
                                    <li className="nav-item me-1 mb-2">
                                        <div className="d-grid">
                                            <button className="btn btn-header fs-5" onClick={() => goToPage('/info')}>
                                                <img src={informacion} alt="Informacion" style={{
                                                    width: "30px",
                                                    height: "auto",
                                                    marginRight: "3px",
                                                    verticalAlign: "middle"
                                                }}/>
                                                Informacion
                                            </button>
                                        </div>
                                    </li>
                                    <li className="nav-item me-1 mb-2">
                                        <div className="d-grid">
                                            <button className="btn btn-header fs-5" onClick={() => goToPage('/login')}>
                                                <img src={usuario} alt="Login" style={{
                                                    width: "30px",
                                                    height: "auto",
                                                    marginRight: "3px",
                                                    verticalAlign: "middle"
                                                }}/>
                                                Login
                                            </button>
                                        </div>
                                    </li>
                                    <li className="nav-item me-1 mb-2">
                                        <div className="d-grid">
                                            <button className="btn btn-header fs-5" onClick={() => goToPage('/catalogo')}>
                                                <img src={catalogo} alt="Catalogo" style={{
                                                    width: "30px",
                                                    height: "auto",
                                                    marginRight: "3px",
                                                    verticalAlign: "middle",
                                                    padding: 0
                                                }}/>
                                                Catalogo
                                            </button>
                                        </div>
                                    </li>
                                    <li className="nav-item me-1 mb-2">
                                        <div className="d-grid">
                                            <button className="btn btn-header fs-5" onClick={() => goToPage('/pedidos-usuario')}>
                                                <FaBox style={{
                                                    width: "30px",
                                                    height: "auto",
                                                    marginRight: "3px",
                                                    verticalAlign: "middle",
                                                }} size="xs"/>
                                                Pedidos Solicitados
                                            </button>
                                        </div>
                                    </li>
                                    {loginService.esAdmin() &&
                                        <li className="nav-item me-1 mb-2">
                                            <div className="d-grid">
                                                <button className="btn btn-info fs-5" onClick={() => goToPage('/inicioAdmin')}>
                                                    <img src={config} alt="Admin" style={{
                                                        width: "30px",
                                                        height: "auto",
                                                        marginRight: "3px",
                                                        verticalAlign: "middle",
                                                        padding: 0
                                                    }}/>
                                                    Administrador
                                                </button>
                                            </div>
                                        </li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <Carrito/>
        </div>
    );
}
