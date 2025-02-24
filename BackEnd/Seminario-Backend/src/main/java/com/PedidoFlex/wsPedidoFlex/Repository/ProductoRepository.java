package com.PedidoFlex.wsPedidoFlex.Repository;

import com.PedidoFlex.wsPedidoFlex.DTO.ProductoDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Categoria;
import com.PedidoFlex.wsPedidoFlex.Models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> ,  JpaSpecificationExecutor<Producto>, CrudRepository<Producto, Long> {

    //no utilice query pero en teoria esto busca por categoria
    /* List<Producto> findByCategoria(Categoria categoria);*/

    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.ProductoDTO(p.producto_descripcion, p.producto_id, p.producto_nombre, p.producto_observaciones, p.producto_precio, p.categoria.categoriaNombre, p.producto_url_imagen, p.producto_estado_id,p.categoria.categoriaId) " +
            "FROM Producto p WHERE p.categoria = :categoria AND p.producto_estado_id = 1")
    List<ProductoDTO> findProductosPorCategoriaDto(@Param("categoria") Categoria categoria);

    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.ProductoDTO(p.producto_descripcion, p.producto_id, p.producto_nombre, p.producto_observaciones, p.producto_precio, p.categoria.categoriaNombre, p.producto_url_imagen, p.producto_estado_id,p.categoria.categoriaId) " +
            "FROM Producto p WHERE p.producto_estado_id = 1")
    List<ProductoDTO> findAllProductosDto();

    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.ProductoDTO(p.producto_descripcion, p.producto_id, p.producto_nombre, p.producto_observaciones, p.producto_precio, p.categoria.categoriaNombre, p.producto_url_imagen, p.producto_estado_id,p.categoria.categoriaId) " +
            "FROM Producto p WHERE p.producto_id = :id AND p.producto_estado_id = 1")
    ProductoDTO findProductoDTOById(@Param("id") Long id);


    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.ProductoDTO(p.producto_descripcion, p.producto_id, p.producto_nombre, p.producto_observaciones, p.producto_precio, p.categoria.categoriaNombre, p.producto_url_imagen, p.producto_estado_id,p.categoria.categoriaId) " +
            "FROM Producto p WHERE p.producto_id = :id")
    ProductoDTO findProductoDTOByIdAdmin(@Param("id") Long id);


    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.ProductoDTO(p.producto_descripcion, p.producto_id, p.producto_nombre, p.producto_observaciones, p.producto_precio, p.categoria.categoriaNombre, p.producto_url_imagen,p.producto_estado_id,p.categoria.categoriaId) " +
            "FROM Producto p WHERE p.categoria = :categoria AND p.producto_estado_id = 2")
    List<ProductoDTO> findProductosPorCategoriaDtoBaja(@Param("categoria") Categoria categoria);

    @Query("SELECT new com.PedidoFlex.wsPedidoFlex.DTO.ProductoDTO(p.producto_descripcion, p.producto_id, p.producto_nombre, p.producto_observaciones, p.producto_precio, p.categoria.categoriaNombre, p.producto_url_imagen, p.producto_estado_id,p.categoria.categoriaId) " +
            "FROM Producto p")
    List<ProductoDTO> findAllProductosDtoAdmin();
}
