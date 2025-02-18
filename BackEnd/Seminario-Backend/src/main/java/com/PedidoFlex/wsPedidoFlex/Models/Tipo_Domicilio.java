package com.PedidoFlex.wsPedidoFlex.Models;

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
@Table(name = "tipo_domicilio")
public class Tipo_Domicilio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tipo_domicilio_id")
    private long tipo_domicilio_id;

    @Column(name = "tipo_domicilio_descripcion", nullable = false)
    private String tipo_domicilio_descripcion;

    @Column(name = "tipo_domicilio_estado_id", nullable = false)
    private Integer tipo_domicilio_estado_id;

    @Column(name = "tipo_domicilio_observaciones")
    private String tipo_domicilio_observaciones;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "tipo_domicilio_fecha_alta", insertable = false, updatable = false)
    private LocalDateTime tipo_domicilio_fecha_alta;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "tipo_domicilio_fecha_modificacion")
    private LocalDateTime tipo_domicilio_fecha_modificacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "tipo_domicilio_fecha_baja")
    private LocalDateTime tipo_domicilio_fecha_baja;

    @Column(name = "tipo_domicilio_usuario_alta", nullable = false)
    private String tipo_domicilio_usuario_alta;

    @Column(name = "tipo_domicilio_usuario_modificacion")
    private String tipo_domicilio_usuario_modificacion;

    @Column(name = "tipo_domicilio_usuario_baja")
    private String tipo_domicilio_usuario_baja;

    public Tipo_Domicilio(long domicilioTipoDomicilioId) {
    }
}
