// CarritoContext.js
import React, { createContext, useState, useContext } from "react";
import { usePedido } from '../Pedido/PedidoContext'; // Importamos PedidoContext

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const { iniciarPedido } = usePedido();
    const [productos, setProductos] = useState([]);

    const agregarProducto = (producto) => {
        setProductos((prevProductos) => {
            const productosSinDuplicados = prevProductos.filter(p => p.id !== producto.id);
            return [...productosSinDuplicados, producto];
        });
    };

    const incrementarCantidad = (id) => {
        setProductos((prevProductos) => {
            return prevProductos.map((producto) =>
                producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
            );
        });
    };

    const disminuirCantidad = (id) => {
        setProductos((prevProductos) => {
            return prevProductos.map((producto) => {
                if (producto.id === id) {
                    if (producto.cantidad > 1) {
                        return { ...producto, cantidad: producto.cantidad - 1 };
                    }
                    return producto;
                }
                return producto;
            });
        });
    };

    const eliminarProducto = (id) => {
        setProductos((prevProductos) => prevProductos.filter(producto => producto.id !== id));
    };

    const vaciarCarrito = () => {
        setProductos([]);
    };

    const calcularTotal = () => {
        return productos.reduce((acc, producto) => acc + (producto.precioUnitario * producto.cantidad), 0);
    };    

    const total = calcularTotal();

    const generarPedido = (navigate) => {
        iniciarPedido(productos); // Mandamos los datos al PedidoContext
        setProductos([]); 
        navigate('/pago'); // Navegar a la página de pago
    };

    return (
        <CarritoContext.Provider
            value={{
                productos,
                agregarProducto,
                incrementarCantidad,
                disminuirCantidad,
                eliminarProducto,
                vaciarCarrito,
                generarPedido,
                total
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};
