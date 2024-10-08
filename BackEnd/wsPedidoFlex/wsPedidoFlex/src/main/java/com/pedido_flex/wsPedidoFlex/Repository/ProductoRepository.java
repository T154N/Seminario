package com.pedido_flex.wsPedidoFlex.Repository;

import com.pedido_flex.wsPedidoFlex.DTO.ProductoDTO;
import com.pedido_flex.wsPedidoFlex.Model.Categoria;
import com.pedido_flex.wsPedidoFlex.Model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    //no utilice query pero en teoria esto busca por categoria
   /* List<Producto> findByCategoria(Categoria categoria);*/

    @Query("SELECT new com.pedido_flex.wsPedidoFlex.DTO.ProductoDTO(p.producto_descripcion, p.producto_id, p.producto_nombre, p.producto_observaciones, p.producto_precio, p.categoria.categoriaNombre) " +
            "FROM Producto p WHERE p.categoria = :categoria AND p.producto_estado_id = 1")
    List<ProductoDTO> findProductosPorCategoriaDto(@Param("categoria") Categoria categoria);

    @Query("SELECT new com.pedido_flex.wsPedidoFlex.DTO.ProductoDTO(p.producto_descripcion, p.producto_id, p.producto_nombre, p.producto_observaciones, p.producto_precio, p.categoria.categoriaNombre) " +
            "FROM Producto p WHERE p.producto_estado_id = 1")
    List<ProductoDTO> findAllProductosDto();

    @Query("SELECT new com.pedido_flex.wsPedidoFlex.DTO.ProductoDTO(p.producto_descripcion, p.producto_id, p.producto_nombre, p.producto_observaciones, p.producto_precio, p.categoria.categoriaNombre) " +
            "FROM Producto p WHERE p.producto_id = :id AND p.producto_estado_id = 1")
    ProductoDTO findProductoById(@Param("id") Long id);




}