package com.PedidoFlex.wsPedidoFlex.DTO;
import java.time.LocalDateTime;
public class PedidosClientesDTO {

    private Long pedidoId;
    private String pedidoNumeroPedido;
    private Long pedidoClienteId;
    private Long pedidoCarritoId;
    private String pedidoCreateAdmin;
    private LocalDateTime pedidoFechaEntrega;
    private LocalDateTime pedidoFechaEstimadaEntrega;
    private Long estadoPagoId;
    private Long pedidoEstadoId;
    private Long estadoRegistroId;
    private String pedidoObservaciones;
    private LocalDateTime pedidoFechaAlta;
    private String pedidoUsuarioAlta;
    private Double pedidoTotalDinero;
    private String pedidoDireccionEntrega;

    public PedidosClientesDTO(Long pedidoId, String pedidoNumeroPedido, Long pedidoClienteId, Long pedidoCarritoId, String pedidoCreateAdmin, LocalDateTime pedidoFechaEntrega, LocalDateTime pedidoFechaEstimadaEntrega, Long estadoPagoId, Long pedidoEstadoId, Long estadoRegistroId, String pedidoObservaciones, LocalDateTime pedidoFechaAlta, String pedidoUsuarioAlta, Double pedidoTotalDinero, String pedidoDireccionEntrega) {
        this.pedidoId = pedidoId;
        this.pedidoNumeroPedido = pedidoNumeroPedido;
        this.pedidoClienteId = pedidoClienteId;
        this.pedidoCarritoId = pedidoCarritoId;
        this.pedidoCreateAdmin = pedidoCreateAdmin;
        this.pedidoFechaEntrega = pedidoFechaEntrega;
        this.pedidoFechaEstimadaEntrega = pedidoFechaEstimadaEntrega;
        this.estadoPagoId = estadoPagoId;
        this.pedidoEstadoId = pedidoEstadoId;
        this.estadoRegistroId = estadoRegistroId;
        this.pedidoObservaciones = pedidoObservaciones;
        this.pedidoFechaAlta = pedidoFechaAlta;
        this.pedidoUsuarioAlta = pedidoUsuarioAlta;
        this.pedidoTotalDinero = pedidoTotalDinero;
        this.pedidoDireccionEntrega = pedidoDireccionEntrega;
    }
// Getters y Setters

    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    public String getPedidoNumeroPedido() {
        return pedidoNumeroPedido;
    }

    public void setPedidoNumeroPedido(String pedidoNumeroPedido) {
        this.pedidoNumeroPedido = pedidoNumeroPedido;
    }

    public Long getPedidoClienteId() {
        return pedidoClienteId;
    }

    public void setPedidoClienteId(Long pedidoClienteId) {
        this.pedidoClienteId = pedidoClienteId;
    }

    public Long getPedidoCarritoId() {
        return pedidoCarritoId;
    }

    public void setPedidoCarritoId(Long pedidoCarritoId) {
        this.pedidoCarritoId = pedidoCarritoId;
    }

    public String getPedidoCreateAdmin() {
        return pedidoCreateAdmin;
    }

    public void setPedidoCreateAdmin(String pedidoCreateAdmin) {
        this.pedidoCreateAdmin = pedidoCreateAdmin;
    }

    public LocalDateTime getPedidoFechaEntrega() {
        return pedidoFechaEntrega;
    }

    public void setPedidoFechaEntrega(LocalDateTime pedidoFechaEntrega) {
        this.pedidoFechaEntrega = pedidoFechaEntrega;
    }

    public LocalDateTime getPedidoFechaEstimadaEntrega() {
        return pedidoFechaEstimadaEntrega;
    }

    public void setPedidoFechaEstimadaEntrega(LocalDateTime pedidoFechaEstimadaEntrega) {
        this.pedidoFechaEstimadaEntrega = pedidoFechaEstimadaEntrega;
    }

    public Long getEstadoPagoId() {
        return estadoPagoId;
    }

    public void setEstadoPagoId(Long estadoPagoId) {
        this.estadoPagoId = estadoPagoId;
    }

    public Long getPedidoEstadoId() {
        return pedidoEstadoId;
    }

    public void setPedidoEstadoId(Long pedidoEstadoId) {
        this.pedidoEstadoId = pedidoEstadoId;
    }

    public Long getEstadoRegistroId() {
        return estadoRegistroId;
    }

    public void setEstadoRegistroId(Long estadoRegistroId) {
        this.estadoRegistroId = estadoRegistroId;
    }

    public String getPedidoObservaciones() {
        return pedidoObservaciones;
    }

    public void setPedidoObservaciones(String pedidoObservaciones) {
        this.pedidoObservaciones = pedidoObservaciones;
    }

    public LocalDateTime getPedidoFechaAlta() {
        return pedidoFechaAlta;
    }

    public void setPedidoFechaAlta(LocalDateTime pedidoFechaAlta) {
        this.pedidoFechaAlta = pedidoFechaAlta;
    }

    public String getPedidoUsuarioAlta() {
        return pedidoUsuarioAlta;
    }

    public void setPedidoUsuarioAlta(String pedidoUsuarioAlta) {
        this.pedidoUsuarioAlta = pedidoUsuarioAlta;
    }

    public Double getPedidoTotalDinero() {
        return pedidoTotalDinero;
    }

    public void setPedidoTotalDinero(Double pedidoTotalDinero) {
        this.pedidoTotalDinero = pedidoTotalDinero;
    }

    public String getPedidoDireccionEntrega() {
        return pedidoDireccionEntrega;
    }

    public void setPedidoDireccionEntrega(String pedidoDireccionEntrega) {
        this.pedidoDireccionEntrega = pedidoDireccionEntrega;
    }

    // Método toString para visualización
    @Override
    public String toString() {
        return "PedidosClientesDTO{" +
                "pedidoId=" + pedidoId +
                ", pedidoNumeroPedido='" + pedidoNumeroPedido + '\'' +
                ", pedidoClienteId=" + pedidoClienteId +
                ", pedidoCarritoId=" + pedidoCarritoId +
                ", pedidoCreateAdmin='" + pedidoCreateAdmin + '\'' +
                ", pedidoFechaEntrega=" + pedidoFechaEntrega +
                ", pedidoFechaEstimadaEntrega=" + pedidoFechaEstimadaEntrega +
                ", estadoPagoId=" + estadoPagoId +
                ", pedidoEstadoId=" + pedidoEstadoId +
                ", estadoRegistroId=" + estadoRegistroId +
                ", pedidoObservaciones='" + pedidoObservaciones + '\'' +
                ", pedidoFechaAlta=" + pedidoFechaAlta +
                ", pedidoUsuarioAlta='" + pedidoUsuarioAlta + '\'' +
                ", pedidoTotalDinero=" + pedidoTotalDinero +
                ", pedidoDireccionEntrega='" + pedidoDireccionEntrega + '\'' +
                '}';
    }
}
