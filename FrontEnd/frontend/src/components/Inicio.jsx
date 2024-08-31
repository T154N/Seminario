import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

function Inicio() {
    return (
        <div className="inicio">
            <div className='container'>
                <h1 className='inicio-titulo'>PedidoFlex</h1>
                <h6 className='descripcion'>------------Descripcion------------</h6>
                <Link to="/producto" className="button button-spacing">Realizar pedido</Link>
            </div>
        </div>
    );
}

export default Inicio;
