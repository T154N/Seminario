package com.PedidoFlex.wsPedidoFlex.Service.Carrito;

import com.PedidoFlex.wsPedidoFlex.Models.Carrito.Carrito;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.CarritoDetalle;
import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import com.PedidoFlex.wsPedidoFlex.Models.Producto;
import com.PedidoFlex.wsPedidoFlex.Repository.CarritoDetalleRepository;
import com.PedidoFlex.wsPedidoFlex.Repository.CarritoRepository;
import com.PedidoFlex.wsPedidoFlex.Service.ProductoService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private CarritoDetalleRepository carritoDetalleRepository;
    @Autowired
    private CarritoDetalleService carritoDetalleService;
    @Autowired
    private ProductoService productoService;
    @Autowired
    private EntityManager entityManager;

    public List<Carrito> finAll() {
        return carritoRepository.findAll();
    }

    public Carrito findById(Long id) {
        Optional<Carrito> carritoOptional =  carritoRepository.findById(id);
        return carritoOptional.get();
    }

    public Carrito findCarritoByCliente(Cliente cliente) {
        Carrito carrito = null;
            String jpql = "SELECT c FROM Carrito c WHERE c.cliente = :cliente " +
                    "AND c.estadoId = 1 AND c.estadoCarritoPedido = 12 " +
                    "ORDER BY c.carrito_fecha_creacion DESC";

            TypedQuery<Carrito> query = entityManager.createQuery(jpql, Carrito.class);
            query.setParameter("cliente", cliente);
            query.setMaxResults(1);  // Limita los resultados a solo 1 carrito

            try {
                carrito = query.getSingleResult();
                return carrito;  // Si se encuentra un carrito, lo devuelve
            } catch (NoResultException e) {
                // Si no se encuentra ningún carrito, retorna null
                return carrito;
            }
    }

    public Carrito crearCarrito(Cliente cliente, String usuaroAlta) {
        Carrito carrito = new Carrito();
        carrito.setCliente(cliente);
        carrito.setUsuario_alta(usuaroAlta);
        return carritoRepository.save(carrito);
    }

    @Transactional
    public Carrito agregarProductoAlCarrito(Long carritoId, Producto producto, Integer cantidad,String usuarioTransaccion) {
        Carrito carrito = carritoRepository.findById(carritoId).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        double total = 0.0;
        Integer cantidadProductos = 0;
        Integer cantidadProductosTotales = 0;
        boolean encuentroProductoAgregado = false;
        boolean mismaCantidad = false;
        if (carrito.getDetalles() == null) {
            carrito.setDetalles(new HashSet<>());
        }
        List<CarritoDetalle> detalles = carritoDetalleRepository.findCarritoDetalleByCarrito(carrito);
        log.info(producto.toString());
        for (CarritoDetalle carritoDetalle : detalles) {
            log.info(carritoDetalle.getProducto().toString());
            if (carritoDetalle.getEstadoId() == 1) {
                if (carritoDetalle.getProducto() == producto) {
                    log.info("Es igual)");
                    if (carritoDetalle.getCantidad() != cantidad) {
                        CarritoDetalle detalleUpdate = carritoDetalleService.findById(carritoDetalle.getCarrito_detalle_id());
                        detalleUpdate.setCarrito(carrito);
                        detalleUpdate.setProducto(producto);
                        detalleUpdate.setCantidad(cantidad);
                        detalleUpdate.setUsuario_alta(usuarioTransaccion);
                        detalleUpdate.setPrecio_individual(producto.getProducto_precio()); // Suponiendo que el precio es del producto
                        detalleUpdate.calcularSubtotal(); // Calcula el subtotal
                        carritoDetalleRepository.save(detalleUpdate);
                        encuentroProductoAgregado = true;
                    } else {
                        log.info("mismacantidad");
                        mismaCantidad = true;
                    }

                }
                cantidadProductos++;
                cantidadProductosTotales+= carritoDetalle.getCantidad();
                total += carritoDetalle.getSubtotal();

            }
        }
        if (!encuentroProductoAgregado && !mismaCantidad) {
            CarritoDetalle detalle = new CarritoDetalle();
            detalle.setCarrito(carrito);
            detalle.setProducto(producto);
            detalle.setCantidad(cantidad);
            detalle.setUsuario_alta(usuarioTransaccion);
            detalle.setPrecio_individual(producto.getProducto_precio()); // Suponiendo que el precio es del producto
            detalle.calcularSubtotal(); // Calcula el subtotal
            carritoDetalleRepository.save(detalle);
            cantidadProductos++;
            cantidadProductosTotales++;
            total += detalle.getSubtotal();
        }
        carrito.setCantidadProductos(cantidadProductos);
        carrito.setCantidadProductosTotal(cantidadProductosTotales);
        carrito.setTotal(total);
        //carrito.calcularTotal(); // Recalcula el total del carrito
        carrito.setUsuario_modificacion(usuarioTransaccion);
        carrito.setFecha_modificacion(LocalDateTime.now());

        carritoRepository.save(carrito); // Persistir el carrito con los detalles
        return carrito;
    }

    @Transactional
    public void quitarProductoDelCarrito(Long carritoId, Long productoId, String usuarioTransaccion) {
        LocalDateTime now = LocalDateTime.now();
        double total = 0.0;
        // Buscar el carrito
        Carrito carrito = carritoRepository.findById(carritoId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        // Buscar el detalle del carrito correspondiente al producto
        CarritoDetalle detalle = carritoDetalleRepository.findCarritoDetalleByCarritoAndProducto(carrito,productoService.findProductoById(productoId)).get();
        detalle.setEstadoId(2L);
        detalle.setFecha_modificacion(now);
        detalle.setUsuario_modificacion(usuarioTransaccion);
        detalle.setFecha_baja(now);
        detalle.setUsuario_baja(usuarioTransaccion);
        carritoDetalleRepository.save(detalle);

        List<CarritoDetalle> detalles = carritoDetalleRepository.findCarritoDetalleByCarrito(carrito);
        for (CarritoDetalle carritoDetalle : detalles) {
            log.info(carritoDetalle.getProducto().toString());
            if (carritoDetalle.getEstadoId() == 1) {
                total += carritoDetalle.getSubtotal();
            }
        }

        carrito.setTotal(total);
        //carrito.calcularTotal(); // Recalcula el total del carrito
        carrito.setUsuario_modificacion(usuarioTransaccion);
        carrito.setFecha_modificacion(now);

        // Guardar el carrito actualizado
        carritoRepository.save(carrito);
    }

    @Transactional
    public void setBajaCarrito(Long carritoId, String usuarioTransaccion) {
        LocalDateTime now = LocalDateTime.now();
        // Buscar el carrito
        Carrito carrito = carritoRepository.findById(carritoId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        if (carrito.getEstadoId() == 1) {
            List<CarritoDetalle> detalles = carritoDetalleRepository.findCarritoDetalleByCarrito(carrito);
            for (CarritoDetalle carritoDetalle : detalles) {
                log.info(carritoDetalle.getProducto().toString());
                if (carritoDetalle.getEstadoId() == 1) {
                    carritoDetalle.setEstadoId(2L);
                    carritoDetalle.setFecha_modificacion(now);
                    carritoDetalle.setUsuario_modificacion(usuarioTransaccion);
                    carritoDetalle.setFecha_baja(now);
                    carritoDetalle.setUsuario_baja(usuarioTransaccion);
                    carritoDetalleRepository.save(carritoDetalle);
                }
            }
            carrito.setEstadoId(2L);
            carrito.setFecha_baja(now);
            carrito.setUsuario_baja(usuarioTransaccion);
            carrito.setUsuario_modificacion(usuarioTransaccion);
            carrito.setFecha_modificacion(now);

            // Guardar el carrito actualizado
            carritoRepository.save(carrito);
        }
    }

    public void updateCarrito(Carrito carrito) {
        carritoRepository.save(carrito);
    }
}
