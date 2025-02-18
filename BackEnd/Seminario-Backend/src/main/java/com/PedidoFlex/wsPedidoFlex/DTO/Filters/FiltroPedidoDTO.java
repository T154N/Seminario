package com.PedidoFlex.wsPedidoFlex.DTO.Filters;

import java.time.LocalDateTime;

public class FiltroPedidoDTO {
    private Long id;
    private String direccionEntrega;
    private Integer totalProductos;
    private Double totalDinero;
    private Long estadoId;
    private LocalDateTime fechaAltaDesde;
    private LocalDateTime fechaAltaHasta;
    private LocalDateTime fechaEntregaDesde;
    private LocalDateTime fechaEntregaHasta;
    private Long numeroPedido;

    public FiltroPedidoDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDireccionEntrega() {
        return direccionEntrega;
    }

    public void setDireccionEntrega(String direccionEntrega) {
        this.direccionEntrega = direccionEntrega;
    }

    public Integer getTotalProductos() {
        return totalProductos;
    }

    public void setTotalProductos(Integer totalProductos) {
        this.totalProductos = totalProductos;
    }

    public Double getTotalDinero() {
        return totalDinero;
    }

    public void setTotalDinero(Double totalDinero) {
        this.totalDinero = totalDinero;
    }

    public Long getEstadoId() {
        return estadoId;
    }

    public void setEstadoId(Long estadoId) {
        this.estadoId = estadoId;
    }

    public LocalDateTime getFechaAltaDesde() {
        return fechaAltaDesde;
    }

    public void setFechaAltaDesde(LocalDateTime fechaAltaDesde) {
        this.fechaAltaDesde = fechaAltaDesde;
    }

    public LocalDateTime getFechaAltaHasta() {
        return fechaAltaHasta;
    }

    public void setFechaAltaHasta(LocalDateTime fechaAltaHasta) {
        this.fechaAltaHasta = fechaAltaHasta;
    }

    public LocalDateTime getFechaEntregaDesde() {
        return fechaEntregaDesde;
    }

    public void setFechaEntregaDesde(LocalDateTime fechaEntregaDesde) {
        this.fechaEntregaDesde = fechaEntregaDesde;
    }

    public LocalDateTime getFechaEntregaHasta() {
        return fechaEntregaHasta;
    }

    public void setFechaEntregaHasta(LocalDateTime fechaEntregaHasta) {
        this.fechaEntregaHasta = fechaEntregaHasta;
    }

    public Long getNumeroPedido() {
        return numeroPedido;
    }

    public void setNumeroPedido(Long numeroPedido) {
        this.numeroPedido = numeroPedido;
    }
}
