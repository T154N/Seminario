package com.pedido_flex.wsPedidoFlex.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

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

    @JoinColumn(name = "usuario_rol_id", referencedColumnName = "rol_id", nullable = false)
    private Long usuario_rol_id;

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

    public Usuario(String usuario_cliente_email,String usuario_contrasena){
        this.usuario_cliente_email = usuario_cliente_email;
        this.usuario_contrasena = usuario_contrasena;
    }

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

    public long getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(long usuario_id) {
        this.usuario_id = usuario_id;
    }

    public long getUsuario_cliente_id() {
        return usuario_cliente_id;
    }

    public void setUsuario_cliente_id(long usuario_cliente_id) {
        this.usuario_cliente_id = usuario_cliente_id;
    }

    public String getUsuario_cliente_email() {
        return usuario_cliente_email;
    }

    public void setUsuario_cliente_email(String usuario_cliente_email) {
        this.usuario_cliente_email = usuario_cliente_email;
    }

    public String getUsuario_contrasena() {
        return usuario_contrasena;
    }

    public void setUsuario_contrasena(String usuario_contrasena) {
        this.usuario_contrasena = usuario_contrasena;
    }

    public Long getUsuario_rol_id() {
        return usuario_rol_id;
    }

    public void setUsuario_rol_id(Long usuario_rol_id) {
        this.usuario_rol_id = usuario_rol_id;
    }

    public Integer getUsuario_estado_id() {
        return usuario_estado_id;
    }

    public void setUsuario_estado_id(Integer usuario_estado_id) {
        this.usuario_estado_id = usuario_estado_id;
    }

    public String getUsuario_observaciones() {
        return usuario_observaciones;
    }

    public void setUsuario_observaciones(String usuario_observaciones) {
        this.usuario_observaciones = usuario_observaciones;
    }

    public LocalDateTime getUsuario_fecha_alta() {
        return usuario_fecha_alta;
    }

    public void setUsuario_fecha_alta(LocalDateTime usuario_fecha_alta) {
        this.usuario_fecha_alta = usuario_fecha_alta;
    }

    public LocalDateTime getUsuario_fecha_modificacion() {
        return usuario_fecha_modificacion;
    }

    public void setUsuario_fecha_modificacion(LocalDateTime usuario_fecha_modificacion) {
        this.usuario_fecha_modificacion = usuario_fecha_modificacion;
    }

    public LocalDateTime getUsuario_fecha_baja() {
        return usuario_fecha_baja;
    }

    public void setUsuario_fecha_baja(LocalDateTime usuario_fecha_baja) {
        this.usuario_fecha_baja = usuario_fecha_baja;
    }

    public String getUsuario_usuario_alta() {
        return usuario_usuario_alta;
    }

    public void setUsuario_usuario_alta(String usuario_usuario_alta) {
        this.usuario_usuario_alta = usuario_usuario_alta;
    }

    public String getUsuario_usuario_modificacion() {
        return usuario_usuario_modificacion;
    }

    public void setUsuario_usuario_modificacion(String usuario_usuario_modificacion) {
        this.usuario_usuario_modificacion = usuario_usuario_modificacion;
    }

    public String getUsuario_usuario_baja() {
        return usuario_usuario_baja;
    }

    public void setUsuario_usuario_baja(String usuario_usuario_baja) {
        this.usuario_usuario_baja = usuario_usuario_baja;
    }
}
