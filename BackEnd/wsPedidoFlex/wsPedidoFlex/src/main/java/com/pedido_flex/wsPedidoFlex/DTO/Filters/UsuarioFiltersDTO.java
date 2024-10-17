package com.pedido_flex.wsPedidoFlex.DTO.Filters;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pedido_flex.wsPedidoFlex.Model.Cliente;
import com.pedido_flex.wsPedidoFlex.Model.Roles;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class UsuarioFiltersDTO {
    private long usuario_id;
    private String usuario_email;
    private String usuario_contrasena;
    private String usuario_estado;
    private String rol;
    private String usuario_observaciones;
    private LocalDateTime usuario_fecha_alta;
    private LocalDateTime usuario_fecha_modificacion;
    private LocalDateTime usuario_fecha_baja;
    private String usuario_usuario_alta;
    private String usuario_usuario_modificacion;
    private String usuario_usuario_baja;

    public UsuarioFiltersDTO() {
    }

    public UsuarioFiltersDTO(long usuario_id, String usuario_email, String usuario_contrasena, String usuario_estado_id, String rol, String usuario_observaciones, LocalDateTime usuario_fecha_alta, LocalDateTime usuario_fecha_modificacion, LocalDateTime usuario_fecha_baja, String usuario_usuario_alta, String usuario_usuario_modificacion, String usuario_usuario_baja) {
        this.usuario_id = usuario_id;
        this.usuario_email = usuario_email;
        this.usuario_contrasena = usuario_contrasena;
        this.usuario_estado = usuario_estado;
        this.rol = rol;
        this.usuario_observaciones = usuario_observaciones;
        this.usuario_fecha_alta = usuario_fecha_alta;
        this.usuario_fecha_modificacion = usuario_fecha_modificacion;
        this.usuario_fecha_baja = usuario_fecha_baja;
        this.usuario_usuario_alta = usuario_usuario_alta;
        this.usuario_usuario_modificacion = usuario_usuario_modificacion;
        this.usuario_usuario_baja = usuario_usuario_baja;
    }

    public String getUsuario_estado() {
        return usuario_estado;
    }

    public void setUsuario_estado(Integer usuario_estado_id) {
        if (usuario_estado_id != null) {
            this.usuario_estado = (usuario_estado_id == 1) ? "Activo" : (usuario_estado_id == 2) ? "Deshabilitado" : "Desconocido";
        }
    }

    public long getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(long usuario_id) {
        this.usuario_id = usuario_id;
    }

    public String getUsuario_email() {
        return usuario_email;
    }

    public void setUsuario_email(String usuario_email) {
        this.usuario_email = usuario_email;
    }

    public String getUsuario_contrasena() {
        return usuario_contrasena;
    }

    public void setUsuario_contrasena(String usuario_contrasena) {
        this.usuario_contrasena = usuario_contrasena;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
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
