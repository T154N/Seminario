import React, { createContext, useState, useContext } from "react";

const PedidoContext = createContext();

export const usePedido = () => useContext(PedidoContext);

const storedUser = localStorage.getItem('email');
const usuarioMod = storedUser ?? 'ADMIN';

const generarNumeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const IDpedidoA = generarNumeroAleatorio(1000, 9999);

export const PedidoProvider = ({ children }) => {
    const [pedidoActual, setPedidoActual] = useState({
        id: null,
        fecha: new Date().toISOString().split('T')[0], // formato YYYY-MM-DD
        montoTotal: 0,
        estado: 'Pendiente',
        direccionEntrega: 'Avenida libertad 2587', 
        metodoPago: null,
        nombre: 'UsuarioPrueba',
        productos: []
    });

    const iniciarPedido = (productos) => {
        setPedidoActual((prev) => ({
            ...prev,
            productos,
            montoTotal: calcularTotal(productos)
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
                montoTotal: calcularTotal(productosActualizados)
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
                montoTotal: calcularTotal(productosActualizados)
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
