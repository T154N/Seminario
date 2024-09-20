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

    @Column(name ="usuario_contraseña")
    private String usuario_contrasena;

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


    public Usuario get(){
        Usuario usuario = new Usuario();
        usuario.setUsuario_id(this.usuario_id);
        usuario.setUsuario_cliente_id(this.usuario_cliente_id);
        usuario.setUsuario_cliente_email(this.usuario_cliente_email);
        usuario.setUsuario_contrasena(this.usuario_contrasena);
        usuario.setUsuario_estado_id(this.usuario_estado_id);
        usuario.setUsuario_rol_id(this.usuario_rol_id);
        usuario.setUsuario_observaciones(this.usuario_observaciones);
        usuario.setUsuario_fecha_alta(this.usuario_fecha_alta);
        usuario.setUsuario_fecha_modificacion(this.usuario_fecha_modificacion);
        usuario.setUsuario_fecha_baja(this.usuario_fecha_baja);
        usuario.setUsuario_usuario_alta(this.usuario_usuario_alta);
        usuario.setUsuario_usuario_modificacion(this.usuario_usuario_modificacion);
        usuario.setUsuario_usuario_baja(this.usuario_usuario_baja);
        return usuario;
    }


}
