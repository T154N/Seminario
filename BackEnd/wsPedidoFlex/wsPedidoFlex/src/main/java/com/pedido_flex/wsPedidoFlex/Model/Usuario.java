package com.pedido_flex.wsPedidoFlex.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuario_id")
    private long usuario_id;

    @Column(name = "usuario_cliente_id")
    private long usuario_cliente_id;

    @Column(name ="usuario_cliente_email")
    private String usuario_cliente_email;

//    @Column(name ="usuario_contraseña")
//    private usuario_contrasena;

    @Column(name ="usuario_estado_id")
    private Integer usuario_estado_id;

    @Column(name ="usuario_rol_id")
    private Integer usuario_rol_id;

    @Column(name ="usuario_observaciones")
    private String usuario_observaciones;

    @Column(name ="usuario_fecha_alta")
    private LocalDateTime usuario_fecha_alta;

    @Column(name ="usuario_fecha_modificacion")
    private LocalDateTime usuario_fecha_modificacion;

    @Column(name ="usuario_fecha_baja")
    private LocalDateTime usuario_fecha_baja;

    @Column(name ="usuario_usuario_alta")
    private String usuario_usuario_alta;

    @Column(name ="usuario_usuario_modificacion")
    private String usuario_usuario_modificacion;

    @Column(name ="usuario_usuario_baja")
    private String usuario_usuario_baja;
}
