package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.Models.Carrito.Carrito;
import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    @Query(
            "SELECT c " +
                    "FROM Carrito c WHERE c.cliente = :cliente " +
                    "AND c.estadoId = 1" +
                    "AND c.estadoCarritoPedido = 12" +
                    "ORDER BY c.carrito_fecha_creacion DESC"
    )
    Carrito findTopByCliente(@Param("cliente") Cliente cliente);
}