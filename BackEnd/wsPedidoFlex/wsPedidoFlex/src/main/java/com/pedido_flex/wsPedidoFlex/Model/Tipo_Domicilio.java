package com.pedido_flex.wsPedidoFlex.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "tipo_domicilio")
public class Tipo_Domicilio {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "tipo_domicilio_id")
    private long tipo_domicilio_id;

    @Column(name = "tipo_domicilio_descripcion", nullable = false)
    private String tipo_domicilio_descripcion;

    @Column(name = "tipo_domicilio_estado_id", nullable = false)
    private Integer tipo_domicilio_estado_id;

    @Column(name = "tipo_domicilio_observaciones")
    private String tipo_domicilio_observaciones;

    @Column(name = "tipo_domicilio_fecha_alta", nullable = false)
    private LocalDateTime tipo_domicilio_fecha_alta;

    @Column(name = "tipo_domicilio_fecha_modificacion")
    private LocalDateTime tipo_domicilio_fecha_modificacion;

    @Column(name = "tipo_domicilio_fecha_baja")
    private LocalDateTime tipo_domicilio_fecha_baja;

    @Column(name = "tipo_domicilio_usuario_alta", nullable = false)
    private String tipo_domicilio_usuario_alta;

    @Column(name = "tipo_domicilio_usuario_modificacion")
    private String tipo_domicilio_usuario_modificacion;

    @Column(name = "tipo_domicilio_usuario_baja")
    private String tipo_domicilio_usuario_baja;
}
