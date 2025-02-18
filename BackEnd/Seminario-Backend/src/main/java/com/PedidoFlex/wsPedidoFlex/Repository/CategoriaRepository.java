package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.DTO.CategoriaDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.CategoriaDTO(c.categoriaId, c.categoriaNombre, c.categoriaObservaciones,c.categoriaUrlImagen, c.categoriaEstadoId) " +
            "FROM Categoria c WHERE c.categoriaEstadoId = 1")
    List<CategoriaDTO> findAllCategoriaDto();

    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.CategoriaDTO(c.categoriaId, c.categoriaNombre, c.categoriaObservaciones,c.categoriaUrlImagen, c.categoriaEstadoId) " +
            "FROM Categoria c")
    List<CategoriaDTO> findAllCategoriaDtoAdmin();

    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.CategoriaDTO(c.categoriaId, c.categoriaNombre, c.categoriaObservaciones,c.categoriaUrlImagen,c.categoriaEstadoId) " +
            "FROM Categoria c WHERE c.categoriaEstadoId = 1 AND c.categoriaId = :id")
    CategoriaDTO findByidCategoriaDto(@Param("id") Long id);


    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.CategoriaDTO(c.categoriaId, c.categoriaNombre, c.categoriaObservaciones,c.categoriaUrlImagen,c.categoriaEstadoId) " +
            "FROM Categoria c WHERE  c.categoriaId = :id")
    CategoriaDTO findByidCategoriaDtoAdmin(@Param("id") Long id);

}
