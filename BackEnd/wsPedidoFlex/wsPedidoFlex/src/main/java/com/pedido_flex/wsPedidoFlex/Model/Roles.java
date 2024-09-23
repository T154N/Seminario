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

    @Column(name = "rol_fecha_alta", nullable = false)
    private LocalDateTime rolFechaAlta;

    @Column(name = "rol_fecha_modificacion")
    private LocalDateTime rolFechaModificacion;

    @Column(name = "rol_fecha_baja")
    private LocalDateTime rolFechaBaja;

    @Column(name = "rol_usuario_alta", nullable = false)
    private String rolUsuarioAlta;

    @Column(name = "rol_usuario_modificacion")
    private String rolUsuarioModificacion;

    @Column(name = "rol_usuario_baja")
    private String rolUsuarioBaja;

    public Roles get(){
        Roles roles = new Roles();
        roles.setRol_id(rol_id);
        roles.setRolNombre(rolNombre);
        roles.setRolEstadoId(rolEstadoId);
        roles.setRolObservaciones(rolObservaciones);
        roles.setRolFechaAlta(rolFechaAlta);
        roles.setRolFechaModificacion(rolFechaModificacion);
        roles.setRolFechaBaja(rolFechaBaja);
        roles.setRolUsuarioAlta(rolUsuarioAlta);
        roles.setRolUsuarioModificacion(rolUsuarioModificacion);
        roles.setRolUsuarioBaja(rolUsuarioBaja);
        return roles;
    }

    public long getRol_id() {
        return rol_id;
    }

    public void setRol_id(long rol_id) {
        this.rol_id = rol_id;
    }

    public String getRolNombre() {
        return rolNombre;
    }

    public void setRolNombre(String rolNombre) {
        this.rolNombre = rolNombre;
    }

    public Integer getRolEstadoId() {
        return rolEstadoId;
    }

    public void setRolEstadoId(Integer rolEstadoId) {
        this.rolEstadoId = rolEstadoId;
    }

    public String getRolObservaciones() {
        return rolObservaciones;
    }

    public void setRolObservaciones(String rolObservaciones) {
        this.rolObservaciones = rolObservaciones;
    }

    public LocalDateTime getRolFechaAlta() {
        return rolFechaAlta;
    }

    public void setRolFechaAlta(LocalDateTime rolFechaAlta) {
        this.rolFechaAlta = rolFechaAlta;
    }

    public LocalDateTime getRolFechaModificacion() {
        return rolFechaModificacion;
    }

    public void setRolFechaModificacion(LocalDateTime rolFechaModificacion) {
        this.rolFechaModificacion = rolFechaModificacion;
    }

    public LocalDateTime getRolFechaBaja() {
        return rolFechaBaja;
    }

    public void setRolFechaBaja(LocalDateTime rolFechaBaja) {
        this.rolFechaBaja = rolFechaBaja;
    }

    public String getRolUsuarioAlta() {
        return rolUsuarioAlta;
    }

    public void setRolUsuarioAlta(String rolUsuarioAlta) {
        this.rolUsuarioAlta = rolUsuarioAlta;
    }

    public String getRolUsuarioModificacion() {
        return rolUsuarioModificacion;
    }

    public void setRolUsuarioModificacion(String rolUsuarioModificacion) {
        this.rolUsuarioModificacion = rolUsuarioModificacion;
    }

    public String getRolUsuarioBaja() {
        return rolUsuarioBaja;
    }

    public void setRolUsuarioBaja(String rolUsuarioBaja) {
        this.rolUsuarioBaja = rolUsuarioBaja;
    }
}
