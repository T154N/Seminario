package com.PedidoFlex.wsPedidoFlex.Service;

import com.PedidoFlex.wsPedidoFlex.DTO.Filters.FiltroClienteDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.Filters.FiltroPedidoDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.PedidoCliDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.PedidoDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.PedidosClientesDTO;
import com.PedidoFlex.wsPedidoFlex.Models.*;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.Carrito;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.CarritoDetalle;
import com.PedidoFlex.wsPedidoFlex.Models.Response.PedidoResponse;
import com.PedidoFlex.wsPedidoFlex.Repository.Medio_PagoRepository;
import com.PedidoFlex.wsPedidoFlex.Repository.PedidoDetalleRepository;
import com.PedidoFlex.wsPedidoFlex.Repository.PedidoRepository;
import com.PedidoFlex.wsPedidoFlex.Service.Carrito.CarritoDetalleService;
import com.PedidoFlex.wsPedidoFlex.Service.Carrito.CarritoService;
import com.PedidoFlex.wsPedidoFlex.Utils.Specifications.SearchClientesSpecification;
import com.PedidoFlex.wsPedidoFlex.Utils.Specifications.SearchPedidoSpecification;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class PedidoServices {

    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private CarritoService carritoService;
    @Autowired
    private CarritoDetalleService carritoDetalleService;
    @Autowired
    private PedidoDetalleService pedidoDetalleService;
    @Autowired
    private DomicilioService domicilioService;
    @Autowired
    private Medio_PagoRepository medio_PagoRepository;
    @Autowired
    private ClienteService clienteService;
    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;
    @Autowired
    private ProductoService productoService;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public PedidoServices(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public Long getUltimoNumero(){
        return pedidoRepository.findMaxPedidoNumeroPedido();
    }

    public Pedido findPedidoByClienteId(Long clienteId) {
        return pedidoRepository.findPedidoByClienteId(clienteId);
    }

    public Pedido createPedido(Pedido newPedido){
        return pedidoRepository.save(newPedido);
    }
    public List<PedidoDTO> findAllPedidos(){
        return pedidoRepository.findAllPedidos();
    }

    public Pedido findPedidoById(Long id){
        return pedidoRepository.findById(id).get();
    }

    public void savePedido(Pedido pedido){
        pedidoRepository.save(pedido);
    }
    @Transactional
    public PedidoResponse generatePedido(Long carritoID,Long domicilioId, String usuarioTransaccion,Long medioPagoId){
        Long nroPedido = 0L;
        try {
            Carrito carrito = carritoService.findById(carritoID);
            LocalDateTime now = LocalDateTime.now();
            Domicilio domicilio = domicilioService.findDomicilioById(domicilioId);
            MedioPago medioPago = medio_PagoRepository.findById(medioPagoId).get();

            if (carrito == null) {
                return new PedidoResponse(0L, nroPedido);
            }
            List<CarritoDetalle> carritoDetalles = carritoDetalleService.findAllByCarrito(carrito);
            if (carritoDetalles.isEmpty()){
                return new PedidoResponse(0L, nroPedido);
            }
            Pedido pedido = new Pedido();
            pedido.setCliente(carrito.getCliente());
            pedido.setCarrito(carrito);
            pedido.setPedido_estado_id(12L);//Pedido Nuevo
            pedido.setEstado_registro_id(1L);//ACT
            pedido.setPedido_fecha_alta(now);
            pedido.setPedido_usuario_alta(usuarioTransaccion);
            pedido.setPedido_total_dinero(carrito.getTotal());
            pedido.setPedido_total_productos(carrito.getCantidadProductos());
            pedido.setDomicilio(domicilio);
            pedido.setPedido_direccion_entrega(domicilio.getDomicilioDireccion());
            LocalDateTime fechaEntrega = calcularFechaEntrega(now);
            pedido.setPedido_fecha_estimada_entrega(fechaEntrega);
            pedido.setMedio_pago(medioPago);
            nroPedido = proximoNroPedido();
            pedido.setPedido_numero_pedido(nroPedido);
            pedidoRepository.save(pedido);

            List<PedidoDetalle> dpedidosDetalles = new ArrayList<>();
            for (CarritoDetalle detalle : carritoDetalles) {
                if (detalle.getEstadoId() == 1) {
                    PedidoDetalle pedidoDetalle = new PedidoDetalle();
                    pedidoDetalle.setDetalle_producto(detalle.getProducto());
                    pedidoDetalle.setPedido_detalle_cantidad(detalle.getCantidad());
                    pedidoDetalle.setPedido_detalle_precio_individual(detalle.getPrecio_individual());
                    pedidoDetalle.setPedido_detalle_subtotal(detalle.getSubtotal());
                    pedidoDetalle.setPedido_detalle_fecha_alta(now);
                    pedidoDetalle.setPedido_detalle_estado_id(1L);
                    pedidoDetalle.setPedido_detalle_usuario_alta(usuarioTransaccion);
                    pedidoDetalle.setPedido(pedido); // Agregar al pedido
                    dpedidosDetalles.add(pedidoDetalle);
                    pedido.getPedido_detalles().add(pedidoDetalle); // Agregar directamente al pedido
                }
            }
            pedidoRepository.save(pedido);
            carrito.setEstadoCarritoPedido(14L);
            carritoService.updateCarrito(carrito);
            return new PedidoResponse(pedido.getPedido_id(), nroPedido);
        }catch (Exception e){
            log.info("Ocurrio un error al generar el pedido: "+e.getMessage());
            return new PedidoResponse(0L, 0L);
        }
    }

    @Transactional
    public PedidoResponse generatePedidoAdmin(Long clienteId, Long domicilioId, String usuarioTransaccion, Long medioPagoId){
        Long nroPedido = 0L;

        try {
            LocalDateTime now = LocalDateTime.now();
            Domicilio domicilio = domicilioService.findDomicilioById(domicilioId);
            MedioPago medioPago = medio_PagoRepository.findById(medioPagoId).get();
            Cliente cliente = clienteService.findClienteById(clienteId).get();

            Pedido pedido = new Pedido();
            pedido.setCliente(cliente);
            pedido.setCarrito(null);
            pedido.setPedido_estado_id(13L);//Pedido confirmado
            pedido.setEstado_registro_id(1L);//ACT
            pedido.setPedido_fecha_alta(now);
            pedido.setPedido_usuario_alta(usuarioTransaccion);
            pedido.setPedido_total_dinero(0.0);
            pedido.setPedido_total_productos(0);
            pedido.setDomicilio(domicilio);
            pedido.setPedido_direccion_entrega(domicilio.getDomicilioDireccion());
            LocalDateTime fechaEntrega = calcularFechaEntrega(now);
            pedido.setPedido_fecha_estimada_entrega(fechaEntrega);
            pedido.setMedio_pago(medioPago);
            nroPedido = proximoNroPedido();
            pedido.setPedido_numero_pedido(nroPedido);
            pedido.setCreateAdmin('Y');
            pedidoRepository.save(pedido);
            return new PedidoResponse(pedido.getPedido_id(), nroPedido);
        }catch (Exception e){
            log.info("Ocurrio un error al generar el pedido: "+e.getMessage());
            return null ;
        }
    }

    public void updateStatusPedido(Long pedidoId,Long estadoId,String usuarioTransaccion,boolean estadoBaja) {
        LocalDateTime now = LocalDateTime.now();
        Pedido pedido = pedidoRepository.findById(pedidoId).get();
        if (estadoId > 0L) {
            pedido.setPedido_estado_id(estadoId);
        }
        pedido.setPedido_fecha_modificacion(now);
        pedido.setPedido_usuario_modificacion(usuarioTransaccion);
        if (estadoBaja) {
            pedido.setPedido_fecha_baja(now);
            pedido.setPedido_usuario_baja(usuarioTransaccion);
            pedido.setPedido_estado_id(9L);
            pedido.setEstado_registro_id(2L);
            List<PedidoDetalle> pedidoDetalles = pedidoDetalleService.findAllPedidoDetalleByPedido(pedido);
            for (PedidoDetalle detalle : pedidoDetalles) {
                if (detalle.getPedido_detalle_estado_id() == 1) {
                    detalle.setPedido_detalle_estado_id(2L);
                    detalle.setPedido_detalle_fecha_baja(now);
                    detalle.setPedido_detalle_usuario_baja(usuarioTransaccion);
                    detalle.setPedido_detalle_fecha_modificacion(now);
                    detalle.setPedido_detalle_usuario_modificacion(usuarioTransaccion);
                }
            }
           //si doy de baja. Bajo los detalles tambien y cancelo el estado del pedido
        }
        pedidoRepository.save(pedido);
    }

    /**
     * Filtros
     **/
    public List<Pedido> getPedidoByFilter(FiltroPedidoDTO filtroPedidoDTO) {
        SearchPedidoSpecification searchPedidoSpecification = new SearchPedidoSpecification(filtroPedidoDTO.getId(),
                filtroPedidoDTO.getDireccionEntrega(),filtroPedidoDTO.getTotalProductos(),filtroPedidoDTO.getTotalDinero(),
                filtroPedidoDTO.getEstadoId(),filtroPedidoDTO.getFechaAltaDesde(),filtroPedidoDTO.getFechaAltaHasta(),
                filtroPedidoDTO.getFechaEntregaDesde(),filtroPedidoDTO.getFechaEntregaHasta(),filtroPedidoDTO.getNumeroPedido());
        return pedidoRepository.findAll(searchPedidoSpecification);
    }

    @Transactional
    public Pedido agregarProductoAlPedido(Long pedidoId, Producto producto, Integer cantidad,String usuarioTransaccion) {
        Pedido pedido  = pedidoRepository.findById(pedidoId).orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        double total = 0.0;
        double subTotal = 0.0;
        Integer cantidadProductos = 0;
        Integer cantidadProductosTotales = 0;
        boolean encuentroProductoAgregado = false;
        boolean mismaCantidad = false;
        LocalDateTime fechaEntrega = LocalDateTime.now();
        LocalDateTime fechaAlta = LocalDateTime.now();
        if (pedido.getPedido_detalles() == null) {
            PedidoDetalle pedidoDetalle = new PedidoDetalle();
            pedidoDetalle.setPedido(pedido);
            pedidoDetalle.setPedido_detalle_fecha_alta(fechaAlta);
            pedidoDetalle.setPedido_detalle_usuario_alta(usuarioTransaccion);
            pedidoDetalle.setDetalle_producto(producto);
            pedidoDetalle.setPedido_detalle_cantidad(cantidad);
            pedidoDetalle.setPedido_detalle_precio_individual(producto.getProducto_precio());
            pedidoDetalle.setPedido_detalle_estado_id(1L);
            subTotal = producto.getProducto_precio()*cantidad;
            pedidoDetalle.setPedido_detalle_subtotal(subTotal);
        }
        else {
            List<PedidoDetalle> detalles = pedidoDetalleRepository.findByPedido(pedido);
            log.info(producto.toString());
            for (PedidoDetalle pedidoDetalle : detalles) {
                log.info(pedidoDetalle.getDetalle_producto().toString());
                if (pedidoDetalle.getPedido_detalle_estado_id() == 1) {
                    if (pedidoDetalle.getDetalle_producto() == producto) {
                        log.info("Es igual)");
                        if (pedidoDetalle.getPedido_detalle_cantidad() != cantidad) {
                            PedidoDetalle pedidoDetalleUpdate = pedidoDetalleService.obtenerPedidoDetalle(pedidoDetalle.getPedido_detalle_id());
                            pedidoDetalleUpdate.setPedido(pedido);
                            pedidoDetalleUpdate.setDetalle_producto(producto);
                            pedidoDetalleUpdate.setPedido_detalle_cantidad(cantidad);
                            pedidoDetalleUpdate.setPedido_detalle_usuario_modificacion(usuarioTransaccion);
                            pedidoDetalleUpdate.setPedido_detalle_fecha_modificacion(fechaAlta);
                            pedidoDetalleUpdate.setPedido_detalle_precio_individual(producto.getProducto_precio()); // Suponiendo que el precio es del producto
                            subTotal = producto.getProducto_precio()*cantidad;
                            pedidoDetalleUpdate.setPedido_detalle_subtotal(subTotal); // Calcula el subtotal
                            pedidoDetalleRepository.save(pedidoDetalleUpdate);
                            encuentroProductoAgregado = true;
                        } else {
                            log.info("mismacantidad");
                            mismaCantidad = true;
                        }

                    }
                    cantidadProductos++;
                    cantidadProductosTotales += pedidoDetalle.getPedido_detalle_cantidad();

                }
            }
        }
        if (!encuentroProductoAgregado && !mismaCantidad) {
            PedidoDetalle pedidoDetalle = new PedidoDetalle();

            pedidoDetalle.setPedido(pedido);
            pedidoDetalle.setPedido_detalle_fecha_alta(fechaAlta);
            pedidoDetalle.setPedido_detalle_usuario_alta(usuarioTransaccion);
            pedidoDetalle.setDetalle_producto(producto);
            pedidoDetalle.setPedido_detalle_cantidad(cantidad);
            pedidoDetalle.setPedido_detalle_precio_individual(producto.getProducto_precio());
            pedidoDetalle.setPedido_detalle_estado_id(1L);
            subTotal = producto.getProducto_precio()*cantidad;
            pedidoDetalle.setPedido_detalle_subtotal(subTotal);

            pedidoDetalleRepository.save(pedidoDetalle);

        }
        //Aca tengo que agregar la logica para sumar todos los totales
        List<PedidoDetalle> pedidoDetalles= pedidoDetalleService.findAllPedidoDetalleByPedido(pedido);

        for (PedidoDetalle detalle : pedidoDetalles) {
            if (detalle.getPedido_detalle_estado_id() == 1) {
                cantidadProductos++;
                cantidadProductosTotales += detalle.getPedido_detalle_cantidad();
                total += detalle.getPedido_detalle_subtotal();
            }
        }
        pedido.setPedido_total_productos(cantidadProductos);

        pedido.setPedido_total_dinero(total);
        //carrito.calcularTotal(); // Recalcula el total del carrito
        pedido.setPedido_usuario_modificacion(usuarioTransaccion);
        pedido.setPedido_fecha_modificacion(LocalDateTime.now());

        pedidoRepository.save(pedido); // Persistir el carrito con los detalles
        return pedido;


    }

    @Transactional
    public void quitarProductoDelPedido(Long pedidoId, Long productoId, String usuarioTransaccion) {
        LocalDateTime now = LocalDateTime.now();
        double total = 0.0;
        Integer cantidadProductos = 0;
        Integer cantidadProductosTotales = 0;
        // Buscar el carrito
        Pedido pedido  = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        Long detalleId = getDetalleIdByPedidoAndProducto(pedidoId, productoId);
        // Buscar el detalle del carrito correspondiente al producto
        PedidoDetalle detalle = pedidoDetalleRepository.findById(detalleId).get();
        detalle.setPedido_detalle_estado_id(2L);
        detalle.setPedido_detalle_fecha_modificacion(now);
        detalle.setPedido_detalle_usuario_modificacion(usuarioTransaccion);
        detalle.setPedido_detalle_fecha_baja(now);
        detalle.setPedido_detalle_usuario_baja(usuarioTransaccion);
        pedidoDetalleRepository.save(detalle);

        List<PedidoDetalle> detalles = pedidoDetalleService.findAllPedidoDetalleByPedido(pedido);
        for (PedidoDetalle pedidoDetalle : detalles) {
            log.info(pedidoDetalle.getDetalle_producto().toString());
            if (pedidoDetalle.getPedido_detalle_estado_id() == 1) {
                cantidadProductos++;
                cantidadProductosTotales += detalle.getPedido_detalle_cantidad();
                total += pedidoDetalle.getPedido_detalle_subtotal();
            }
        }
        pedido.setPedido_total_productos(cantidadProductos);
        pedido.setPedido_total_dinero(total);
        //carrito.calcularTotal(); // Recalcula el total del carrito
        pedido.setPedido_usuario_modificacion(usuarioTransaccion);
        pedido.setPedido_fecha_modificacion(now);

        pedidoRepository.save(pedido);
    }

    public Long getDetalleIdByPedidoAndProducto(Long pedidoId, Long productoId) {
        // Llamar al procedimiento almacenado
        String sql = "{call GetDetalleIdByPedidoAndProducto(?, ?)}";

        // Ejecutar el procedimiento y obtener el resultado
        return jdbcTemplate.queryForObject(sql, new Object[]{pedidoId, productoId}, Long.class);
    }

    public List<PedidoCliDTO> getPedidosCliente(Long clienteId){
        return pedidoRepository.findAllPedidosByClienteId(clienteId);
    }




     /**
     * Metodos genericos
     **/
    public Long proximoNroPedido(){
        Long proximoNroPedido = pedidoRepository.findMaxPedidoNumeroPedido();
        if (proximoNroPedido != null)
        {
            proximoNroPedido += 1L;
        }
        else {
            proximoNroPedido = 1L;
        }
        return proximoNroPedido;
    }

    public static LocalDateTime calcularFechaEntrega(LocalDateTime fecha) {
        DayOfWeek diaDeLaSemana = fecha.getDayOfWeek();

        if (diaDeLaSemana == DayOfWeek.SATURDAY ||
                diaDeLaSemana == DayOfWeek.SUNDAY ||
                diaDeLaSemana == DayOfWeek.MONDAY ||
                diaDeLaSemana == DayOfWeek.TUESDAY) {
            return fecha.plusDays(1); // Entrega el miércoles
        } else {
            // Para los demás días (miércoles, jueves, viernes), entrega el sábado
            return fecha.with(DayOfWeek.SATURDAY);
        }
    }
}
