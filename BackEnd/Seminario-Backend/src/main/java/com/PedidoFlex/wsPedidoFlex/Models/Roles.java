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
@Table(name = "roles")
public class Roles {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "rol_id")
    private long rol_id;

    @Column(name = "rol_nombre", nullable = false)
    private String rolNombre;

    @Column(name = "rol_estado_id", nullable = false)
    private Integer rolEstadoId;

    @Column(name = "rol_observaciones")
    private String rolObservaciones;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "rol_fecha_alta", insertable = false, updatable = false)
    private LocalDateTime rolFechaAlta;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "rol_fecha_modificacion")
    private LocalDateTime rolFechaModificacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "rol_fecha_baja")
    private LocalDateTime rolFechaBaja;

    @Column(name = "rol_usuario_alta", nullable = false)
    private String rolUsuarioAlta;

    @Column(name = "rol_usuario_modificacion")
    private String rolUsuarioModificacion;

    @Column(name = "rol_usuario_baja")
    private String rolUsuarioBaja;
}