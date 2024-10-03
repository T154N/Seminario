package com.pedido_flex.wsPedidoFlex.Controller;

import com.pedido_flex.wsPedidoFlex.DTO.ProductoDTO;
import com.pedido_flex.wsPedidoFlex.Exception.Response;
import com.pedido_flex.wsPedidoFlex.Model.Categoria;
import com.pedido_flex.wsPedidoFlex.Model.Producto;
import com.pedido_flex.wsPedidoFlex.Service.ProductoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ProductoController {
    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping("/productos/{id}")
    public Response getProductoById(@PathVariable Long id) {
        try {
            return Response.general(HttpStatus.OK, productoService.findProductoById(id));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/productos")
    public Response findAllProductos() {
        try {
            return Response.general(HttpStatus.OK, productoService.findAllProductos());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

   /* @GetMapping("/productos/categoria/{id}")
    public List<Producto> ProductoPorCategoria(@PathVariable Long id){
        Categoria categoria = new Categoria();
        categoria.setCategoriaId(id);
        return productoService.productoPorCategoria(categoria);
    }*/
    @GetMapping("/productos/categoria/{categoriaId}")
    public List<ProductoDTO> obtenerProductosPorCategoria(@PathVariable Long categoriaId) {
        Categoria categoria = new Categoria();
        categoria.setCategoriaId(categoriaId); 

        return productoService.productoPorCategoriaDto(categoria);
    }

}
