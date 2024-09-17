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
@Table(name = "cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "cliente_nombre")
    private String cliente_nombre;

    @Column (name = "cliente_email")
    private String cliente_email;

    @Column (name = "cliente_telefono")
    private String cliente_telefono;

    @Column (name = "cliente_estado_id")
    private Integer cliente_estado_id;

    @Column(name = "cliente_fecha_alta")
    private LocalDateTime cliente_fecha_alta;

    @Column(name = "cliente_fecha_modificacion")
    private LocalDateTime cliente_fecha_modificacion;

    @Column(name = "cliente_fecha_baja")
    private LocalDateTime cliente_fecha_baja;

    @Column(name = "cliente_usuario_alta")
    private String cliente_usuario_alta;

    @Column(name = "cliente_usuario_modificacion")
    private String cliente_usuario_modificacion;

    @Column(name = "cliente_usuario_baja")
    private String cliente_usuario_baja;

    @Column(name = "cliente_observaciones")
    private String cliente_observaciones;

}
