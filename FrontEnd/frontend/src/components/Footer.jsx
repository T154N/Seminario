import React from 'react';
import './footer.css'; // Importa el CSS para el footer si lo tienes
// import pflogo from '../images/PedidoFlex Icons/PedidoFlex.png';

export function Footer() {
    return (
        <footer className="footer pt-3 pb-3">
            <div className="footer-content">
                <p className="mb-0">&copy; {new Date().getFullYear()} CM Distribuidora. Todos los derechos reservados.</p>
                {/*<p className="pt-0">*/}
                {/*    Powered by*/}
                {/*    <img className="ms-2"*/}
                {/*        src={pflogo} style={{*/}
                {/*        width: "120px",*/}
                {/*        height: "auto",*/}
                {/*        verticalAlign: "middle",*/}
                {/*        outline: "none"*/}
                {/*    }} alt="Logo"/>*/}
                {/*</p>*/}
                {/* <ul className="footer-links">
                    <li><a href="/catalogo">Catálogo</a></li>
                    <li><a href="/login">Iniciar sesión</a></li>
                    <li><a href="/info">Información</a></li>
                </ul> */}
            </div>
        </footer>
    );
}
