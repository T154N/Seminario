package com.pedido_flex.wsPedidoFlex.Controller;

import com.pedido_flex.wsPedidoFlex.DTO.FiltroProductoDTO;
import com.pedido_flex.wsPedidoFlex.DTO.ProductoDTO;
import com.pedido_flex.wsPedidoFlex.Exception.Response;
import com.pedido_flex.wsPedidoFlex.Model.Categoria;
import com.pedido_flex.wsPedidoFlex.Model.Producto;
import com.pedido_flex.wsPedidoFlex.Service.ProductoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

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
    public Response obtenerProductosPorCategoria(@PathVariable Long categoriaId) {
        try {
            Categoria categoria = new Categoria();
            categoria.setCategoriaId(categoriaId);
            return Response.general(HttpStatus.OK, productoService.productoPorCategoriaDto(categoria));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No encontramos los productos para la categoría especificada.");
        }
    }

    @PostMapping("/productos")
    public Response createProducto(@RequestBody Producto producto) {
        try {

            if (producto.getCategoria() != null) {
                Categoria categoria = productoService.findByidCategoriaDto(producto.getCategoria().getCategoriaId());
                producto.setCategoria(categoria);
            }

            if (producto.getProducto_estado_id() == null) {
                producto.setProducto_estado_id(1);
            }
            if (producto.getProducto_fecha_alta() == null) {
                producto.setProducto_fecha_alta(LocalDateTime.now());
            }
            return Response.general(HttpStatus.OK, productoService.createProducto(producto));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/productos/{id}/{u}")
    public Response updateProducto(@PathVariable("id") Long id, @PathVariable("u") String usuarioEditor, @RequestBody ProductoDTO productoDTO) {
        try {
            productoDTO.setProducto_id(id); // Establecer el ID del producto a actualizar
            return Response.general(HttpStatus.OK, productoService.updateProducto(id, productoDTO, usuarioEditor));
        } catch (NullPointerException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, "Error: Un valor nulo fue encontrado - " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Error inesperado: " + e.getMessage());
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

    @GetMapping("/productos/filter")
    public Response findProductosFilters(@RequestBody FiltroProductoDTO filtroProductoDTO){
        try{
            if(!Objects.isNull(filtroProductoDTO)){
                return Response.general(HttpStatus.OK, productoService.getProductoByFilter(filtroProductoDTO));
        }else{
            return Response.custom(HttpStatus.BAD_REQUEST, "No encontramos información a su búsqueda");
            }
        }catch (NullPointerException | IllegalArgumentException e){
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
    }   catch (Exception e){
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
