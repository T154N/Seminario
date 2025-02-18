package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.Models.Tipo_Domicilio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Tipo_DomicilioRepository extends JpaRepository<Tipo_Domicilio, Long> {
}
