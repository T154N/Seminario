package com.PedidoFlex.wsPedidoFlex.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "medio_pago")
public class MedioPago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medio_pago_id")
    private long medio_pago_id;

    @Column(name = "medio_pago_descripcion")
    private String medio_pago_descripcion;

    @Column(name = "medio_pago_estado_id")
    private Long medio_pago_estado_id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "medio_pago_fecha_alta")
    private LocalDateTime medio_pago_fecha_alta;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "medio_pago_fecha_modificacion")
    private LocalDateTime medio_pago_fecha_modificacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "medio_pago_fecha_baja")
    private LocalDateTime medio_pago_fecha_baja;

    @Column(name = "medio_pago_usuario_alta")
    private String medio_pago_usuario_alta;

    @Column(name = "medio_pago_usuario_modificacion")
    private String medio_pago_usuario_modificacion;

    @Column(name = "medio_pago_usuario_baja")
    private String medio_pago_usuario_baja;

    @Column(name = "medio_pago_observaciones")
    private String medio_pago_observaciones;

    @OneToMany(mappedBy = "medio_pago", cascade = { CascadeType.PERSIST, CascadeType.MERGE},fetch = FetchType.LAZY,orphanRemoval = true)
    private Set<Pedido> pedidos;

}
