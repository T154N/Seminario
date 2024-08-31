import React from "react";
import './Categoria.css';

function Categoria({ categorias, indiceSeleccionado, handleButtonClick }) {
    return (
        <div>
            <div className="list-group">
                {categorias.map((element, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`list-group-item list-group-item-action custom-button ${indiceSeleccionado === index ? "active" : ""}`}
                        onClick={() => handleButtonClick(index)}
                        aria-current={indiceSeleccionado === index ? "true" : "false"}
                    >
                        {element}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Categoria;
