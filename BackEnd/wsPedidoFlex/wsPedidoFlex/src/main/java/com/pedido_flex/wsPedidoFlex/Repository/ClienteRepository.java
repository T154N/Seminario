package com.pedido_flex.wsPedidoFlex.Repository;


import com.pedido_flex.wsPedidoFlex.Model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}