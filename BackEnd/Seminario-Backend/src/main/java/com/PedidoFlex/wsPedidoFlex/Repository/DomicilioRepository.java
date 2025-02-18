package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import com.PedidoFlex.wsPedidoFlex.Models.Domicilio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DomicilioRepository  extends JpaRepository<Domicilio, Long> {
    List<Domicilio> findAllByCliente(Cliente cliente);
}
