// CarritoContext.js
import React, { createContext, useState, useContext } from "react";
import { usePedido } from '../Pedido/PedidoContext';
import carritoService from "../../services/carrito/carrito.service";
import loginService from "../../services/login/login.service";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const { iniciarPedido } = usePedido();
    const [productos, setProductos] = useState([]);
    const [cargandoProductosACarrito, setCargandoProductosACarrito] = useState(false);

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

    const eliminarDelCarrito = (id) => {
        setProductos((prevProductos) => prevProductos.filter(producto => producto.id !== id));
    };

    const vaciarCarrito = () => {
        setProductos([]);
    };

    const calcularTotal = () => {
        return productos.reduce((acc, producto) => acc + (producto.precioUnitario * producto.cantidad), 0).toFixed(2);
    };

    const total = calcularTotal();

    const generarPedido = async (navigate) => {
        setCargandoProductosACarrito(true);
        navigate('/pago');
        iniciarPedido(productos);
        const carrito = await carritoService.crearNuevoCarrito(
            loginService.getEmailUsuario()
        );
        await carritoService.cargarProductosAlCarrito(
            carrito,
            productos,
            loginService.getEmailUsuario()
        );
        setCargandoProductosACarrito(false);
    };

    return (
        <CarritoContext.Provider
            value={{
                productos,
                agregarProducto,
                incrementarCantidad,
                disminuirCantidad,
                eliminarDelCarrito,
                vaciarCarrito,
                generarPedido,
                total,
                setCargandoProductosACarrito,
                cargandoProductosACarrito
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};