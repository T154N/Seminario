package com.pedido_flex.wsPedidoFlex.Repository;

import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import org.hibernate.sql.ast.tree.insert.Values;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    @Query(
            value = "SELECT  NEW com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO(u.usuario_id, u.usuario_cliente_email, r.rolNombre) " +
                    "FROM Usuario u " +
                    "JOIN Roles r ON u.usuario_rol_id = r.rol_id " +
                    "WHERE u.usuario_cliente_email = :email "+
                    "AND u.usuario_estado_id=1")
    UsuarioDTO findByEmail(@Param("email") String email);
}
