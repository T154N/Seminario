package com.PedidoFlex.wsPedidoFlex.Models.Carrito;
import com.PedidoFlex.wsPedidoFlex.Models.Producto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "carrito_detalle")
public class CarritoDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "carrito_detalle_id",nullable = false)
    private long carrito_detalle_id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "carrito_id", nullable = false)
    private Carrito carrito;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @Column(name = "carrito_detalle_cantidad")
    private Integer cantidad;

    @Column(name = "carrito_detalle_precio_individual")
    private Double precio_individual; // Precio al momento de añadir al carrito

    @Column(name = "carrito_detalle_subtotal")
    private Double subtotal; // Cálculo: cantidad * precio_individual

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "carrito_detalle_fecha_alta", insertable = false, updatable = false)
    private LocalDateTime fecha_creacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "carrito_detalle_fecha_modificacion")
    private LocalDateTime fecha_modificacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "carrito_detalle_fecha_baja")
    private LocalDateTime fecha_baja;

    @Column(name = "carrito_detalle_usuario_alta")
    private String usuario_alta;

    @Column(name = "carrito_detalle_usuario_modificacion")
    private String usuario_modificacion;

    @Column(name = "carrito_detalle_usuario_baja")
    private String usuario_baja;

    @Column(name = "carrito_detalle_estado_id", nullable = false)
    private Long estadoId; // Activo o Baja

    // Método para calcular el subtotal
    public void calcularSubtotal() {
        this.subtotal = cantidad * precio_individual;
    }

    // Constructor para inicializar la fecha de creación
    @PrePersist
    protected void onCreate() {
        this.fecha_creacion = LocalDateTime.now();
        this.estadoId= 1L;
    }
}
