package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.DTO.CategoriaDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Usuario findByEmail(String email);
    /*
    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.UsuarioDTO(u.id, u.email, u.rol, u.contrasenia, u.cliente) FROM Usuario u WHERE u.id = :id")
    UsuarioDTO findByidUsuarioDto(@Param("id") Long id);*/

}
