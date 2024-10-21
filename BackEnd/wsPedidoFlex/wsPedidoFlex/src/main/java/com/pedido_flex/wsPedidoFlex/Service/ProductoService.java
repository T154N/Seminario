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

    public Producto findProductoById(Long id) {
        System.out.println("Entrando al método findProductoById con id: " + id);
        return productoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
    }
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



    public ProductoDTO productoPorIdDTO(Long id) {
        return productoRepository.findProductoDTOById(id);
    }

    public List<ProductoDTO> productoPorCategoriaDto(Categoria categoria) {
        return productoRepository.findProductosPorCategoriaDto(categoria);
    }

    public List<ProductoDTO> productoPorCategoriaDtoBaja(Categoria categoria) {
        return productoRepository.findProductosPorCategoriaDtoBaja(categoria);
    }



    public List<ProductoDTO> findAllProductosDto() {
        return productoRepository.findAllProductosDto();
    }

    public List<ProductoDTO> findAllProductosDtoBaja() {
        return productoRepository.findAllProductosDtoBaja();
    }


    public Categoria findByidCategoriaDto(Long id) {
        return categoriaRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Categoria no encontrada"));
    }



    public Producto createProducto(Producto producto) {
        if (producto.getCategoria() != null) {
            Categoria categoria = findByidCategoriaDto(producto.getCategoria().getCategoriaId());
            producto.setCategoria(categoria);
        } else {
            throw new IllegalArgumentException("Categoría no válida");
        }
        if (producto.getProducto_usuario_alta() == null) {
            producto.setProducto_usuario_alta(producto.getProducto_usuario_alta());
        }
        // Definir estado y fecha de alta si no están presentes
        if (producto.getProducto_estado_id() == null) {
            producto.setProducto_estado_id(1);  // Estado por defecto
        }
        if (producto.getProducto_fecha_alta() == null) {
            producto.setProducto_fecha_alta(LocalDateTime.now());
        }

        // Guardar el producto en la base de datos
        return productoRepository.save(producto);
    }

    @Transactional
    public Producto updateProducto(Producto productoNew) {
        Producto producto = findProductoById(productoNew.getProducto_id());
        producto.setProducto_nombre(productoNew.getProducto_nombre());
        producto.setProducto_descripcion(productoNew.getProducto_descripcion());
        producto.setProducto_precio(productoNew.getProducto_precio());
        producto.setProducto_observaciones(productoNew.getProducto_observaciones());
        producto.setProducto_url_imagen(productoNew.getProducto_url_imagen());
        producto.setCategoria(findByidCategoriaDto(productoNew.getCategoria().getCategoriaId()));
        producto.setProducto_fecha_modificacion(LocalDateTime.now());
        producto.setProducto_usuario_modificacion(productoNew.getProducto_usuario_modificacion());
        return productoRepository.save(producto);
    }

    public Producto setAltaProductoById(Long productoId, String usuarioAlta) {
        Producto producto = findProductoById(productoId);
        producto.setProducto_estado_id(1);
        producto.setProducto_usuario_modificacion(usuarioAlta);
        producto.setProducto_usuario_alta(usuarioAlta);
        producto.setProducto_fecha_alta(LocalDateTime.now());
        producto.setProducto_fecha_modificacion(LocalDateTime.now());
        productoRepository.save(producto);
        return producto;
    }


    public Producto setBajaProductoById(Long productoId, String usuarioBaja) {
        Producto producto = findProductoById(productoId);
        producto.setProducto_usuario_modificacion(usuarioBaja);
        producto.setProducto_usuario_baja(usuarioBaja);
        producto.setProducto_fecha_baja(LocalDateTime.now());
        producto.setProducto_fecha_modificacion(LocalDateTime.now());
        producto.setProducto_estado_id(2);
        productoRepository.save(producto);
        return producto;
    }



    public List<Producto> findAllProductos() {
        return productoRepository.findAll();
}

    public List<Producto> getProductoByFilter(FiltroProductoDTO filtroProductoDTO){
        SearchProductosSpecification searchProductosSpecification = new SearchProductosSpecification(filtroProductoDTO.getCategoriaId(), filtroProductoDTO.getDescripcion(), filtroProductoDTO.getEstadoId(), filtroProductoDTO.getId(), filtroProductoDTO.getNombre(), null);
        return productoRepository.findAll(searchProductosSpecification);
    }

}
