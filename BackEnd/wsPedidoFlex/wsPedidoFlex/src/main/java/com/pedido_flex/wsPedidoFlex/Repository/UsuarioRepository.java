package com.pedido_flex.wsPedidoFlex.Repository;

import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    @Query(
            value = "SELECT  NEW com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO(u.usuario_id, u.usuario_cliente_email, r.rolNombre, u.usuario_contrasena) " +
                    "FROM Usuario u " +
                    "JOIN Roles r ON u.usuario_rol_id = r.rol_id " +
                    "WHERE u.usuario_cliente_email = :email "+
                    "AND u.usuario_estado_id=1")
    UsuarioDTO findByEmailActivo(@Param("email") String email);

    @Query(
            value = "SELECT  NEW com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO(u.usuario_id, u.usuario_cliente_email, r.rolNombre, u.usuario_contrasena) " +
                    "FROM Usuario u " +
                    "JOIN Roles r ON u.usuario_rol_id = r.rol_id " +
                    "WHERE u.usuario_cliente_email = :email ")
    UsuarioDTO findByEmail(@Param("email") String email);

    @Query(
            value = "SELECT  NEW com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO(u.usuario_id, u.usuario_cliente_email, r.rolNombre, u.usuario_contrasena) " +
                    "FROM Usuario u " +
                    "JOIN Roles r ON u.usuario_rol_id = r.rol_id " +
                    "JOIN u.cliente c "+
                    "WHERE(lower(u.usuario_cliente_email) = trim(lower( :email )) " +
                    "OR c.cliente_documento = trim(:documento))"
    )
    UsuarioDTO findByUserRegister(@Param("email") String email,@Param("documento") String documento);

    @Modifying
    @Query("UPDATE Usuario u SET u.usuario_contrasena = :password WHERE u.usuario_id = :id")
    void updateUsuarioContrasenia(@Param("id") Long id, @Param("password") String password);

}
