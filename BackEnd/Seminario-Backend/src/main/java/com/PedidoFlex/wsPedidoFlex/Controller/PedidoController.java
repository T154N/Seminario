package com.PedidoFlex.wsPedidoFlex.Controller;
import com.PedidoFlex.wsPedidoFlex.DTO.Filters.FiltroClienteDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.Filters.FiltroPedidoDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.PedidoCliDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.PedidoDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.PedidosClientesDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.ProductoDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.Carrito;
import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import com.PedidoFlex.wsPedidoFlex.Models.Pedido;
import com.PedidoFlex.wsPedidoFlex.Models.Producto;
import com.PedidoFlex.wsPedidoFlex.Models.Response.PedidoResponse;
import com.PedidoFlex.wsPedidoFlex.Models.Response.Response;
import com.PedidoFlex.wsPedidoFlex.Service.*;
import com.PedidoFlex.wsPedidoFlex.Service.Carrito.CarritoDetalleService;
import com.PedidoFlex.wsPedidoFlex.Service.Carrito.CarritoService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1/pedidos")
public class PedidoController {
    @Autowired
    private CarritoService carritoService;
    @Autowired
    private CarritoDetalleService carritoDetalleService;
    @Autowired
    private ClienteService clienteService;
    @Autowired
    private ProductoService productoService;
    @Autowired
    private PedidoServices pedidoServices;
    @Autowired
    private PedidoDetalleService pedidoDetalleService;
    @Autowired
    private ClienteServiceFilterAll clienteServiceFilterAll;

    //Get Pedidos
    @GetMapping("/all")
    public Response findAll() {
        try {
            return Response.general(HttpStatus.OK, pedidoServices.findAllPedidos());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al buscar los pedidos.");
        }
    }

    @PostMapping("/generate")
    public Response generate(
            @RequestParam Long carritoID, @RequestParam Long domicilioId, @RequestParam Long medioPagoId, @RequestParam String usuarioTransaccion) {
        try {
            PedidoResponse pedidoResponse = pedidoServices.generatePedido(carritoID, domicilioId, usuarioTransaccion, medioPagoId);
            if (pedidoResponse.getNroPedido() > 0) {
                return Response.general(HttpStatus.OK, pedidoResponse);
            }
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al generar el pedido.");
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al generar el pedido.");
        }
    }

    @PutMapping("/updatestatus")
    public Response updateStatus(
            @RequestParam Long pedidoId,
            @RequestParam Long estadoId,
            @RequestParam String usuarioTransaccion,
            @RequestParam boolean estado
            ) {
        try {
            pedidoServices.updateStatusPedido( pedidoId, estadoId, usuarioTransaccion,estado);
            return Response.general(HttpStatus.OK, "Pedido Actualizado");
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al actualizar el pedido.");
        }
    }

    @GetMapping("/filter")
    public Response findPedidossFilters(@RequestBody FiltroPedidoDTO filtroPedidoDTO) {
        try {
            if(!Objects.isNull(filtroPedidoDTO)) {
                return Response.general(HttpStatus.OK,pedidoServices.getPedidoByFilter(filtroPedidoDTO));
            }else {
                return Response.custom(HttpStatus.BAD_REQUEST, "No encontramos información a su búsqueda");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error NullPointerException | IllegalArgumentException "+e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error Exception "+e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/detalle")
    public Response findPDetallePedidos(@RequestParam Long pedidoID) {
        try {
            if(pedidoID >0) {
                Pedido pedido = pedidoServices.findPedidoById(pedidoID);
                if (pedido == null){
                    return Response.custom(HttpStatus.BAD_REQUEST, "No encontramos el pedido buscado");
                }
                return Response.general(HttpStatus.OK,pedidoDetalleService.obtenerDetallesPedidos(pedidoID));
            }else {
                return Response.custom(HttpStatus.BAD_REQUEST, "Pedido id no válido");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error NullPointerException | IllegalArgumentException "+e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error Exception "+e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @PostMapping("/generatepedido")
    public Response generatePedido(
            @RequestParam Long clienteId, @RequestParam Long domicilioId, @RequestParam Long medioPagoId, @RequestParam String usuarioTransaccion) {
        try {
            PedidoResponse pedidoResponse = pedidoServices.generatePedidoAdmin(clienteId, domicilioId, usuarioTransaccion, medioPagoId);
            if (pedidoResponse != null) {
                return Response.general(HttpStatus.OK, pedidoResponse);
            }
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al generar el pedido.");
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al generar el pedido.");
        }
    }

    @PostMapping("/add")
    public Response agregarProducto(@RequestParam Long pedidoId,
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
            Pedido pedido =  pedidoServices.agregarProductoAlPedido(pedidoId, producto, cantidad,usuarioTransaccion);
            return Response.general(HttpStatus.OK, "Se añadio producto con exito al pedido");
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error al crear pedido bad_request: "+e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error al crear el pedido: " + e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al crear el carrito.");
        }
    }

    @PutMapping("/remove/item")
    public Response quitarProductoDelPedido(@RequestParam Long pedidoId,
                                             @RequestParam Long productoId,
                                             @RequestParam String usuarioTransaccion){
        try {
            Producto producto = productoService.findProductoById(productoId);
            if (producto == null) {
                return Response.custom(HttpStatus.BAD_REQUEST, "El producto no existe");
            }
            pedidoServices.quitarProductoDelPedido(pedidoId, productoId, usuarioTransaccion);
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
  public Response setBajaPedido(@RequestParam Long pedidoId,
                                   @RequestParam String usuarioTransaccion){
        try {
            pedidoServices.updateStatusPedido(pedidoId,0L,usuarioTransaccion,true);
            return Response.general(HttpStatus.OK, "Se quito con exito del pedido");
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error al dar de baja el pedido bad_request: "+e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error al dar de baja el pedido: " + e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al quitar el pedido.");
        }
    }

    @GetMapping("/cliente")
    public Response findPedidosCliente(@RequestParam Long clienteId) {
        try {
            if(clienteId >0) {
                List<PedidosClientesDTO> pedidos = clienteServiceFilterAll.obtenerClienteOrId(clienteId);
                if (pedidos == null){
                    return Response.custom(HttpStatus.BAD_REQUEST, "No encontramos pedidos del cliente");
                }
                return Response.general(HttpStatus.OK,pedidos);
            }else {
                return Response.custom(HttpStatus.BAD_REQUEST, "Cliente Id no válido");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error NullPointerException | IllegalArgumentException "+e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error Exception "+e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/getpedidoscliente")
    public Response getPedidosCliente(@RequestParam Long clienteId) {
        try {
            if(clienteId >0) {
                List<PedidoCliDTO> pedidos = pedidoServices.getPedidosCliente(clienteId);
                if (pedidos == null){
                    return Response.custom(HttpStatus.BAD_REQUEST, "No encontramos pedidos del cliente");
                }
                log.info(pedidos.toString());
                return Response.general(HttpStatus.OK,pedidos);
            }else {
                return Response.custom(HttpStatus.BAD_REQUEST, "Cliente Id no válido");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error NullPointerException | IllegalArgumentException "+e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error Exception "+e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


}
