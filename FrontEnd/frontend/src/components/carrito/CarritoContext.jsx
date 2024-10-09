import React, { createContext, useState, useContext } from "react";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);

    const agregarProducto = (producto) => {
        setProductos((prevProductos) => {
            // Filtra el producto existente para eliminarlo
            const productosSinDuplicados = prevProductos.filter(p => p.id !== producto.id);
            // Devuelve el nuevo array con el producto agregado
            return [...productosSinDuplicados, producto];
        });
    };

    const incrementarCantidad = (id) => {
        setProductos((prevProductos) => {
            return prevProductos.map((producto) => 
                producto.id === id 
                ? { ...producto, cantidad: producto.cantidad + 1 }
                : producto
            );
        });
    };

    const disminuirCantidad = (id) => {
        setProductos((prevProductos) => {
            return prevProductos.reduce((acc, producto) => {
                if (producto.id === id) {
                    if (producto.cantidad > 1) {
                        acc.push({ ...producto, cantidad: producto.cantidad - 1 });
                    }
                    // Si la cantidad llega a 1 y se disminuye, se elimina del carrito
                } else {
                    acc.push(producto);
                }
                return acc;
            }, []);
        });
    };

    const eliminarProducto = (id) => {
        setProductos((prevProductos) => prevProductos.filter(producto => producto.id !== id));
    };

    const generarPedido = () => {
        console.log("Generando pedido...", productos);
        setProductos([]);
    };

    const vaciarCarrito = () => {
        setProductos([]);
    };

    const calcularTotal = () => {
        return productos.reduce((acc, producto) => acc + producto.precioUnitario * producto.cantidad, 0);
    };

    const total = calcularTotal();

    return (
        <CarritoContext.Provider
            value={{
                productos,
                agregarProducto,
                incrementarCantidad,
                disminuirCantidad,
                eliminarProducto,
                generarPedido,
                vaciarCarrito,
                total,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};
