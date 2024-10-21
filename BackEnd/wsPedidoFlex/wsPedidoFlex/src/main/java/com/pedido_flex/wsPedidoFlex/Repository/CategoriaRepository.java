package com.pedido_flex.wsPedidoFlex.Repository;

import com.pedido_flex.wsPedidoFlex.DTO.CategoriaDTO;
import com.pedido_flex.wsPedidoFlex.DTO.ProductoDTO;
import com.pedido_flex.wsPedidoFlex.Model.Categoria;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("SELECT new com.pedido_flex.wsPedidoFlex.DTO.CategoriaDTO(c.categoriaId, c.categoriaNombre, c.categoriaObservaciones,c.categoriaUrlImagen) " +
            "FROM Categoria c WHERE c.categoriaEstadoId = 1")
    List<CategoriaDTO> findAllCategoriaDto();

    @Query("SELECT new com.pedido_flex.wsPedidoFlex.DTO.CategoriaDTO(c.categoriaId, c.categoriaNombre, c.categoriaObservaciones,c.categoriaUrlImagen) " +
            "FROM Categoria c WHERE c.categoriaEstadoId = 1 AND c.categoriaId = :id")
    CategoriaDTO findByidCategoriaDto(@Param("id") Long id);


}
