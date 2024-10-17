package com.pedido_flex.wsPedidoFlex.Repository;


import com.pedido_flex.wsPedidoFlex.DTO.ClienteDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;


@NoRepositoryBean
public interface GenericRepository<T, ID> extends JpaRepository<T, ID> {

//    @Query(
//            value = "Select new com.pedido_flex.wsPedidoFlex.DTO.ClienteDTO (c.cliente_id,c.cliente_nombre,c.cliente_apellido,c.cliente_email,c.cliente_telefono,c.cliente_nombre ) " +
//                    "FROM Cliente c " +
//                    "WHERE c.cliente_id = :id ")
//    ClienteDTO findClienteDtoByID(@Param("id") Long id);
}
