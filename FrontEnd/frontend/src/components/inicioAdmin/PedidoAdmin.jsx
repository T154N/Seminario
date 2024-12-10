import React, { useState, useEffect } from "react";
import clienteService from "../../services/cliente/cliente.service";
import ConfirmModal from "./ConfirmModal";
import carritoService from "../../services/carrito/carrito.service";
import loginService from "../../services/login/login.service";
import SeleccionarProductos from "./SeleccionProducto";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./inicioAdmin.css";
import "./PedidoAdmin.css";
import {usePedido} from "../Pedido/PedidoContext";
import pedidoService from "../../services/pedido/pedido.service";

export function PedidoAdmin({ onSave, onCancel }) {
    const [formData, setFormData] = useState({
        cliente: '',
        productos: [],
        formaPago: '',
        domicilio: ''
    });
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [domicilios, setDomicilio] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [cargandoProductosACarrito, setCargandoProductosACarrito] = useState(false);
    const [error, setError] = useState('');
    const { iniciarPedido } = usePedido();

    useEffect(() => {
        const fetchClientes = async () => {
            const clientes = await clienteService.getAllClientes();
            setClientes(clientes);
            setIsLoading(false);
        };
        fetchClientes();
    }, []);

    useEffect(() => {
        if (formData.cliente) {
            const fetchDomicilio = async () => {
                const domicilio = await clienteService.getDomicilioByClienteId(formData.cliente);
                setDomicilio(domicilio);
            };
            fetchDomicilio();
        }
    }, [formData.cliente]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productosSeleccionados.length === 0) {
            setError('Debe seleccionar al menos un producto.');
            return;
        }
        setError('');
        setShowModal(true);
    };

    const handleConfirm = async () => {
        iniciarPedido(productosSeleccionados);
        const pedido = await pedidoService.generarPedido(formData.cliente, formData.domicilio, formData.formaPago, loginService.getEmailUsuario());

        for (const producto of productosSeleccionados) {
            const productoData = {
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion || "",
                precio: producto.precioUnitario,
                observaciones: producto.observaciones || "",
                categoriaNombre: producto.categoriaNombre || "",
                urlImagen: producto.urlImagen || ""
            };
            await pedidoService.addItemToPedido(pedido.id, producto.cantidad, loginService.getEmailUsuario(), productoData);
        }

        setCargandoProductosACarrito(false);
        setShowModal(false);
        if (onSave) {
            onSave();
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        setShowModal(false);
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

    const calcularTotal = () => {
        return productosSeleccionados.reduce((total, producto) => total + (producto.cantidad * producto.precioUnitario), 0).toFixed(2);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-start">
                <div className="row">
                    <h2 className="text-center">Nuevo Pedido</h2>
                    <div className="col-7">
                        <SeleccionarProductos
                            onProductosSeleccionados={setProductosSeleccionados}
                            productosSeleccionados={productosSeleccionados}
                        />
                    </div>
                    <div className="col-5 informacionPedido">
                        <div className="row p-0">
                            <div className="col-12 col-sm-6 p-0">
                                <div className="mt-1 mb-0 pe-2">
                                    <label className="form-label m-1" style={{fontSize: '20px'}}>Cliente</label>
                                    <select
                                        className="form-select form-select-modificar"
                                        name="cliente"
                                        value={formData.cliente}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Seleccione un cliente</option>
                                        {clientes.map((cliente) => (
                                            <option key={cliente.id} value={cliente.id}>
                                                {cliente.nombre} {cliente.apellido}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 p-0">
                                <div className="mt-1 mb-0 pe-2">
                                    <label className="form-label m-1" style={{fontSize: '20px'}}>Forma de Pago</label>
                                    <select
                                        className="form-select form-select-modificar"
                                        name="formaPago"
                                        value={formData.formaPago}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Seleccione una forma de pago</option>
                                        <option value="1">Transferencia</option>
                                        <option value="2">Efectivo</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row p-0">
                            <div className="col-12 col-sm-12 p-0">
                                <div className="mt-1 mb-0 pe-2">
                                    <label className="form-label m-1" style={{fontSize: '20px'}}>Domicilio</label>
                                    <select
                                        className="form-select form-select-modificar"
                                        name="domicilio"
                                        value={formData.domicilio}
                                        onChange={handleChange}
                                        required
                                    >
                                     <option value="" disabled>Seleccione un domicilio</option>
                                        {domicilios.map((domicilio) => (
                                            <option key={domicilio.id} value={domicilio.id}>
                                                {domicilio.direccion}
                                            </option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row p-0">
                            <div className="col-12 col-sm-12 p-0">
                                <div className="mt-1 mb-0 pe-0">
                                    <label className="form-label m-1" style={{fontSize: '20px'}}>Productos Seleccionados</label>
                                    <div className="resumen-productos" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                                        <ul className="list-group">
                                            {productosSeleccionados.map((producto, index) => (
                                                <li key={index} className="list-group-item">
                                                    <div><strong>Nombre:</strong> {producto.nombre}</div>
                                                    <div><strong>Precio Unitario:</strong> ${producto.precioUnitario.toFixed(2)}</div>
                                                    <div className="d-flex justify-content-center align-items-center mt-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => handleCantidadChange(producto.id, producto.cantidad - 1)}
                                                        >
                                                            <FontAwesomeIcon icon={faMinus}/>
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={producto.cantidad}
                                                            onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value, 10))}
                                                            className="mx-2 input-cantidad"
                                                            style={{width: "50px"}}
                                                            min="1"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => handleCantidadChange(producto.id, producto.cantidad + 1)}
                                                        >
                                                            <FontAwesomeIcon icon={faPlus}/>
                                                        </button>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                                        <div className="subtotal">
                                                            <strong>Subtotal:</strong> ${(producto.cantidad * producto.precioUnitario).toFixed(2)}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleRemoveProducto(producto.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash}/> Eliminar
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row p-0 mt-3">
                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>Total:</h5>
                                    <h5>${calcularTotal()}</h5>
                                </div>
                            </div>
                        </div>
                        {error && (
                            <div className="row p-0 mt-3">
                                <div className="col-12">
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="row p-0 mt-3">
                            <div className="col-12 d-flex justify-content-between">
                                <button type="button" className="btn btn-danger" onClick={handleCancel}>
                                    <FontAwesomeIcon icon={faTimes} /> Cancelar
                                </button>
                                <button type="submit" className="btn btn-success">
                                    <FontAwesomeIcon icon={faSave} /> Aceptar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                show={showModal}
                onHide={handleCancel}
                onConfirm={handleConfirm}
                loading={cargandoProductosACarrito}
                message={"¿Estás seguro de que deseas registrar el pedido?"}
            />
        </form>
    );
}

export default PedidoAdmin;