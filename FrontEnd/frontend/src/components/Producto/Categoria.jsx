import React from "react";
import './Categoria.css';

function Categoria({categorias, IndiceSeleccionado: indiceSeleccionado, handleButtonClick}) {
    return (
        <div>
            <div className="list-group">
                {categorias.map((element, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`custom-button list-group-item list-group-item-action  ${indiceSeleccionado === index ? "active" : ""}`}
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