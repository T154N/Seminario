package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.Models.Pedido;
import com.PedidoFlex.wsPedidoFlex.Models.PedidoDetalle;
import com.PedidoFlex.wsPedidoFlex.Models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle, Long> {

    @Query("SELECT pd.detalle_producto.producto_nombre,pd.pedido_detalle_precio_individual ," +
        " ROUND(pd.pedido_detalle_precio_individual * pd.pedido_detalle_cantidad, 2) AS pedido_detalle_subtotal " +
        "FROM PedidoDetalle pd JOIN pd.pedido p WHERE p.pedido_id = :id")
    PedidoDetalle findPedidoDetalleByPedidoId(Long id);

    List<PedidoDetalle> findByPedido(Pedido pedido);



}
