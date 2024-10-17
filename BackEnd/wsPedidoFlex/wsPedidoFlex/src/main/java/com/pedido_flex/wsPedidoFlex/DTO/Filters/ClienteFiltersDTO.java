package com.pedido_flex.wsPedidoFlex.DTO.Filters;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import jakarta.persistence.*;

import java.time.LocalDateTime;

public class ClienteFiltersDTO {
    private long cliente_id;
    private String cliente_documento;
    private String cliente_tipo_documento;
    private String cliente_cuit;
    private String cliente_apellido;
    private String cliente_nombre;
    private String cliente_email;
    private String cliente_telefono;
    private String cliente_estado;
    private LocalDateTime cliente_fecha_alta;
    private LocalDateTime cliente_fecha_modificacion;
    private LocalDateTime cliente_fecha_baja;
    private String cliente_usuario_alta;
    private String cliente_usuario_modificacion;
    private String cliente_usuario_baja;
    private String cliente_observaciones;

    public ClienteFiltersDTO(long cliente_id, String cliente_documento, String cliente_tipo_documento, String cliente_cuit, String cliente_apellido, String cliente_nombre, String cliente_email, String cliente_telefono, String cliente_estado, LocalDateTime cliente_fecha_alta, LocalDateTime cliente_fecha_modificacion, LocalDateTime cliente_fecha_baja, String cliente_usuario_alta, String cliente_usuario_modificacion, String cliente_usuario_baja, String cliente_observaciones) {
        this.cliente_id = cliente_id;
        this.cliente_documento = cliente_documento;
        this.cliente_tipo_documento = cliente_tipo_documento;
        this.cliente_cuit = cliente_cuit;
        this.cliente_apellido = cliente_apellido;
        this.cliente_nombre = cliente_nombre;
        this.cliente_email = cliente_email;
        this.cliente_telefono = cliente_telefono;
        this.cliente_estado = cliente_estado;
        this.cliente_fecha_alta = cliente_fecha_alta;
        this.cliente_fecha_modificacion = cliente_fecha_modificacion;
        this.cliente_fecha_baja = cliente_fecha_baja;
        this.cliente_usuario_alta = cliente_usuario_alta;
        this.cliente_usuario_modificacion = cliente_usuario_modificacion;
        this.cliente_usuario_baja = cliente_usuario_baja;
        this.cliente_observaciones = cliente_observaciones;
    }


    public long getCliente_id() {
        return cliente_id;
    }

    public void setCliente_id(long cliente_id) {
        this.cliente_id = cliente_id;
    }

    public String getCliente_documento() {
        return cliente_documento;
    }

    public void setCliente_documento(String cliente_documento) {
        this.cliente_documento = cliente_documento;
    }

    public String getCliente_tipo_documento() {
        return cliente_tipo_documento;
    }

    public void setCliente_tipo_documento(String cliente_tipo_documento) {
        this.cliente_tipo_documento = cliente_tipo_documento;
    }

    public String getCliente_cuit() {
        return cliente_cuit;
    }

    public void setCliente_cuit(String cliente_cuit) {
        this.cliente_cuit = cliente_cuit;
    }

    public String getCliente_apellido() {
        return cliente_apellido;
    }

    public void setCliente_apellido(String cliente_apellido) {
        this.cliente_apellido = cliente_apellido;
    }

    public String getCliente_nombre() {
        return cliente_nombre;
    }

    public void setCliente_nombre(String cliente_nombre) {
        this.cliente_nombre = cliente_nombre;
    }

    public String getCliente_email() {
        return cliente_email;
    }

    public void setCliente_email(String cliente_email) {
        this.cliente_email = cliente_email;
    }

    public String getCliente_telefono() {
        return cliente_telefono;
    }

    public void setCliente_telefono(String cliente_telefono) {
        this.cliente_telefono = cliente_telefono;
    }

    public String getCliente_estado() {
        return cliente_estado;
    }

    public void setCliente_estado(Integer cliente_estado_id) {
        if (cliente_estado_id != null) {
            this.cliente_estado = (cliente_estado_id == 1) ? "Activo" : (cliente_estado_id == 2) ? "Deshabilitado" : "Desconocido";
        }
    }

    public LocalDateTime getCliente_fecha_alta() {
        return cliente_fecha_alta;
    }

    public void setCliente_fecha_alta(LocalDateTime cliente_fecha_alta) {
        this.cliente_fecha_alta = cliente_fecha_alta;
    }

    public LocalDateTime getCliente_fecha_modificacion() {
        return cliente_fecha_modificacion;
    }

    public void setCliente_fecha_modificacion(LocalDateTime cliente_fecha_modificacion) {
        this.cliente_fecha_modificacion = cliente_fecha_modificacion;
    }

    public LocalDateTime getCliente_fecha_baja() {
        return cliente_fecha_baja;
    }

    public void setCliente_fecha_baja(LocalDateTime cliente_fecha_baja) {
        this.cliente_fecha_baja = cliente_fecha_baja;
    }

    public String getCliente_usuario_alta() {
        return cliente_usuario_alta;
    }

    public void setCliente_usuario_alta(String cliente_usuario_alta) {
        this.cliente_usuario_alta = cliente_usuario_alta;
    }

    public String getCliente_usuario_modificacion() {
        return cliente_usuario_modificacion;
    }

    public void setCliente_usuario_modificacion(String cliente_usuario_modificacion) {
        this.cliente_usuario_modificacion = cliente_usuario_modificacion;
    }

    public String getCliente_usuario_baja() {
        return cliente_usuario_baja;
    }

    public void setCliente_usuario_baja(String cliente_usuario_baja) {
        this.cliente_usuario_baja = cliente_usuario_baja;
    }

    public String getCliente_observaciones() {
        return cliente_observaciones;
    }

    public void setCliente_observaciones(String cliente_observaciones) {
        this.cliente_observaciones = cliente_observaciones;
    }
}
