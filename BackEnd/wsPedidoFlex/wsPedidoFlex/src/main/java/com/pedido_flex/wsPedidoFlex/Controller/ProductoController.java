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
            return Response.general(HttpStatus.OK, productoService.productoPorId(id));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/productos")
    public Response findAllProductosDto() {
        try {
            return Response.general(HttpStatus.OK, productoService.findAllProductosDto());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No encontramos los productos");
        }
    }

    @GetMapping("/productos/categoria/{categoriaId}")
    public List<ProductoDTO> obtenerProductosPorCategoria(@PathVariable Long categoriaId) {
        Categoria categoria = new Categoria();
        categoria.setCategoriaId(categoriaId);

        return productoService.productoPorCategoriaDto(categoria);
    }

    @PostMapping("/productos")
    public Response createProducto(@RequestBody Producto producto) {
        try {
            return Response.general(HttpStatus.OK, productoService.createProducto(producto));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/productos/{id}/{u}")
    public Response updateProducto(@PathVariable("id") Long id, @PathVariable("u") String usuarioEditor, @RequestBody Producto producto) {
        try {
            return Response.general(HttpStatus.OK, productoService.updateProducto(producto, usuarioEditor));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/productos/baja/{id}/{u}")
    public Response setBajaProductoById(@PathVariable("id") Long id, @PathVariable("u") String usuarioEditor) {
        try {
            return Response.general(HttpStatus.OK, productoService.setBajaProductoById(id, usuarioEditor));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }




}
