import React, { createContext, useState, useContext } from "react";
import carritoService from "../../services/carrito/carrito.service";
import pedidoService from "../../services/pedido/pedido.service";

const PedidoContext = createContext();

export const usePedido = () => useContext(PedidoContext);

export const PedidoProvider = ({ children }) => {
    const [pedidoActual, setPedidoActual] = useState({
        id: null, // aca va el numero de pedido
        fecha: new Date(), // formato YYYY-MM-DD
        total: 0,
        estado: 'Nuevo',
        metodoPago: null,
        productos: [],
        direccionEnvio: null,
        nombre: '', // Agregar el atributo nombre
        pedidoId: null // aca va el Id de pedido
    });

    const iniciarPedido = (productos, nombre) => {
        setPedidoActual((prev) => ({
            ...prev,
            productos,
            total: calcularTotal(productos),
            nombre // Asignar el nombre del cliente
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

    const setDireccionEnvio = (direccion) => {
        setPedidoActual((prev) => ({ ...prev, direccionEnvio: direccion }));
    };

    const setTruePedidoId = (pedidoId) => {
        setPedidoActual((prev) => ({ ...prev, pedidoId }));
    };

    const eliminarDelPedido = async (id) => {
        await carritoService.removeCarrito(
            localStorage.getItem('carritoId'),
            id,
            localStorage.getItem('email')
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
            const carritoId = localStorage.getItem('carritoId');
            const domicilioId = localStorage.getItem('domicilioId');
            const medioPagoId = pedidoActual.metodoPago;
            const usuarioTransaccion = localStorage.getItem('email');
            const pedidoHecho = await pedidoService.crearPedido(carritoId, domicilioId, medioPagoId, usuarioTransaccion);
            setPedidoId(pedidoHecho.nroPedido); // Terminar cuando se arregle el back y me traiga el id, pedidoId es el numero de pedido
            setTruePedidoId(pedidoHecho.pedidoId); // ACA tiene que ir el id verdadero del pedido
            setDireccionEnvio(localStorage.getItem('direccionNombre'));
            console.log("pedidoHecho", pedidoHecho);
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