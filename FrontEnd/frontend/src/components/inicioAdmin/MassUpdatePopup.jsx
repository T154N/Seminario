import React, { useState, useEffect } from 'react';
import './MassUpdatePopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { updatePrecioProducto } from '../../services/producto/producto.service'; // Verifica que esta importación sea correcta

const MassUpdatePopup = ({ isOpen, onClose, onSubmit, selectedItems, tipo }) => {
    const [percentage, setPercentage] = useState('');
    const [fechaMod] = useState(new Date().toISOString()); // Formato ISO 8601 para fecha
    const [tituloActualizacion, setTituloActualizacion] = useState("Actualización Masiva");
    // Función para manejar el cambio en el input del porcentaje
    const handlePercentageChange = (e) => {
        setPercentage(e.target.value);
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(percentage) || percentage === '' || percentage === '0') {
            alert('Por favor ingrese un porcentaje válido');
            return;
        }

        // Recuperar el usuario logueado desde localStorage
        const storedUser = localStorage.getItem('email');
        const usuarioMod = storedUser ?? 'ADMIN';  // Extraer solo el username
        console.log(storedUser);

        // Verificar si selectedItems no está vacío y transformarlo en un array de IDs de productos
        const data = {
            percentage,  // El porcentaje de aumento
            tipo,        // 'productos' o 'categorias', dependiendo de lo que estés trabajando
            usuarioMod,  // Usuario que realiza la modificación
            fechaMod,    // Fecha en formato ISO
        };


        // Si estamos trabajando con productos
        if (tipo === 'productos') {
            data.productIds = selectedItems.map(item => item.id).join(', ');;
            setTituloActualizacion("Actualización de Producto");
        } else if (tipo === 'categorias') {
            // Si estamos trabajando con categorías, necesitamos el `categoryId`
            // Aquí asumo que `selectedItems` tiene algún campo para determinar la categoría
            // Si no, necesitas obtener la categoría de alguna otra manera
            console.log("categoria id ", selectedItems[0]?.id)
            data.categoryId = selectedItems[0]?.id;
            setTituloActualizacion("Actualización Masiva por Categoría");
        }


        // Construir el cuerpo de la solicitud (body)
        const body = JSON.stringify({
            categoryId: data.categoryId,     // Puede ser null si no es categoría
            productIds: data.productIds,     // Es un array de IDs de productos
            percentage: data.percentage,     // El porcentaje de ajuste
            usuarioMod: data.usuarioMod,     // El usuario que realiza la modificación
            fechaMod: data.fechaMod          // La fecha de modificación
        });

        // Mostrar el cuerpo de la solicitud para asegurarnos de que está bien formado
        console.log('Cuerpo de la solicitud:', body);

        try {
            const response = await updatePrecioProducto(data);  // Llamada al servicio
            console.log('Actualización exitosa:', response);
            onSubmit(response);  // Llamamos a la función onSubmit para notificar el éxito

            onClose();  // Cerramos el popup
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Hubo un error al actualizar los productos');
        }
    };

    useEffect(() => {
        if (tipo === 'productos') {
            setTituloActualizacion("Actualización de Producto");
        } else if (tipo === 'categorias') {
            setTituloActualizacion("Actualización Masiva por Categoría");
        }
    }, [tipo]);

    useEffect(() => {
        if (isOpen) {
            setPercentage('0');  // Reinicia el porcentaje a 0 cuando el popup se abre
        }
    }, [isOpen]);

    return (
        isOpen && (
            <div className="popup-overlay">
                <div className="popup-container"> {/* Cambié .popup a .popup-container */}
                    <h3>{tituloActualizacion}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="percentage" style={{ display: 'inline-block', marginRight: '10px' }}>Porcentaje de ajuste:</label>
                            <input
                                type="number"
                                id="percentage"
                                value={percentage}
                                onChange={handlePercentageChange}
                                className="form-control"
                                placeholder="Ingrese el porcentaje"
                                style={{ width: 'auto', display: 'inline-block' }} // Asegura que el input sea de tamaño adecuado
                            />
                        </div>

                        <div className="mt-3 popup-actions"> {/* Añadí .popup-actions para los botones */}
                            <button type="submit" className="btn btn-primary">
                                Actualizar
                            </button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
                                Cerrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default MassUpdatePopup;
