package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.Models.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {
}
