package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.DTO.CarritoDetalleDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.Carrito;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.CarritoDetalle;
import com.PedidoFlex.wsPedidoFlex.Models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarritoDetalleRepository extends JpaRepository<CarritoDetalle, Long> {
    List<CarritoDetalle> findCarritoDetalleByCarrito(Carrito carrito);

    Optional<CarritoDetalle> findCarritoDetalleByCarritoAndProducto(Carrito carrito, Producto producto);
}
