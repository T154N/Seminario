import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook de navegación
import "./catalogo.css";
import analgesico from '../../images/Header Icons/analgesico.jpeg';
import perfumeria from '../../images/Header Icons/perfumeria.jpeg';
import limpieza from '../../images/Header Icons/limpieza.jpeg';
import copetin from '../../images/Header Icons/copetin.jpeg';
import golosinas from '../../images/Header Icons/golosina.jpeg';
import galleta from '../../images/Header Icons/galletas.jpeg';

import comestible from '../../images/Header Icons/PedidoFlex.png'
import filos from '../../images/Header Icons/PedidoFlex.png'


export function Catalogo() {

    const navigate = useNavigate();  
    // Datos mock de productos (categorías en este caso)
    const categoriasMock = [
        { id: 1, nombre: "ANALGÉSICO", imagen: analgesico, ruta: "/producto" },
        { id: 2, nombre: "PERFUMERÍA", imagen: perfumeria, ruta: "/producto" },
        { id: 3, nombre: "LIMPIEZA", imagen: limpieza, ruta: "/producto" },
        { id: 4, nombre: "COPETÍN", imagen: copetin, ruta: "/producto" },
        { id: 5, nombre: "GOLOSINAS", imagen: golosinas, ruta: "/producto" },
        { id: 6, nombre: "COMESTIBLE", imagen: comestible, ruta: "/producto" },
        { id: 7, nombre: "GALLETAS", imagen: galleta, ruta: "/producto" },
        { id: 8, nombre: "FILOS", imagen: filos, ruta: "/producto" }
    ];

    const [busqueda, setBusqueda] = useState('');

    const handleCardClick = (ruta) => {
        navigate(ruta); 
    };

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const categoriasFiltradas = categoriasMock.filter(categoria =>
        categoria.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Catálogo</h1>

            {/* Barra de búsqueda */}
            <div className="row mb-4">
                <div className="col-md-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar producto..."
                        value={busqueda}
                        onChange={handleBusquedaChange}
                    />
                </div>
            </div>

            <div className="row">
                {categoriasFiltradas.map(categoria => (
                    <div key={categoria.id} className="col-sm-6 col-md-4 col-lg-3">
                        <div className='catalogo-card mb-5 shadow-sm' onClick={() => handleCardClick(categoria.ruta)} // Navega a '/producto1'
                            style={{ cursor: 'pointer' }} >
                            <img src={categoria.imagen} alt={categoria.nombre} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{categoria.nombre}</h5>
                            </div>
                        </div>
                    </div>
            ))}
          </div>
        </div>
    );
}
  