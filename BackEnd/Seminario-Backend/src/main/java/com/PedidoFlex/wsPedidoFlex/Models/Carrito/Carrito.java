package com.PedidoFlex.wsPedidoFlex.Models.Carrito;
import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import com.PedidoFlex.wsPedidoFlex.Models.Producto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
@Slf4j
@Data
@Entity
@Table(name = "carrito")
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "carrito_id")
    private long carrito_id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "carrito_cliente_id", nullable = false)
    private Cliente cliente;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "carrito_fecha_alta", insertable = false, updatable = false)
    private LocalDateTime carrito_fecha_creacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "carrito_fecha_modificacion")
    private LocalDateTime fecha_modificacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "carrito_fecha_baja")
    private LocalDateTime fecha_baja;

    @Column(name = "carrito_usuario_alta")
    private String usuario_alta;

    @Column(name = "carrito_usuario_modificacion")
    private String usuario_modificacion;

    @Column(name = "carrito_usuario_baja")
    private String usuario_baja;

    @Column(name = "carrito_estado_pedido")
    private Long estadoCarritoPedido; // Estados por ejemplo: "nuevo" "procesado",etc

    @Column(name = "carrito_estado_id", nullable = false)
    private Long estadoId; // Activo o Baja

    @Column(name = "carrito_total")
    private Double total; // Total del carrito (opcional)

    @JsonManagedReference
    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CarritoDetalle> detalles = new HashSet<>();

    @Column(name = "carrito_cantidad_productos_total") //sumatoria de todos los productos como items de cantidad
    private  Integer cantidadProductosTotal;

    @Column(name = "carrito_cantidad_productos") // sumatoria de productos individuales
    private  Integer cantidadProductos;

    // Constructor para inicializar la fecha de creación
    @PrePersist
    protected void onCreate() {
        this.carrito_fecha_creacion = LocalDateTime.now();
        this.estadoId = 1L;
        this.estadoCarritoPedido = 12L;//Nuevo
    }

    @PreUpdate
    protected void onUpdate(){
        LocalDateTime now = LocalDateTime.now();
        if (this.estadoId.equals("2")) {
            this.fecha_baja = now;
        }
        this.fecha_modificacion = now;
    }


    // Método para calcular el total del carrito
    public void calcularTotal() {
        this.total = detalles.stream()
                .mapToDouble(CarritoDetalle::getSubtotal)
                .sum();
        log.info(total.toString());
    }
}


