import React, { useContext, useEffect } from 'react';
import { UserContext } from '../components/login/UserContext';
import './header.css';
import CMLogo from '../images/PedidoFlex Icons/CMDistribuidoraLogo.png';
import { useNavigate } from 'react-router-dom';
import { Carrito } from './carrito/Carrito';
import loginService from "../services/login/login.service";
import carrito from '../images/Header Icons/cart3.svg';
import informacion from '../images/Header Icons/info-circle.svg';
import usuario from '../images/Header Icons/person.svg';
import catalogo from '../images/Header Icons/catalogo.png';
import config from '../images/Header Icons/config.svg';
import { Offcanvas } from 'bootstrap';
import { useCarrito } from '../components/carrito/CarritoContext';

export function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useContext(UserContext);
    const { vaciarCarritoLogout } = useCarrito();

    useEffect(() => {
        const offcanvasElement = document.getElementById('offcanvasNavbar');

        const handleShow = () => {
            offcanvasElement.classList.add('bg-color');
        };

        const handleHide = () => {
            offcanvasElement.classList.remove('bg-color');
        };

        offcanvasElement.addEventListener('show.bs.offcanvas', handleShow);
        offcanvasElement.addEventListener('hide.bs.offcanvas', handleHide);

        return () => {
            offcanvasElement.removeEventListener('show.bs.offcanvas', handleShow);
            offcanvasElement.removeEventListener('hide.bs.offcanvas', handleHide);
        };
    }, []);

    const closeOffcanvasNavbar = () => {
        const offcanvasNavbarCloseButton = document.getElementById('offcanvasNavbarCloseButton');
        if (offcanvasNavbarCloseButton) {
            offcanvasNavbarCloseButton.click();
        }
    };

    const goToUserProfile = () => {
        navigate('/login');
        closeOffcanvasNavbar();
    };

    const goToCatalogue = () => {
        navigate('/catalogo');
        closeOffcanvasNavbar();
    };

    const goToInformacion = () => {
        navigate('/info');
        closeOffcanvasNavbar();
    };

    const goToHomePage = () => {
        navigate('/');
        closeOffcanvasNavbar();
    };

    const goToAdminConfig = () => {
        navigate('/inicioAdmin');
        closeOffcanvasNavbar();
    };

    const goToPerfil = () => {
        navigate('/mi-cuenta');
        closeOffcanvasNavbar();
    }

    const goToMisPedidos = () => {
        navigate('/pedidos-usuario');
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

    const handleLogout = () => {
        loginService.cerrarSesion();
        vaciarCarritoLogout();
        logout();
        navigate('/');
        closeOffcanvasNavbar();
    };

    return (
        <div>
            <header>
                <nav className="navbar navbar-light navbar-expand-lg" style={{ backgroundColor: "#FCBB3A" }}>
                    <div className="d-flex justify-content-between w-100 ms-2 me-2">
                        <button className="btn">
                            <img src={CMLogo} style={{
                                width: "150px",
                                height: "auto",
                                marginRight: "3px",
                                verticalAlign: "middle",
                                outline: "none"
                            }} onClick={goToHomePage} alt="Logo"/>
                        </button>

                        <div className="d-flex align-items-center">
                            <button id="toggleOffcanvasButton" className="btn btn-header fs-5 d-lg-none"
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
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú de opciones</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                                        aria-label="Close" id="offcanvasNavbarCloseButton"></button>
                            </div>
                            <div className="offcanvas-body">
                                {/* Botones que se muestran solo en pantallas chicas */}
                                <ul className="navbar-nav ms-auto justify-content-end flex-grow-1 text-start">
                                    <li className="nav-item me-1 mb-2 d-lg-none">
                                        <div className="d-grid">
                                            <button className="btn btn-header fs-5" onClick={goToCatalogue}>
                                                <img src={catalogo} alt="Catalogo" style={{
                                                    width: "30px",
                                                    height: "auto",
                                                    marginRight: "3px",
                                                    verticalAlign: "middle",
                                                    padding: 0
                                                }}/>
                                                Catálogo
                                            </button>
                                        </div>
                                    </li>
                                    {!isLoggedIn &&
                                        <li className="nav-item me-1 mb-2 d-lg-none">
                                            <div className="d-grid">
                                                <button className="btn btn-header fs-5"
                                                        onClick={goToUserProfile}>
                                                    <img src={usuario} alt="Login" style={{
                                                        width: "30px",
                                                        height: "auto",
                                                        marginRight: "3px",
                                                        verticalAlign: "middle"
                                                    }}/>
                                                    Iniciar Sesión
                                                </button>
                                            </div>
                                        </li>
                                    }
                                    {/* Dropdown con mi cuenta */}
                                    {isLoggedIn &&
                                        <li className="nav-item me-1 mb-2 d-lg-none">
                                            <div className="dropdown d-grid">
                                                <button className="btn dropdown-toggle fs-5 btn-header" type="button"
                                                        id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                    <img src={usuario} alt="Login" style={{
                                                        width: "30px",
                                                        height: "auto",
                                                        marginRight: "3px",
                                                        verticalAlign: "middle"
                                                    }}/>
                                                    {isLoggedIn ? 'Mi Cuenta' : 'Iniciar Sesión'}
                                                </button>
                                                <ul className="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton1" style={{backgroundColor: "#fff3cd"}}>
                                                    <li>
                                                        <button className="dropdown-item"
                                                                onClick={goToPerfil}>Perfil
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item"
                                                                onClick={goToMisPedidos}>Mis Pedidos
                                                        </button>
                                                    </li>
                                                    <li><hr className="dropdown-divider"/></li>
                                                    <li>
                                                        <button className="dropdown-item" onClick={handleLogout}>Cerrar
                                                            Sesión
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    }
                                    <li className="nav-item me-1 mb-2 d-lg-none">
                                        <div className="d-grid">
                                            <button className="btn btn-header fs-5" onClick={goToInformacion}>
                                                <img src={informacion} alt="Informacion" style={{
                                                    width: "25px",
                                                    height: "auto",
                                                    marginRight: "3px",
                                                    verticalAlign: "middle"
                                                }}/>
                                                Información
                                            </button>
                                        </div>
                                    </li>
                                    {loginService.esAdmin() &&
                                        <li className="nav-item me-1 mb-2 d-lg-none">
                                            <div className="d-grid">
                                                <button className="btn btn-info fs-5" onClick={goToAdminConfig}>
                                                    <img src={config} alt="Carrito" style={{
                                                        width: "30px",
                                                        height: "auto",
                                                        marginRight: "3px",
                                                        verticalAlign: "middle",
                                                        padding: 0
                                                    }}/>
                                                    Administrador
                                                </button>
                                            </div>
                                        </li>
                                    }
                                    {/* Botones que se muestran solo en pantallas grandes */}
                                    <li className="nav-item me-0 d-none d-lg-block">
                                        <button className="btn-header-joaco nav-link btn active fs-5"
                                                onClick={goToCatalogue}>
                                            <img className="me-1" src={catalogo} alt="Catalogo" style={{
                                                width: "35px",
                                                height: "auto",
                                                marginRight: "3px",
                                                verticalAlign: "middle",
                                                padding: 0
                                            }}/>
                                            Catálogo
                                        </button>
                                    </li>
                                    {!isLoggedIn &&
                                        <li className="nav-item me-0 d-none d-lg-block">
                                            <button className="btn-header-joaco nav-link btn active fs-5"
                                                    onClick={goToUserProfile}>
                                                <img src={usuario} alt="Login" style={{
                                                    width: "30px",
                                                    height: "auto",
                                                    marginRight: "3px",
                                                    verticalAlign: "middle"
                                                }}/>
                                                Iniciar Sesión</button>
                                        </li>
                                    }
                                    {/* Dropdown con mi cuenta */}
                                    {isLoggedIn &&
                                        <li className="nav-item me-0 d-none d-lg-block">
                                            <div className="dropdown">
                                                <button className=" btn-header-joaco btn dropdown-toggle fs-5" type="button"
                                                        id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                    <img src={usuario} alt="Login" style={{
                                                        width: "30px",
                                                        height: "auto",
                                                        marginRight: "3px",
                                                        verticalAlign: "middle"
                                                    }}/>
                                                    {isLoggedIn ? 'Mi Cuenta' : 'Iniciar Sesión'}
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li>
                                                        <button className="dropdown-item"
                                                                onClick={goToPerfil}>Perfil
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item"
                                                                onClick={goToMisPedidos}>Mis Pedidos
                                                        </button>
                                                    </li>
                                                    <li><hr className="dropdown-divider"/></li>
                                                    <li>
                                                        <button className="dropdown-item" onClick={handleLogout}>Cerrar
                                                            Sesión
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    }

                                    <li className="nav-item me-0 d-none d-lg-block">
                                        <button className="btn-header-joaco nav-link btn active fs-5"
                                                onClick={goToInformacion}>
                                            <img className="me-1" src={informacion} alt="Informacion" style={{
                                                width: "30px",
                                                height: "auto",
                                                marginRight: "3px",
                                                verticalAlign: "middle"
                                            }}/>
                                            Información
                                        </button>
                                    </li>

                                    {loginService.esAdmin() &&
                                        <li className="nav-item me-0 d-none d-lg-block">
                                            <button className="btn-header-joaco nav-link btn active fs-5 text-white"
                                                    onClick={goToAdminConfig}>
                                                <img className="colorTuerca" src={config} alt="Carrito" style={{
                                                    width: "30px",
                                                    height: "auto",
                                                    marginRight: "3px",
                                                    verticalAlign: "middle",
                                                    padding: 0,
                                                    filter: "invert(1)"
                                                }}/>
                                                Administrador
                                            </button>
                                        </li>
                                    }

                                    {/* Carrito */}
                                    <li className="nav-item me-1 mb-2 d-lg-block d-none">
                                        <div className="d-grid">
                                            <button className="btn btn-header fs-5"
                                                    data-bs-toggle="offcanvas"
                                                    data-bs-target="#offcanvasScrolling"
                                                    aria-controls="offcanvasScrolling"
                                                    onClick={mostrarCarrito}>
                                                <img src={carrito} alt="Carrito" style={{
                                                    width: "30px",
                                                    height: "auto",
                                                    marginRight: "3px",
                                                    verticalAlign: "middle",
                                                    padding: 0
                                                }}/>
                                                Carrito
                                            </button>
                                        </div>
                                    </li>
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