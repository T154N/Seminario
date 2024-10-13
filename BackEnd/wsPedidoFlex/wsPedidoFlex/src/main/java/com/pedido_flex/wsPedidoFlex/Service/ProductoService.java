package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.Model.Categoria;
import com.pedido_flex.wsPedidoFlex.Model.Producto;
import com.pedido_flex.wsPedidoFlex.Repository.CategoriaRepository;
import com.pedido_flex.wsPedidoFlex.Repository.ProductoRepository;
import com.pedido_flex.wsPedidoFlex.Service.CategoriaService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import com.pedido_flex.wsPedidoFlex.DTO.ProductoDTO;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoService(ProductoRepository productoRepository ,CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
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

    public Categoria findByidCategoriaDto(Long id) {
        return categoriaRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Categoria no encontrada"));
    }


    @Transactional
    public Producto updateProducto(Producto productoNew, String user) {
    Producto producto = productoRepository.findById(productoNew.getProducto_id()).orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
    System.out.println("Original Producto: " + producto);
    producto.setProducto_nombre(productoNew.getProducto_nombre());
    producto.setProducto_descripcion(productoNew.getProducto_descripcion());
    producto.setProducto_precio(productoNew.getProducto_precio());
    producto.setCategoria(findByidCategoriaDto(productoNew.getCategoria().getCategoriaId()));
    producto.setProducto_fecha_modificacion(LocalDateTime.now());
    producto.setProducto_usuario_modificacion(user);
    System.out.println("Updated Producto: " + producto);
    return productoRepository.save(producto);
}


}
