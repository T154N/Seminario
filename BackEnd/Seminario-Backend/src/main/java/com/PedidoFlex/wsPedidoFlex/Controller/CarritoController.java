package com.PedidoFlex.wsPedidoFlex.Controller;
import com.PedidoFlex.wsPedidoFlex.DTO.ProductoDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.Carrito;
import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import com.PedidoFlex.wsPedidoFlex.Models.Producto;
import com.PedidoFlex.wsPedidoFlex.Models.Response.Response;
import com.PedidoFlex.wsPedidoFlex.Service.Carrito.CarritoDetalleService;
import com.PedidoFlex.wsPedidoFlex.Service.Carrito.CarritoService;
import com.PedidoFlex.wsPedidoFlex.Service.ClienteService;
import com.PedidoFlex.wsPedidoFlex.Service.ProductoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1/carrito")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;
    @Autowired
    private CarritoDetalleService carritoDetalleService;
    @Autowired
    private ClienteService clienteService;
    @Autowired
    private ProductoService productoService;

    //Get Carritos
    @GetMapping()
    public Response findAll() {
        try {
            return Response.general(HttpStatus.OK, carritoService.finAll());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error buscar los carritos.");
        }
    }

    @GetMapping("/detalle/{carritoId}")
    public Response findAllDetalleByCarrito(@PathVariable Long carritoId) {

        try {
            log.info("Carrito Detalle: "+carritoId);
            return Response.general(HttpStatus.OK,  carritoDetalleService.obtenerCarritoDetalle(carritoId));
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("findAllDetalleByCarrito : "+e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("findAllDetalleByCarrito : "+e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al obtener los itmes del carrito.");
        }
    }

    @GetMapping("/{id}")
    public Response findByIdResponse(@PathVariable Long id) {
        try {
            return Response.general(HttpStatus.OK, carritoService.findById(id));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error buscar el carrito.");
        }
    }

    @GetMapping("/cliente/{id}")
    public Response findByIdCliente(@PathVariable Long id) {
        try {
            Cliente cliente;
            Optional<Cliente> clienteOptional = clienteService.findClienteById(id);
            if (clienteOptional.isPresent()) {
                 cliente = clienteOptional.get();  // Aquí ya tienes el cliente
                // Haz algo con el cliente
            } else {
                return Response.custom(HttpStatus.NOT_FOUND, "Cliente no encontrado");
            }
            log.info("Cliente: "+cliente);
            Carrito carrito = carritoService.findCarritoByCliente(cliente);
            if (carrito == null) {
                return Response.custom(HttpStatus.NOT_FOUND, "El cliente no tiene carritos activos y nuevos guardados");
            }
            return Response.general(HttpStatus.OK,carrito );
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error buscar el carrito.");
        }
    }

    @PostMapping("/new")
    public Response crearCarrito(@RequestParam Long clienteId, @RequestParam String usuarioTransaccion) {
        try {
            Cliente cliente = clienteService.findClienteById(clienteId).get();
            Carrito carrito =  carritoService.crearCarrito(cliente, usuarioTransaccion);
            return Response.general(HttpStatus.OK, carrito);
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al crear el carrito.");
        }
    }

    @PostMapping("/add")
    public Response agregarProducto(@RequestParam Long carritoId,
                                    @RequestBody ProductoDTO productoDTO,
                                    @RequestParam Integer cantidad,
                                    @RequestParam String usuarioTransaccion) {
        try {
            Producto producto = productoService.findProductoById(productoDTO.getId());
            if (producto == null) {
                return Response.custom(HttpStatus.BAD_REQUEST, "El producto no existe");
            }
            if (!Objects.equals(productoDTO.getPrecio(), producto.getProducto_precio()) &&
                    productoDTO.getPrecio() > 0 && productoDTO.getPrecio() != null){
                return Response.custom(HttpStatus.BAD_REQUEST, "El precio del producto no es valido");
            }
            Carrito carrito =  carritoService.agregarProductoAlCarrito(carritoId, producto, cantidad,usuarioTransaccion);
            return Response.general(HttpStatus.OK, "Se añadio producto con exito al carrito");
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error al crear carrito bad_request: "+e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error al crear el carrito: " + e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al crear el carrito.");
        }
    }

    @PutMapping("/remove/item")
    public Response quitarProductoDelCarrito(@RequestParam Long carritoId,
                                             @RequestParam Long productoId,
                                             @RequestParam String usuarioTransaccion){
        try {
            Producto producto = productoService.findProductoById(productoId);
            if (producto == null) {
                return Response.custom(HttpStatus.BAD_REQUEST, "El producto no existe");
            }
            carritoService.quitarProductoDelCarrito(carritoId, productoId, usuarioTransaccion);
            return Response.general(HttpStatus.OK, "Se quito el producto con exito del carrito");
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error al quitar el producto del carrito bad_request: "+e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error al quitar el producto del carrito: " + e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al quitar el producto del carrito.");
        }
    }
    @PutMapping("/remove")
    public Response setBajaCarrito(@RequestParam Long carritoId,
                                             @RequestParam String usuarioTransaccion){
        try {
            carritoService.setBajaCarrito(carritoId,usuarioTransaccion);
            return Response.general(HttpStatus.OK, "Se quito con exito del carrito");
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error al quitar el producto del carrito bad_request: "+e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error al quitar el producto del carrito: " + e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al quitar el carrito.");
        }
    }

}
