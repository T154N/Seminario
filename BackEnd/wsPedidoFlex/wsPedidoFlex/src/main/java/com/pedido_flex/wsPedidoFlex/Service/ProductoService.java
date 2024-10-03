package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.Model.Categoria;
import com.pedido_flex.wsPedidoFlex.Model.Producto;
import com.pedido_flex.wsPedidoFlex.Repository.ProductoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import com.pedido_flex.wsPedidoFlex.DTO.ProductoDTO;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public Producto createProducto(Producto producto) { return productoRepository.save(producto); }
    public Producto updateProducto(Producto producto) { return productoRepository.save(producto); }
    public Producto findProductoById(Long id) { return productoRepository.getReferenceById(id).get(); }
    public List<Producto> findAllProductos() { return productoRepository.findAll(); }

    public Producto setBajaProductoById(Long id) {
        Producto producto = findProductoById(id);
        producto.setProducto_estado_id(2);
        productoRepository.save(producto);
        return producto;
    }

    public List<Producto> productoPorCategoria(Categoria categoria){
        return productoRepository.findByCategoria(categoria);
    }

    public List<ProductoDTO> productoPorCategoriaDto(Categoria categoria) {
        return productoRepository.findProductosPorCategoriaDto(categoria);
    }

}
