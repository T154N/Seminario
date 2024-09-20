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
    private long rolId;

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
        roles.setRolId(rolId);
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


}
