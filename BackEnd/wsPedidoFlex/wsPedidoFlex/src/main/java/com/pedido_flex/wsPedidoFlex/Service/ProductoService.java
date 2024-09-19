package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.Model.Producto;
import com.pedido_flex.wsPedidoFlex.Repository.ProductoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

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

}
