import React from 'react';
import './footer.css'; // Importa el CSS para el footer si lo tienes

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} CM Distribuidora. Todos los derechos reservados.</p>
                <ul className="footer-links">
                    <li><a href="/catalogo">Catálogo</a></li>
                    <li><a href="/login">Iniciar sesión</a></li>
                    <li><a href="/info">Información</a></li>
                </ul>
            </div>
        </footer>
    );
}
