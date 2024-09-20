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
    @Column(name = "cliente_id")
    private long cliente_id;

    @Column(name = "cliente_documento")
    private String cliente_documento;

    @Column(name = "cliente_tipo_documento")
    private String cliente_tipo_documento;

    @Column(name = "cliente_apellido")
    private String cliente_apellido;

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

    public Cliente get() {
        Cliente cliente = new Cliente();
        cliente.setCliente_id(this.cliente_id);
        cliente.setCliente_nombre(this.cliente_nombre);
        cliente.setCliente_apellido(this.cliente_apellido);
        cliente.setCliente_documento(this.cliente_documento);
        cliente.setCliente_tipo_documento(this.cliente_tipo_documento);
        cliente.setCliente_email(this.cliente_email);
        cliente.setCliente_telefono(this.cliente_telefono);
        cliente.setCliente_estado_id(this.cliente_estado_id);
        cliente.setCliente_fecha_alta(this.cliente_fecha_alta);
        cliente.setCliente_fecha_modificacion(this.cliente_fecha_baja);
        cliente.setCliente_usuario_alta(this.cliente_usuario_alta);
        cliente.setCliente_usuario_baja(this.cliente_usuario_baja);
        cliente.setCliente_observaciones(this.cliente_observaciones);
        cliente.setCliente_usuario_modificacion(this.cliente_usuario_modificacion);
        cliente.setCliente_usuario_baja(this.cliente_usuario_baja);
        return cliente;
    }
}
