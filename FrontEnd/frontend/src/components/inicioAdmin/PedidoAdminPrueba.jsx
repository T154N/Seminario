import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicioAdmin.css';
import SeleccionarProductos from './SeleccionProducto';
import clienteService from '../../services/cliente/cliente.service';

const PedidoAdminPrueba = ({ registro , onSave , onCancel }) => {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            cliente: '',
            productos: [],
            formaPago: '',
            domicilio: '',
        }
    });
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [clientes, setClientes] = useState([]);

    const cliente = watch('cliente'); // Para sincronizar el valor del cliente seleccionado

    useEffect(() => {
        const fetchClientes = async () => {
            const clientes = await clienteService.getAllClientes();
            setClientes(clientes);
        };
        fetchClientes();
    }, []);

    useEffect(() => {
        if (registro) {
            setValue('cliente', registro.cliente || '');
            setValue('formaPago', registro.formaPago || '');
            setValue('domicilio', registro.domicilio || '');
            setProductosSeleccionados(registro.productos || []);
        }
    }, [registro, setValue]);

    const onSubmit = (data) => {
        data.productos = productosSeleccionados;
        onSave(data);
    };

    const handleProductoAgregado = (producto) => {
        setProductosSeleccionados((prevSeleccionados) => {
            const productoExistente = prevSeleccionados.some(p => p.id === producto.id);
            if (productoExistente) {
                return prevSeleccionados.map(p =>
                    p.id === producto.id ? { ...p, cantidad: producto.cantidad } : p
                );
            } else {
                return [...prevSeleccionados, { ...producto, cantidad: producto.cantidad || 1 }];
            }
        });
    };

    const handleCantidadChange = (productoId, cantidad) => {
        setProductosSeleccionados((prevSeleccionados) =>
            prevSeleccionados.map(p =>
                p.id === productoId ? { ...p, cantidad: Math.max(cantidad, 1) } : p
            )
        );
    };

    const handleRemoveProducto = (productoId) => {
        setProductosSeleccionados((prevSeleccionados) =>
            prevSeleccionados.filter(p => p.id !== productoId)
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue(name, value);
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="cliente">Clientes</label>
                        <select
                            className="form-select form-select-modificar"
                            name="cliente"
                            value={register.cliente}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar Cliente</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nombre} {cliente.apellido}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formaPago">Forma de Pago</label>
                        <input
                            type="text"
                            className="form-control"
                            id="formaPago"
                            {...register('formaPago')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="domicilio">Domicilio</label>
                        <input
                            type="text"
                            className="form-control"
                            id="domicilio"
                            {...register('domicilio')}
                        />
                    </div>
                    <SeleccionarProductos
                        onProductosSeleccionados={setProductosSeleccionados}
                        onProductoAgregado={handleProductoAgregado}
                        productosSeleccionados={productosSeleccionados}
                    />
                    <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-danger" onClick={onCancel}>
                            <FontAwesomeIcon icon={faTimes} /> Cancelar
                        </button>
                        <button type="submit" className="btn btn-success">
                            <FontAwesomeIcon icon={faSave} /> Guardar
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-md-6">
                <h4>Productos Seleccionados</h4>
                <ul className="list-group">
                    {productosSeleccionados.map((producto, index) => (
                        <li key={index} className="list-group-item">
                            <div><strong>Nombre:</strong> {producto.nombre}</div>
                            <div><strong>Precio Unitario:</strong> ${producto.precioUnitario.toFixed(2)}</div>
                            <div className="d-flex justify-content-center align-items-center mt-2">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => handleCantidadChange(producto.id, producto.cantidad - 1)}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <input
                                    type="number"
                                    value={producto.cantidad}
                                    onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value, 10))}
                                    className="mx-2 input-cantidad"
                                    style={{ width: "50px" }}
                                    min="1"
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => handleCantidadChange(producto.id, producto.cantidad + 1)}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <div className="subtotal"><strong>Subtotal:</strong> ${(producto.cantidad * producto.precioUnitario).toFixed(2)}</div>
                            <button
                                className="btn btn-sm p-1 btn-danger mt-2"
                                onClick={() => handleRemoveProducto(producto.id)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PedidoAdminPrueba;
