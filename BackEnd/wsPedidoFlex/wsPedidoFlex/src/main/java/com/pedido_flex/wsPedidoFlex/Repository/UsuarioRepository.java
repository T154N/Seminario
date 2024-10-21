package com.pedido_flex.wsPedidoFlex.Repository;

import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>, JpaSpecificationExecutor<Usuario> {

    @Query(
            value = "SELECT NEW com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO(u.usuario_id, u.usuario_email, r, u.usuario_contrasena) " +
                    "FROM Usuario u " +
                    "JOIN u.rol r " +
                    "WHERE u.usuario_email = :email " +
                    "AND u.usuario_estado_id = 1")
    UsuarioDTO findByEmailActivo(@Param("email") String email);

    @Query(
            value = "SELECT  NEW com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO(u.usuario_id, u.usuario_email, r, u.usuario_contrasena) " +
                    "FROM Usuario u " +
                    "JOIN u.rol r " +
                    "WHERE lower(u.usuario_email) = lower(trim(:email)) ")
    UsuarioDTO findByEmail(@Param("email") String email);

    @Query(
            value = "SELECT  NEW com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO (u.usuario_id, u.usuario_email) " +
                    "FROM Cliente c " +
                    "JOIN c.cliente_Usuario u "+
                    "WHERE(lower(u.usuario_email) = trim(lower( :email )) " +
                    "OR c.cliente_documento = trim(:documento))"
    )
    UsuarioDTO findByUserRegister(@Param("email") String email,@Param("documento") String documento);

    @Modifying
    @Query("UPDATE Usuario u SET u.usuario_contrasena = :password WHERE u.usuario_id = :id")
    void updateUsuarioContrasenia(@Param("id") Long id, @Param("password") String password);

}
