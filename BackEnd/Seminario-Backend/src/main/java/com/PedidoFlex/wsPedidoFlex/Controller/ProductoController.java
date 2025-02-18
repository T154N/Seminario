package com.PedidoFlex.wsPedidoFlex.Controller;

import com.PedidoFlex.wsPedidoFlex.DTO.ActualizacionMasivaRequest;
import com.PedidoFlex.wsPedidoFlex.DTO.FiltroProductoDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Response.Response;
import com.PedidoFlex.wsPedidoFlex.Models.Categoria;
import com.PedidoFlex.wsPedidoFlex.Models.Producto;
import com.PedidoFlex.wsPedidoFlex.Service.GenericService;
import com.PedidoFlex.wsPedidoFlex.Service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1")

public class ProductoController {
    private final ProductoService productoService;

    @Autowired
    private GenericService genericService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping("/productos/{id}")
    public Response getProductoById(@PathVariable Long id) {
        try {
            return Response.general(HttpStatus.OK, productoService.productoPorIdDTO(id));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @GetMapping("/productos/admin/{id}")
    public Response getProductoByIdAdmin(@PathVariable Long id) {
        try {
            return Response.general(HttpStatus.OK, productoService.productoPorIdDTOAdmin(id));
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

    @GetMapping("/productos/admin")
    public Response findAllProductosDtoAdmin() {
        try {
            return Response.general(HttpStatus.OK, productoService.findAllProductosDtoAdmin());
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

    @GetMapping("/productos/baja/categoria/{categoriaId}")
    public Response obtenerProductosPorCategoriaBaja(@PathVariable Long categoriaId) {
        try {
            Categoria categoria = new Categoria();
            categoria.setCategoriaId(categoriaId);
            return Response.general(HttpStatus.OK, productoService.productoPorCategoriaDtoBaja(categoria));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No encontramos los productos para la categoría especificada.");
        }
    }



    @PostMapping("/productos/alta")
    public Response createProducto(@RequestBody Producto producto) {
        try {
            // Validación mínima de campos obligatorios en el Producto
            if (producto.getProducto_nombre() == null || producto.getCategoria() == null) {
                return Response.custom(HttpStatus.BAD_REQUEST, "El nombre del producto y la categoría son obligatorios.");
            }

            // Llamar al servicio para crear el producto
            Producto productoCreado = productoService.createProducto(producto);
            return Response.general(HttpStatus.CREATED, productoCreado);
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Error al crear el producto: " + e.getMessage());
        }
    }


    @PutMapping("/productos/mod")
    public Response updateProducto(@RequestBody Producto producto) {
        try {
            return Response.general(HttpStatus.OK, productoService.updateProducto(producto));
        } catch (NullPointerException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, "Error: Un valor nulo fue encontrado - " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Error inesperado: " + e.getMessage());
        }
    }


    @PutMapping("/productos/alta")
    public Response setAltaProductoById(@RequestBody Producto productoAlta) {
        try {
            return Response.general(HttpStatus.OK, productoService.setAltaProductoById(productoAlta.getProducto_id(), productoAlta.getProducto_usuario_alta()));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/productos/baja")
    public Response setBajaProductoById(@RequestBody Producto productoBaja) {
        try {
            return Response.general(HttpStatus.OK, productoService.setBajaProductoById(productoBaja.getProducto_id(), productoBaja.getProducto_usuario_baja()));
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


    @PutMapping("/actualizacionmas")
    public Response actualizarProductos(@RequestBody ActualizacionMasivaRequest request) {
        // Acceder a los datos de la solicitud a través del objeto request
        Long categoryId = request.getCategoryId();
        String productIds = request.getProductIds();
        Double percentage = request.getPercentage();
        String usuarioMod = request.getUsuarioMod();
        String fechaMod = request.getFechaMod();
        System.out.println("Category ID: " + request.getCategoryId());
        System.out.println("Product IDs: " + request.getProductIds());
        System.out.println("Percentage: " + request.getPercentage());
        System.out.println("Usuario Mod: " + request.getUsuarioMod());
        System.out.println("Fecha Mod: " + request.getFechaMod());



        try {
            genericService.actualizarProductos(categoryId, productIds, percentage, usuarioMod, fechaMod);

            return Response.general(HttpStatus.OK, "Productos actualizados correctamente");

        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
