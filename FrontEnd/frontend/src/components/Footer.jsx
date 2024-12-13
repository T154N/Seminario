import React from 'react';
import { useLocation } from 'react-router-dom';
import './footer.css'; // Importa el CSS para el footer si lo tienes

export function Footer() {
    const location = useLocation();

    // No renderizar el footer si la ruta es /inicioAdmin
    if (location.pathname === '/inicioAdmin') {
        return null;
    }

    return (
        <footer className="footer pt-3 pb-3">
            <div className="footer-content">
                <p className="mb-0">&copy; {new Date().getFullYear()} CM Distribuidora. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}