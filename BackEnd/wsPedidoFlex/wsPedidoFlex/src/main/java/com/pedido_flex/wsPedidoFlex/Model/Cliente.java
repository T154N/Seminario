package com.pedido_flex.wsPedidoFlex.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "cliente_fecha_alta" )
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

    @OneToOne(mappedBy = "cliente")
    private Usuario usuario;

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


    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @JoinColumn(name = "domicilio_cliente_id")
    @OneToMany( cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    //@OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Domicilio> domicilios = new ArrayList<>();

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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

    public Integer getCliente_estado_id() {
        return cliente_estado_id;
    }

    public void setCliente_estado_id(Integer cliente_estado_id) {
        this.cliente_estado_id = cliente_estado_id;
    }

//    public Usuario getUsuario() {
//        return usuario;
//    }
//
//    public void setUsuario(Usuario usuario) {
//        this.usuario = usuario;
//    }

    public List<Domicilio> getDomicilios() {
        return domicilios;
    }

    public void setDomicilios(List<Domicilio> domicilios) {
        this.domicilios = domicilios;
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

    public LocalDateTime getCliente_fecha_baja() {
        return cliente_fecha_baja;
    }

    public void setCliente_fecha_baja(LocalDateTime cliente_fecha_baja) {
        this.cliente_fecha_baja = cliente_fecha_baja;
    }

    public LocalDateTime getCliente_fecha_modificacion() {
        return cliente_fecha_modificacion;
    }

    public void setCliente_fecha_modificacion(LocalDateTime cliente_fecha_modificacion) {
        this.cliente_fecha_modificacion = cliente_fecha_modificacion;
    }

    public LocalDateTime getCliente_fecha_alta() {
        return cliente_fecha_alta;
    }

    public void setCliente_fecha_alta(LocalDateTime cliente_fecha_alta) {
        this.cliente_fecha_alta = cliente_fecha_alta;
    }
}
