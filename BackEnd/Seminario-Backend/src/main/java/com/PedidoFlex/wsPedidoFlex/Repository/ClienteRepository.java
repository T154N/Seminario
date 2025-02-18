package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import com.PedidoFlex.wsPedidoFlex.Models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>, JpaSpecificationExecutor<Cliente> {


    @Query(
            "SELECT c From Cliente c where lower(c.cliente_email) = :email "
    )
    Cliente findClienteByEmail(@Param("email") String email);

    @Query(
            "SELECT c FROM Cliente c WHERE c.cliente_documento = :documento"
    )
    Cliente findClienteByDoc(@Param("documento") String documento);

    @Query(
            "SELECT c FROM Cliente c WHERE c.cliente_Usuario = :usuario"
    )
    Optional<Cliente> findByCliente_Usuario(Usuario usuario);

}
