import React, { createContext, useState, useContext } from "react";
import carritoService from "../../services/carrito/carrito.service";
import loginService from "../../services/login/login.service";
import clienteService from "../../services/cliente/cliente.service";
import pedidoService from "../../services/pedido.service";

const PedidoContext = createContext();

export const usePedido = () => useContext(PedidoContext);

export const PedidoProvider = ({ children }) => {
    const [pedidoActual, setPedidoActual] = useState({
        id: null,
        fecha: new Date().toISOString().split('T')[0], // formato YYYY-MM-DD
        total: 0,
        estado: 'Pendiente', 
        metodoPago: null,
        productos: []
    });

    const iniciarPedido = (productos) => {
        setPedidoActual((prev) => ({
            ...prev,
            productos,
            total: calcularTotal(productos)
        }));
    };

    const actualizarCantidad = (id, cantidad) => {
        setPedidoActual((prev) => {
            const productosActualizados = prev.productos.map((producto) =>
                producto.id === id ? { ...producto, cantidad } : producto
            );
            return {
                ...prev,
                productos: productosActualizados,
                total: calcularTotal(productosActualizados)
            };
        });
    };

    const calcularTotal = (productos) => {
        return productos.reduce((acc, producto) => acc + producto.precioUnitario * producto.cantidad, 0).toFixed(2);
    };

    const setMetodoPago = (metodo) => {
        setPedidoActual((prev) => ({ ...prev, metodoPago: metodo }));
    };

    const setEstadoPedido = (estado) => {
        setPedidoActual((prev) => ({ ...prev, estado }));
    };

    const setPedidoId = (id) => {
        setPedidoActual((prev) => ({ ...prev, id }));
    };

    const eliminarDelPedido = async (id) => {
        await carritoService.removeCarrito(
            carritoService.getCarritoId(),
            id,
            loginService.getEmailUsuario()
        );
        setPedidoActual( (prev) => {
            const productosActualizados = prev.productos.filter((producto) => producto.id !== id);
            return {
                ...prev,
                productos: productosActualizados,
                total: calcularTotal(productosActualizados)
            };
        });
    };

    const finalizarPedido = async () => {
        try {
            const carritoId = carritoService.getCarritoId();
            const domicilioId = clienteService.getClienteDomicilioId();
            const medioPagoId = pedidoActual.metodoPago;
            const usuarioTransaccion = loginService.getEmailUsuario();
            const pedidoHecho = await pedidoService.crearPedido(carritoId, domicilioId, medioPagoId, usuarioTransaccion);
            setPedidoId(pedidoHecho.pedidoId);
            return pedidoHecho;
        } catch (err) {
            console.error(err);
            return 400;
        }
    };

    return (
        <PedidoContext.Provider
            value={{
                pedidoActual,
                iniciarPedido,
                actualizarCantidad,
                setMetodoPago,
                setEstadoPedido,
                setPedidoId,
                eliminarDelPedido,
                finalizarPedido
            }}
        >
            {children}
        </PedidoContext.Provider>
    );
};
