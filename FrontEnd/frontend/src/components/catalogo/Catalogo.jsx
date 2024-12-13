import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook de navegación
import "./catalogo.css";
import categoriaService from '../../services/categoria/categoria.service';

export function Catalogo() {
    const navigate = useNavigate();  

    const [busqueda, setBusqueda] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const categoria = await categoriaService.getAllCategorias();
            setCategorias(categoria);

            setLoading(false);
        };

        fetchData();
    }, []);

    const handleCardClick = (categoria) => {
        if (categoria.nombre && categoria.id) {
            navigate(`/productos/${categoria.id}`, { state: { categoriaNombre: categoria.nombre } }); 
        } else {
            console.error("Categoría sin nombre:", categoria);
        }
    };

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const categoriasFiltradas = categorias.filter(categoria =>
        categoria.nombre && categoria.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (loading) {
        return <div className='fs-3'>Cargando catalogo...</div>
    }

    return (
        <div className="container mt-2">
            <h1 className="text-center mb-4">Catálogo</h1>

            {/* Barra de búsqueda */}
            <div className="row mb-4">
                <div className="col-md-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar categoría..."
                        value={busqueda}
                        onChange={handleBusquedaChange}
                    />
                </div>
            </div>

            <div className="row">
                {categoriasFiltradas.map(categoria => (
                    <div key={categoria.id} className="col-sm-6 col-md-4 col-lg-3">
                        <div
                            className="catalogo-card mb-5 shadow-sm"
                            onClick={() => handleCardClick(categoria)}
                            style={{cursor: 'pointer'}}
                        >
                            <img
                                src={categoria.imagen}
                                alt={categoria.nombre}
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <h5 className="card-title mt-2">{categoria.nombre}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
