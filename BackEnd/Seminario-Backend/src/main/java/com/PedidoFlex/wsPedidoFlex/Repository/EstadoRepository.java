package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.Models.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long> {

    @Query("Select e from Estado e where e.estado_id not in (1,2,14)" )
    List<Estado> findAllEstadoPedido();

    @Query("Select e from Estado e where e.estado_id  in (9,12,14)" )
    List<Estado> findAllEstadoCarrito();
}
