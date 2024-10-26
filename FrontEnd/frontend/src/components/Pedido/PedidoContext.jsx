// PedidoContext.js
import React, { createContext, useState, useContext } from "react";

const PedidoContext = createContext();

export const usePedido = () => useContext(PedidoContext);

export const PedidoProvider = ({ children }) => {
    const [pedidoActual, setPedidoActual] = useState([]);
    const [metodoPago, setMetodoPago] = useState(null);

    const iniciarPedido = (productos) => {
        setPedidoActual(productos);
    };

    const actualizarCantidad = (id, cantidad) => {
        setPedidoActual((productos) => 
            productos.map((producto) =>
                producto.id === id ? { ...producto, cantidad } : producto
            )
        );
    };

    const calcularTotal = () => {
        return pedidoActual.reduce((acc, producto) => acc + producto.precioUnitario * producto.cantidad, 0);
    };

    const total = calcularTotal();

    return (
        <PedidoContext.Provider
            value={{
                pedidoActual,
                metodoPago,
                setMetodoPago,
                iniciarPedido,
                actualizarCantidad,
                calcularTotal,
                total
            }}
        >
            {children}
        </PedidoContext.Provider>
    );
};
