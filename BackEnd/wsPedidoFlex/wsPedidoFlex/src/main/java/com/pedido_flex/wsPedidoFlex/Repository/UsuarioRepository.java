package com.pedido_flex.wsPedidoFlex.Repository;

import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
