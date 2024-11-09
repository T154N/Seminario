// Header.js

import './header.css';
import CMLogo from '../images/Header Icons/CMDistribuidoraLogo.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carrito } from './carrito/Carrito';
import carrito from '../images/Header Icons/carrito.png';

import informacion from '../images/Header Icons/informacion.png'
import usuario from '../images/Header Icons/usuario.png'
import catalogo from '../images/Header Icons/catalogo.png'

export function Header() {
    const navigate = useNavigate();

    const goToUserProfile = () => navigate('/login');
    const goToCatalogue = () => navigate('/catalogo');
    const goToInformacion = () => navigate('/info');
    const goToHomePage = () => navigate('/');

    return (
        <div>
          <header className="">

            <nav className="navbar navbar-light navbar-expand-lg" style={{backgroundColor: "#FCBB3A"}}>
              <div className="d-flex justify-content-between w-100 ms-2 me-2">

                  <button className="btn logo-button">
                      <img src={CMLogo} style={{
                          width: "150px",
                          height: "auto",
                          marginRight: "3px",
                          verticalAlign: "middle",
                          outline: "none"
                      }} onClick={goToHomePage} alt="Logo"/>
                  </button>

                  <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="sidebar offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
                     aria-labelledby="offcanvasNavbarLabel">

                  <div className="offcanvas-header text-black">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu de opciones</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                  </div>

                  <div className="offcanvas-body">
                    <ul className="navbar-nav ms-auto justify-content-end flex-grow-1 text-start">
                      <li className="nav-item">
                        <button className="btn fs-5" onClick={goToInformacion}>
                            <img src={informacion} style={{
                                width: "30px",
                                height: "auto",
                                marginRight: "3px",
                                verticalAlign: "middle"}}/>
                            Informacion
                        </button>
                      </li>
                        <li className="nav-item">
                            <button className="btn fs-5" onClick={goToUserProfile}>
                                <img src={usuario} style={{
                                    width: "30px",
                                    height: "auto",
                                    marginRight: "3px",
                                    verticalAlign: "middle"
                                }}/>
                                Usuario
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn fs-5" onClick={goToCatalogue}>
                                <img src={catalogo} style={{
                                    width: "30px",
                                    height: "auto",
                                    marginRight: "3px",
                                    verticalAlign: "middle",
                                    padding: 0
                                }}/>
                                Catalogo
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn fs-5" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                                <img src={carrito} alt="Carrito" style={{
                                    width: "30px",
                                    height: "auto",
                                    marginRight: "3px",
                                    verticalAlign: "middle",
                                    padding: 0
                                }}/>
                                Carrito
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <Carrito />
        </div>
    );
}