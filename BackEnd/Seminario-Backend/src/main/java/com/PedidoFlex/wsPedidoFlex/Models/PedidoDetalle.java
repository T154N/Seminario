package com.PedidoFlex.wsPedidoFlex.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "pedido_detalle")
public class PedidoDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pedido_detalle_id")
    private long pedido_detalle_id;

    @Column(name = "pedido_detalle_precio_individual")
    private double pedido_detalle_precio_individual;

    @Column(name = "pedido_detalle_cantidad")
    private Integer pedido_detalle_cantidad;

    @Column(name = "pedido_detalle_estado_id")
    private Long pedido_detalle_estado_id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ssXXX")
    @Column(name = "pedido_detalle_fecha_alta", insertable = false, updatable = false)
    private LocalDateTime pedido_detalle_fecha_alta;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ssXXX")
    @Column(name = "pedido_detalle_fecha_modificacion")
    private LocalDateTime pedido_detalle_fecha_modificacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ssXXX")
    @Column(name = "pedido_detalle_fecha_baja")
    private LocalDateTime  pedido_detalle_fecha_baja;

    @Column(name = "pedido_detalle_usuario_alta")
    private String pedido_detalle_usuario_alta;

    @Column(name = "pedido_detalle_usuario_modificacion")
    private String pedido_detalle_usuario_modificacion;

    @Column(name = "pedido_detalle_usuario_baja")
    private String pedido_detalle_usuario_baja;

    @Column(name = "pedido_detalle_observaciones")
    private String pedido_detalle_observaciones;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_detalle_pedido_id", referencedColumnName = "pedido_id", nullable = false)
    private Pedido pedido;

    @JsonBackReference
    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_detalle_producto_id", referencedColumnName = "producto_id", nullable = false)
    private Producto detalle_producto;

    @Column(name = "pedido_detalle_subtotal")
    private Double pedido_detalle_subtotal;

}
