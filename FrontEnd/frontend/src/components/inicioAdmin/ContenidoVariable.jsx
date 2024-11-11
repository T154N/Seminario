import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDollarSign, faEdit, faTrash, faClock, faCheck } from '@fortawesome/free-solid-svg-icons';

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
    handleEstadoChange,
    handleAgregarPedidoClick // Nueva función para manejar el click en el botón de agregar pedido
}) => {
    return (
        <div className="contenido-variable">
            <div>
                <span className="fs-3 fw-bold mt-0">
                    {menuContent === 'Clientes' ? 'Clientes' : menuContent === 'Pedidos' ? 'Pedidos' : catalogTab}
                </span>
            </div>

            <div className="header-section d-flex justify-content-start">
                <div className="m-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className='d-flex align-items-center'>
                            {/* Botón de Agregar con lógica condicional */}
                            <button className="btn-action btn-alta btn btn-primary"
                                onClick={() => menuContent === 'Pedidos' ? handleAgregarPedidoClick() : alert(`Alta de ${menuContent === 'Clientes' ? 'Cliente' : catalogTab}`)}>
                                {menuContent === 'Pedidos' ? 'Agregar Pedido' : `Agregar ${menuContent === 'Clientes' ? 'Cliente' : catalogTab}`}
                            </button>
                        </div>

                        {menuContent !== 'Pedidos' && (
                            <div className="form-check ms-3 mb-0 btn-action checkbox-container">
                                <input className="bi form-check-input me-1 mb-0 mt-0" type="checkbox" id="inactivosCheckbox" />
                                <label className="form-check-label me-1 mb-0 mt-0" htmlFor="inactivosCheckbox">
                                    Inactivos
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mb-3 d-flex align-items-baseline">
                <select className="form-select me-2 small-select" value={filtroSeleccionado}
                    onChange={handleFiltroChange}>
                    <option value="nombre">Nombre</option>
                    {menuContent === 'Catálogo' && catalogTab === 'Productos' &&
                        <option value="categoria">Categoría</option>}
                    {menuContent === 'Pedidos' && <>
                        <option value="estado">Estado</option>
                    </>}
                </select>
                <input
                    type="text"
                    className="form-control"
                    placeholder={`Buscar ${menuContent === 'Clientes' ? 'clientes' : catalogTab.toLowerCase()}...`}
                    value={busqueda}
                    onChange={handleBusquedaChange}
                />
            </div>

            {filtrosActivos.length > 0 && (
                <div className="d-flex mt-3 titulo-filtro">
                    <span>Filtros activos:</span>
                    {filtrosActivos.map(f => (
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

            <div className="table-responsive scrollable-table">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {menuContent === 'Pedidos' ? (
                                <>
                                    <th>Nro pedido</th>
                                    <th>Nombre Cliente</th>
                                    <th>Fecha</th>
                                    <th>Monto Total</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </>
                            ) : (
                                <>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    {menuContent === 'Clientes' && <>
                                        <th>Apellido</th>
                                        <th>CUIT</th>
                                        <th>Domicilio</th>
                                        <th>Estado</th>
                                    </>}
                                    {menuContent === 'Catálogo' && catalogTab === 'Productos' && (
                                        <>
                                            <th>Categoría</th>
                                            <th>Precio</th>
                                            <th>Estado</th>
                                        </>
                                    )}
                                    {menuContent === 'Catálogo' && catalogTab === 'Categorias' && (
                                        <>
                                            <th>Estado</th>
                                        </>)
                                    }
                                    <th>Acción</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {dataToDisplay().map(item => (
                            <tr key={item.id}>
                                {menuContent === 'Pedidos' ? (
                                    <>
                                        <td>{item.id}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.fecha.split('T')[0]}</td>
                                        <td>${item.montoTotal}</td>
                                        <td data-label="Estado">
                                            <span>
                                                {item.estado}
                                                <span
                                                    className="estado-indicador"
                                                    style={{ backgroundColor: getIndicatorColor(item.estado) }}
                                                />
                                            </span>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{item.id}</td>
                                        <td>{item.nombre}</td>
                                        {menuContent === 'Clientes' && (
                                            <>
                                                <td>{item.apellido}</td>
                                                <td>{item.cuit}</td>
                                                <td>{item.domicilio}</td>
                                                <td data-label="Estado">
                                                    <span>
                                                        {item.estado === 1 ? 'Activo' : 'Inactivo'}
                                                        <span
                                                            className="estado-indicador"
                                                            style={{ backgroundColor: getIndicatorColor(item.estado === 1 ? 'Activo' : 'Inactivo') }}
                                                        />
                                                    </span>
                                                </td>
                                            </>
                                        )}
                                        {menuContent === 'Catálogo' && catalogTab === 'Productos' && (
                                            <>
                                                <td>{item.categoria}</td>
                                                <td>${item.precioUnitario.toFixed(2)}</td>
                                                <td data-label="Estado">
                                                    <span>
                                                        {item.estado === 1 ? 'Activo' : 'Inactivo'}
                                                        <span
                                                            className="estado-indicador"
                                                            style={{ backgroundColor: getIndicatorColor(item.estado === 1 ? 'Activo' : 'Inactivo') }}
                                                        />
                                                    </span>
                                                </td>
                                            </>
                                        )}
                                    </>
                                )}
                                <td>
                                    {menuContent !== 'Pedidos' ? (
                                        <>
                                            <button className="btn btn-primary btn btn-sm me-2 btn-dollar">
                                                <FontAwesomeIcon icon={faDollarSign} />
                                            </button>
                                            <button className="btn-action btn btn-sm me-2" onClick={() => handleEditClick(item)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button className="btn-action-delete btn btn-sm">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-warning btn-sm me-1"
                                                onClick={() => handleEstadoChange(item, 'Pendiente')}
                                                title="Pendiente"
                                            >
                                                <FontAwesomeIcon icon={faClock} style={{ color: 'white' }} /> 
                                            </button>
                                            <button
                                                className="btn btn-success btn-sm me-1"
                                                onClick={() => handleEstadoChange(item, 'Aceptado')}
                                                title="Aceptado"
                                                style={{ padding: '0.3rem 0.6rem', background: 'green' }}
                                            >
                                                <FontAwesomeIcon icon={faCheck} size="sm" /> 
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleEstadoChange(item, 'Rechazado')}
                                                title="Rechazado"
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContenidoVariable;
