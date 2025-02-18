package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.DTO.PedidoCliDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.PedidoDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.PedidosClientesDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.Carrito;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.CarritoDetalle;
import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import com.PedidoFlex.wsPedidoFlex.Models.Pedido;
import com.PedidoFlex.wsPedidoFlex.Models.PedidoDetalle;
import com.PedidoFlex.wsPedidoFlex.Models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long>, JpaSpecificationExecutor<Pedido> {
   @Query("Select p.pedido_id,p.pedido_numero_pedido, c.cliente_nombre, c.cliente_apellido, c.cliente_email,p.pedido_direccion_entrega, p.pedido_detalles, p.pedido_total_dinero " +
           "from Pedido p " +
           "JOIN Cliente c ON p.cliente.cliente_id = c.cliente_id " +
           "JOIN PedidoDetalle pd ON p.pedido_id = pd.pedido.pedido_id " +
   "where c.cliente_id = :clienteId")
    Pedido findPedidoByClienteId(@Param("clienteId") Long clienteId);

   @Query("SELECT MAx(p.pedido_numero_pedido) FROM Pedido p")
    Long findMaxPedidoNumeroPedido();

    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.PedidoDTO(p.pedido_id, p.pedido_numero_pedido, " +
            "c.cliente_nombre, c.cliente_apellido, c.cliente_email, " +
            "p.pedido_direccion_entrega, p.pedido_fecha_alta, p.pedido_total_dinero, " +
            "p.pedido_estado_id, p.estado_registro_id) " +
            "FROM Pedido p " +
            "JOIN Cliente c ON p.cliente.cliente_id = c.cliente_id")
    List<PedidoDTO> findAllPedidos();

    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.PedidoCliDTO(p.pedido_id, p.pedido_numero_pedido, " +
            "c.cliente_nombre, c.cliente_apellido, c.cliente_email, " +
            "p.pedido_direccion_entrega, p.pedido_fecha_alta, p.pedido_fecha_estimada_entrega, p.pedido_total_dinero, " +
            "p.pedido_estado_id, p.estado_registro_id,e.estado_descripcion,mp.medio_pago_descripcion) " +
            "FROM Pedido p, Estado e " +
            "JOIN p.cliente c " +
            "JOIN p.medio_pago mp " +
            "where p.pedido_estado_id = e.estado_id " +
            "and p.cliente.cliente_id = :clienteId")
    List<PedidoCliDTO> findAllPedidosByClienteId(@Param("clienteId") Long clienteId);


   /* @Query("Select new com.PedidoFlex.wsPedidoFlex.DTO.PedidosClientesDTO( " +
            "p.pedido_id," +
            "p.pedido_numero_pedido," +
            " p.cliente.cliente_id," +
            "p.carrito.carrito_id," +
            " p.createAdmin," +
            "p.pedido_fecha_entrega," +
            "p.pedido_fecha_estimada_entrega," +
            "p.estado_pago_id," +
            "p.pedido_estado_id," +
            "p.estado_registro_id," +
            "p.pedido_observaciones," +
            "p.pedido_fecha_alta,p.pedido_usuario_alta," +
            "p.pedido_total_dinero," +
            "p.pedido_direccion_entrega) " +
            "from Pedido p where p.cliente.cliente_id = :clienteId")
    List<PedidosClientesDTO> findAllPedidosByClienteId(@Param("clienteId") Long clienteId);
*/

}
