package com.pedido_flex.wsPedidoFlex.DTO.Filters;

import java.time.LocalDateTime;

public class DomicilioFiltersDTO {
    private long domicilio_id;
    private String domicilioTipoDomicilioId;
    private String domicilioDireccion; // nvarchar(max)
    private String domicilioBarrio; // nvarchar(max)
    private String domicilioUbicacion; // nvarchar(max)
    private String domicilioLocalidad; // bigint
    private String domicilioEstado; // bigint
    private LocalDateTime domicilioFechaAlta; // datetimeoffset(7)
    private LocalDateTime domicilioFechaModificacion; // datetimeoffset(7)
    private LocalDateTime domicilioFechaBaja; // datetimeoffset(7)
    private String domicilioUsuarioAlta; // nvarchar(max)
    private String domicilioUsuarioModificacion; // nvarchar(max)
    private String domicilioUsuarioBaja; // nvarchar(max)
    private String domicilioObservaciones; // nvarchar(max)
    private String domicilioCodigoPostal; // nvarchar(50)
    private char domicilioEsPrincipal;

    public long getDomicilio_id() {
        return domicilio_id;
    }

    public void setDomicilio_id(long domicilio_id) {
        this.domicilio_id = domicilio_id;
    }

    public String getDomicilioTipoDomicilioId() {
        return domicilioTipoDomicilioId;
    }

    public void setDomicilioTipoDomicilioId(String domicilioTipoDomicilioId) {
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

    public String getDomicilioLocalidad() {
        return domicilioLocalidad;
    }

    public void setDomicilioLocalidad(String domicilioLocalidad) {
        this.domicilioLocalidad = domicilioLocalidad;
    }

    public String getDomicilioEstado() {
        return domicilioEstado;
    }

    public void setDomicilioEstado(String domicilioEstado) {
        this.domicilioEstado = domicilioEstado;
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
