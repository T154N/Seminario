import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDollarSign, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
                               handleEditClick
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
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor"
                             className="bi bi-plus-square-fill" viewBox="0 0 16 16"
                             style={{display: "none"}}>
                            <symbol id="plus-square-fill" fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                            </symbol>
                        </svg>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className='d-flex align-items-center'>
                            <button className="btn-action btn-alta btn btn-primary"
                                    onClick={() => alert(`Alta de ${menuContent === 'Clientes' ? 'Cliente' : catalogTab}`)}>
                                <svg className="bi flex-shrink-0 me-1 mb-1 mt-0" width="20" height="15"
                                     role="img"
                                     aria-label="cuadrado">
                                    <use href="#plus-square-fill"/>
                                </svg>
                                Agregar {menuContent === 'Clientes' ? 'Cliente' : catalogTab}
                            </button>
                        </div>

                        {menuContent !== 'Pedidos' && (
                            <div className="form-check ms-3  mb-0 btn-action checkbox-container">
                                <input className="bi form-check-input me-1 mb-0 mt-0 " type="checkbox" id="inactivosCheckbox" />
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
                        <span key={f.filtro} className="badge filtro-activo  ms-2">
                            {f.filtro}: {f.valor}
                            <button
                                type="button"
                                className="btn btn-sm btn-danger ms-2 boton-eliminar-filtro"
                                onClick={() => handleRemoveFiltro(f)}
                            >
                                <FontAwesomeIcon icon={faTimes}/>
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="table-responsive scrollable-table">
                <table className="table table-striped">
                    <thead>
                    <tr>
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
                    </tr>
                    </thead>
                    <tbody>
                    {dataToDisplay().map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>

                            {menuContent === 'Catálogo' && catalogTab === 'Productos' && (
                                <>
                                    <td>{item.categoria}</td>
                                    <td>{"$" + item.precioUnitario.toFixed(2)}</td>
                                    <td data-label="Estado">
                                        <span>
                                            {item.estado === 1 ? 'Activo' : 'Inactivo'}
                                            <span
                                                className="estado-indicador"
                                                style={{backgroundColor: getIndicatorColor(item.estado === 1 ? 'Activo' : 'Inactivo')}}
                                            />
                                        </span>
                                    </td>
                                </>
                            )}

                            {menuContent === 'Catálogo' && catalogTab === 'Categorias' && (
                                <>
                                    <td data-label="Estado">
                                        <span>
                                            {item.estado === 1 ? 'Activo' : 'Inactivo'}
                                            <span
                                                className="estado-indicador"
                                                style={{backgroundColor: getIndicatorColor(item.estado === 1 ? 'Activo' : 'Inactivo')}}
                                            />
                                        </span>
                                    </td>
                                </>)
                            }
                            <td>
                                <button className="btn btn-primary btn btn-sm me-2 btn-dollar">
                                    <FontAwesomeIcon icon={faDollarSign}/>
                                </button>
                                <button className="btn-action btn btn-sm me-2" onClick={() => handleEditClick(item)}>
                                    <FontAwesomeIcon icon={faEdit}/>
                                </button>
                                <button className="btn-action-delete btn btn-sm">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
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