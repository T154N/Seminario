package com.pedido_flex.wsPedidoFlex.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "domicilio")
public class Domicilio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "domicilio_id")
    private long domicilio_id;

    @ManyToOne
    @JoinColumn(name ="domicilio_cliente_id")
    @JsonBackReference
    private Cliente cliente;

    @Column(name = "domicilio_tipo_domicilio_id")
    private long domicilioTipoDomicilioId; // bigint

    @Column(name = "domicilio_direccion", columnDefinition = "nvarchar(max)")
    private String domicilioDireccion; // nvarchar(max)

    @Column(name = "domicilio_barrio", columnDefinition = "nvarchar(max)")
    private String domicilioBarrio; // nvarchar(max)

    @Column(name = "domicilio_ubicacion", columnDefinition = "nvarchar(max)")
    private String domicilioUbicacion; // nvarchar(max)

    @Column(name = "domicilio_localidad_id")
    private long domicilioLocalidadId; // bigint

    @Column(name = "domicilio_estado_id")
    private long domicilioEstadoId; // bigint

    @Column(name = "domicilio_fecha_alta", columnDefinition = "datetimeoffset(7)")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime domicilioFechaAlta; // datetimeoffset(7)

    @Column(name = "domicilio_fecha_modificacion", columnDefinition = "datetimeoffset(7)")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime domicilioFechaModificacion; // datetimeoffset(7)

    @Column(name = "domicilio_fecha_baja", columnDefinition = "datetimeoffset(7)")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime domicilioFechaBaja; // datetimeoffset(7)

    @Column(name = "domicilio_usuario_alta", columnDefinition = "nvarchar(max)")
    private String domicilioUsuarioAlta; // nvarchar(max)

    @Column(name = "domicilio_usuario_modificacion", columnDefinition = "nvarchar(max)")
    private String domicilioUsuarioModificacion; // nvarchar(max)

    @Column(name = "domicilio_usuario_baja", columnDefinition = "nvarchar(max)")
    private String domicilioUsuarioBaja; // nvarchar(max)

    @Column(name = "domicilio_observaciones", columnDefinition = "nvarchar(max)")
    private String domicilioObservaciones; // nvarchar(max)

    @Column(name = "domicilio_codigo_postal", columnDefinition = "nvarchar(50)")
    private String domicilioCodigoPostal; // nvarchar(50)

    @Column(name = "domicilio_es_principal", columnDefinition = "nchar(1)")
    private char domicilioEsPrincipal; // nchar(1)

//    public Cliente getCliente() {
//        return cliente;
//    }
//
//    public void setCliente(Cliente cliente) {
//        this.cliente = cliente;
//    }

    public long getDomicilio_id() {
        return domicilio_id;
    }

    public void setDomicilio_id(long domicilio_id) {
        this.domicilio_id = domicilio_id;
    }

    public long getDomicilioTipoDomicilioId() {
        return domicilioTipoDomicilioId;
    }

    public void setDomicilioTipoDomicilioId(long domicilioTipoDomicilioId) {
        this.domicilioTipoDomicilioId = domicilioTipoDomicilioId;
    }

    public String getDomicilioDireccion() {
        return domicilioDireccion;
    }

    public void setDomicilioDireccion(String domicilioDireccion) {
        this.domicilioDireccion = domicilioDireccion;
    }

    public String getDomicilioBarrio() {
        return domicilioBarrio;
    }

    public void setDomicilioBarrio(String domicilioBarrio) {
        this.domicilioBarrio = domicilioBarrio;
    }

    public String getDomicilioUbicacion() {
        return domicilioUbicacion;
    }

    public void setDomicilioUbicacion(String domicilioUbicacion) {
        this.domicilioUbicacion = domicilioUbicacion;
    }

    public long getDomicilioLocalidadId() {
        return domicilioLocalidadId;
    }

    public void setDomicilioLocalidadId(long domicilioLocalidadId) {
        this.domicilioLocalidadId = domicilioLocalidadId;
    }

    public long getDomicilioEstadoId() {
        return domicilioEstadoId;
    }

    public void setDomicilioEstadoId(long domicilioEstadoId) {
        this.domicilioEstadoId = domicilioEstadoId;
    }

    public LocalDateTime getDomicilioFechaAlta() {
        return domicilioFechaAlta;
    }

    public void setDomicilioFechaAlta(LocalDateTime domicilioFechaAlta) {
        this.domicilioFechaAlta = domicilioFechaAlta;
    }

    public LocalDateTime getDomicilioFechaModificacion() {
        return domicilioFechaModificacion;
    }

    public void setDomicilioFechaModificacion(LocalDateTime domicilioFechaModificacion) {
        this.domicilioFechaModificacion = domicilioFechaModificacion;
    }

    public LocalDateTime getDomicilioFechaBaja() {
        return domicilioFechaBaja;
    }

    public void setDomicilioFechaBaja(LocalDateTime domicilioFechaBaja) {
        this.domicilioFechaBaja = domicilioFechaBaja;
    }

    public String getDomicilioUsuarioAlta() {
        return domicilioUsuarioAlta;
    }

    public void setDomicilioUsuarioAlta(String domicilioUsuarioAlta) {
        this.domicilioUsuarioAlta = domicilioUsuarioAlta;
    }

    public String getDomicilioUsuarioModificacion() {
        return domicilioUsuarioModificacion;
    }

    public void setDomicilioUsuarioModificacion(String domicilioUsuarioModificacion) {
        this.domicilioUsuarioModificacion = domicilioUsuarioModificacion;
    }

    public String getDomicilioUsuarioBaja() {
        return domicilioUsuarioBaja;
    }

    public void setDomicilioUsuarioBaja(String domicilioUsuarioBaja) {
        this.domicilioUsuarioBaja = domicilioUsuarioBaja;
    }

    public String getDomicilioObservaciones() {
        return domicilioObservaciones;
    }

    public void setDomicilioObservaciones(String domicilioObservaciones) {
        this.domicilioObservaciones = domicilioObservaciones;
    }

    public String getDomicilioCodigoPostal() {
        return domicilioCodigoPostal;
    }

    public void setDomicilioCodigoPostal(String domicilioCodigoPostal) {
        this.domicilioCodigoPostal = domicilioCodigoPostal;
    }

    public char getDomicilioEsPrincipal() {
        return domicilioEsPrincipal;
    }

    public void setDomicilioEsPrincipal(char domicilioEsPrincipal) {
        this.domicilioEsPrincipal = domicilioEsPrincipal;
    }
}
