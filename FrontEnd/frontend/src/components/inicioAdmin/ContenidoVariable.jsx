import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDollarSign, faEdit, faTrash, faInfoCircle, faRotate } from '@fortawesome/free-solid-svg-icons';
import MassUpdatePopup from './MassUpdatePopup';
import { Dropdown } from 'react-bootstrap';
import './contenidoVariable.css';

const ContenidoVariable = ({
    menuContent,
    catalogTab,
    filtrosActivos,
    handleRemoveFiltro,
    filtroSeleccionado,
    handleFiltroChange,
    busqueda,
    handleBusquedaChange,
    dataToDisplay,
    getIndicatorColor,
    handleEditClick,
    handleInactivosChange,
    checkboxState,
    handleDeleteClick,
    handlePost,
    recargarProductos,

    handleEstadoChange,
    mostrarDetalles
}) => {
    // Estados locales para controlar el popup y los elementos seleccionados
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [popupTipo, setPopupTipo] = useState('productos');

    // Abrir el popup con los elementos seleccionados
    const openPopup = (item, tipo) => {
        setSelectedItems([item]);
        setPopupTipo(tipo);
        setIsPopupOpen(true);
    };

    // Cerrar el popup
    const closePopup = () => setIsPopupOpen(false);

    // Manejo del evento al enviar el popup
    const handlePopupSubmit = (response) => {
        console.log('Datos enviados desde el popup:', response);

        // Recargar productos si la función está definida
        if (typeof recargarProductos === 'function') {
            recargarProductos();
        } else {
            console.error('recargarProductos no está definido o no es una función');
        }
        closePopup();

    };

    // Renderiza el encabezado de la tabla dependiendo del contenido actual
    const renderTableHeader = () => {
        if (menuContent === 'Clientes') {
            return (
                <>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Documento</th>
                    <th>Domicilio</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </>
            );
        }
        if (menuContent === 'Catálogo' && catalogTab === 'Productos') {
            return (
                <>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </>
            );
        }
        if (menuContent === 'Catálogo' && catalogTab === 'Categorias') {
            return (
                <>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </>
            );
        }
        if (menuContent === 'Pedidos') {
            return (
                <>
                    <th>Nro pedido</th>
                    <th>Nombre Cliente</th>
                    <th>Fecha</th>
                    <th>Monto Total</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </>
            );
        }
        return null;
    };

    // Renderiza las filas de la tabla dependiendo de los datos proporcionados
    const renderTableRows = () => {
        return dataToDisplay().map((item) => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>

                {/* Columnas específicas para "Clientes" */}
                {menuContent === 'Clientes' && (
                    <>
                        <td>{item.apellido}</td>
                        <td>{item.documento}</td>
                        <td>{item.direccion}</td>
                        <td>
                            <span>
                                {item.estado === 1 ? 'Activo' : 'Inactivo'}
                                <span
                                    className="estado-indicador"
                                    style={{
                                        backgroundColor: getIndicatorColor(
                                            item.estado === 1 ? 'Activo' : 'Inactivo'
                                        ),
                                    }}
                                />
                            </span>
                        </td>
                    </>
                )}

                {/* Columnas específicas para "Productos" */}
                {menuContent === 'Catálogo' && catalogTab === 'Productos' && (
                    <>
                        <td>{item.categoria}</td>
                        <td>{`$${item.precioUnitario.toFixed(2)}`}</td>
                        <td>
                            <span>
                                {item.estado === 1 ? 'Activo' : 'Inactivo'}
                                <span
                                    className="estado-indicador"
                                    style={{
                                        backgroundColor: getIndicatorColor(
                                            item.estado === 1 ? 'Activo' : 'Inactivo'
                                        ),
                                    }}
                                />
                            </span>
                        </td>
                    </>
                )}

                {/* Columnas específicas para "Categorías" */}
                {menuContent === 'Catálogo' && catalogTab === 'Categorias' && (
                    <td>
                        <span>
                            {item.estado === 1 ? 'Activo' : 'Inactivo'}
                            <span
                                className="estado-indicador"
                                style={{
                                    backgroundColor: getIndicatorColor(
                                        item.estado === 1 ? 'Activo' : 'Inactivo'
                                    ),
                                }}
                            />
                        </span>
                    </td>
                )}

                {/* Columnas específicas para "Pedidos" */}
                {menuContent === 'Pedidos' && (
                    <>

                        <td>{item.fecha.split("T")[0]}</td>
                        <td>{`$${item.montoTotal.toFixed(2)}`}</td>
                        <td data-label="Estado">
                            <span>
                                {item.estado === 13 ? "Aceptado" : item.estado === 9 ? "Rechazado" :
                                    item.estado === 7 ? "Pendiente" : "Inactivo"}
                                <span className="estado-indicador"
                                    style={{
                                        backgroundColor: getIndicatorColor(
                                            item.estado === 13 ? "Aceptado" :
                                                item.estado === 9 ? "Rechazado" :
                                                    item.estado === 7 ? "Pendiente" :
                                                        "Inactivo"),
                                    }}
                                />
                            </span>
                        </td>
                        <td>
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" size="sm" className="btn-estado" title="Cambio de Estado">
                                        <FontAwesomeIcon icon={faRotate} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleEstadoChange(item, "Pendiente")}>
                                            Pendiente
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleEstadoChange(item, "Aceptado")} >
                                            Aceptado
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleEstadoChange(item, "Rechazado")}>
                                            Rechazado
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleEstadoChange(item, "Inactivo")}>
                                            Inactivo
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <button
                                    className="pedidos-info-btn-link"
                                    onClick={() => mostrarDetalles(item)}
                                    title="Info"
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </button>
                            </>
                        </td>
                    </>
                )}

                {/* Botones */}
                {menuContent === 'Catálogo' && (
                    <td>
                        <button
                            className="btn btn-primary btn-sm me-2 btn-dollar"
                            title="Editar precio"
                            onClick={() => openPopup(item, 
                                catalogTab === 'Productos' 
                                    ? 'productos' 
                                    : catalogTab === 'Clientes' 
                                        ? 'clientes' 
                                        : 'categorias'
                            )}
                        >
                            <FontAwesomeIcon icon={faDollarSign} />
                        </button>
                        <button
                            className="btn-action btn btn-sm me-2"
                            title="Editar registro"
                            onClick={() => handleEditClick(item)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                            className="btn-action-delete btn btn-sm"
                            onClick={() => handleDeleteClick(item)}
                            title="Eliminar registro"
                            style={{ display: checkboxState ? 'none' : 'inline-block' }}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </td>
                )}

                {menuContent === 'Clientes' && (
                    <td>
                        <button
                            className="btn-action btn btn-sm me-2"
                            title="Editar registro"
                            onClick={() => handleEditClick(item)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                            className="btn-action-delete btn btn-sm"
                            onClick={() => handleDeleteClick(item)}
                            title="Eliminar registro"
                            style={{ display: checkboxState ? 'none' : 'inline-block' }}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </td>
                )}
            </tr>
        ));
    };

    return (
        <div className="contenido-variable">
            {/* Encabezado */}
            <div>
                <span className="fs-3 fw-bold mt-0">
                    {menuContent === 'Catálogo' ?  catalogTab : menuContent}
                </span>
            </div>

            {/* Botones y filtro */}
            <div className="header-section d-flex justify-content-start">
                <button className="btn-action btn-alta btn btn-primary" onClick={handlePost}>
                    Agregar {menuContent === 'Clientes' ? 'Cliente' : catalogTab}
                </button>

                {menuContent !== 'Pedidos' && (
                    <div className="form-check ms-3 checkbox-container">
                        <input
                            type="checkbox"
                            id="inactivosCheckbox"
                            onChange={handleInactivosChange}
                            checked={checkboxState}
                            className="form-check-input"
                        />
                        <label htmlFor="inactivosCheckbox" className="btn-action">
                            Inactivos
                        </label>
                    </div>
                )}
            </div>

            {/* Campo de búsqueda y filtros */}
            <div className="mb-3 d-flex align-items-baseline">
                <select className="form-select me-2 small-select" value={filtroSeleccionado} onChange={handleFiltroChange}>
                    <option value="nombre">Nombre</option>
                    {menuContent === 'Catálogo' && catalogTab === 'Productos' && <option value="categoria">Categoría</option>}
                </select>
                <input
                    type="text"
                    className="form-control"
                    placeholder={`Buscar ${menuContent === 'Clientes' ? 'Cliente' : menuContent === 'Catálogo' ? catalogTab : 'Pedido' }...`}
                    value={busqueda}
                    onChange={handleBusquedaChange}
                />
            </div>

            {/* Lista de filtros activos */}
            {filtrosActivos.length > 0 && (
                <div className="d-flex mt-3 titulo-filtro">
                    <span>Filtros activos:</span>
                    {filtrosActivos.map((f) => (
                        <span key={f.filtro} className="badge filtro-activo ms-2">
                            {f.filtro}: {f.valor}
                            <button
                                type="button"
                                className="btn btn-sm btn-danger ms-2 boton-eliminar-filtro"
                                onClick={() => handleRemoveFiltro(f)}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Tabla de contenido */}
            <div className="table-responsive scrollable-table">
                <table className="table table-striped">
                    <thead>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                </table>
            </div>

            {/* Popup para actualizaciones*/}
            <MassUpdatePopup
                isOpen={isPopupOpen}
                onClose={closePopup}
                onSubmit={handlePopupSubmit}
                selectedItems={selectedItems}
                tipo={popupTipo}
            />
        </div>
    );
};

export default ContenidoVariable;
