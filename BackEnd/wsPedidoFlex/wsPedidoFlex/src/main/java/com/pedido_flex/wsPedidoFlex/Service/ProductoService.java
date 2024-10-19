package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.DTO.FiltroProductoDTO;
import com.pedido_flex.wsPedidoFlex.Model.Categoria;
import com.pedido_flex.wsPedidoFlex.Model.Producto;
import com.pedido_flex.wsPedidoFlex.Repository.CategoriaRepository;
import com.pedido_flex.wsPedidoFlex.Repository.ProductoRepository;
import com.pedido_flex.wsPedidoFlex.Utils.Specifications.SearchProductosSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import com.pedido_flex.wsPedidoFlex.DTO.ProductoDTO;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductoService {
    @Autowired
    private final ProductoRepository productoRepository;

    private final CategoriaRepository categoriaRepository;

    public ProductoService(ProductoRepository productoRepository ,CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public Producto createProducto(Producto producto) { return productoRepository.save(producto); }
    public Producto findProductoById(Long id) {
        System.out.println("Entrando al método findProductoById con id: " + id);
        return productoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
    }
    public ProductoDTO convertToDTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setProducto_id(producto.getProducto_id());
        dto.setProducto_nombre(producto.getProducto_nombre());
        dto.setProducto_descripcion(producto.getProducto_descripcion());
        dto.setProducto_precio(producto.getProducto_precio());
        dto.setProducto_observaciones(producto.getProducto_observaciones());
        dto.setCategoriaId(producto.getCategoria().getCategoriaId());
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
    public Producto updateProducto(long id , ProductoDTO productoDTO, String user) {
        Producto producto = findProductoById(id);
        System.out.println("Original Producto: " + producto);
        producto.setProducto_nombre(productoDTO.getProducto_nombre());
        producto.setProducto_descripcion(productoDTO.getProducto_descripcion());
        producto.setProducto_precio(productoDTO.getProducto_precio());
        producto.setProducto_observaciones(productoDTO.getProducto_observaciones());
        producto.setProducto_url_imagen(productoDTO.getProducto_urlImagen());
        if (productoDTO.getCategoriaId() != null) {
            Categoria categoria = findByidCategoriaDto(productoDTO.getCategoriaId());
            producto.setCategoria(categoria);
        }
        producto.setProducto_fecha_modificacion(LocalDateTime.now());
        producto.setProducto_usuario_modificacion(user);

    System.out.println("Updated Producto: " + producto);
    return productoRepository.save(producto);
}

public List<Producto> findAllProductos() {
        return productoRepository.findAll();
}

    public List<Producto> getProductoByFilter(FiltroProductoDTO filtroProductoDTO){
        SearchProductosSpecification searchProductosSpecification = new SearchProductosSpecification(filtroProductoDTO.getCategoriaId(), filtroProductoDTO.getDescripcion(), filtroProductoDTO.getEstadoId(), filtroProductoDTO.getId(), filtroProductoDTO.getNombre(), null);
        return productoRepository.findAll(searchProductosSpecification);
    }

}
