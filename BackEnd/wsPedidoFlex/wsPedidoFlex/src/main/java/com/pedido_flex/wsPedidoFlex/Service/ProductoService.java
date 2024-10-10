package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.Model.Categoria;
import com.pedido_flex.wsPedidoFlex.Model.Producto;
import com.pedido_flex.wsPedidoFlex.Repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import com.pedido_flex.wsPedidoFlex.DTO.ProductoDTO;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public Producto createProducto(Producto producto) { return productoRepository.save(producto); }
    public Producto findProductoById(Long id) { return productoRepository.getReferenceById(id).get(); }


    public ProductoDTO convertToDTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(producto.getProducto_id());
        dto.setNombre(producto.getProducto_nombre());
        dto.setDescripcion(producto.getProducto_descripcion());
        dto.setPrecio(producto.getProducto_precio());
        dto.setObservaciones(producto.getProducto_observaciones());
        dto.setCategoriaNombre(producto.getCategoria().getCategoriaNombre());
        return dto;
    }


    public Producto setBajaProductoById(Long id, String usuarioModificacion) {
        Producto producto = findProductoById(id);
        producto.setProducto_estado_id(2);
        producto.setProducto_usuario_modificacion(usuarioModificacion);
        producto.setProducto_usuario_baja(usuarioModificacion);
        producto.setProducto_fecha_baja(LocalDateTime.now());
        producto.setProducto_fecha_modificacion(LocalDateTime.now());
        productoRepository.save(producto);
        return producto;
    }

    public ProductoDTO productoPorId(Long id) {
        return productoRepository.findProductoById(id);
    }

    public List<ProductoDTO> productoPorCategoriaDto(Categoria categoria) {
        return productoRepository.findProductosPorCategoriaDto(categoria);
    }

    public List<ProductoDTO> findAllProductosDto() {
        return productoRepository.findAllProductosDto();
    }


    @Transactional
    public Producto updateProducto(Producto productoNew, String user) {
        Producto producto = productoRepository.findById(productoNew.getProducto_id()).orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
        producto.setProducto_nombre(productoNew.getProducto_nombre());
        producto.setProducto_descripcion(productoNew.getProducto_descripcion());
        producto.setProducto_precio(productoNew.getProducto_precio());
        producto.setCategoria(new Categoria(productoNew.getCategoria().getCategoriaNombre()));
        producto.setProducto_observaciones(productoNew.getProducto_observaciones());
        producto.setProducto_fecha_modificacion(LocalDateTime.now());
        producto.setProducto_usuario_modificacion(user);
        return productoRepository.save(producto);
    }



}
