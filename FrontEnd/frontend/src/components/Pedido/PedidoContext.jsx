import React, { createContext, useState, useContext } from "react";

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

    const eliminarDelPedido = (id) => {
        setPedidoActual((prev) => {
            const productosActualizados = prev.productos.filter((producto) => producto.id !== id);
            return {
                ...prev,
                productos: productosActualizados,
                total: calcularTotal(productosActualizados)
            };
        });
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
                eliminarDelPedido 
            }}
        >
            {children}
        </PedidoContext.Provider>
    );
};
