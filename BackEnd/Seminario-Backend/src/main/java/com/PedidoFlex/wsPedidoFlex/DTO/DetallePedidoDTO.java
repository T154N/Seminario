package com.PedidoFlex.wsPedidoFlex.DTO;

public class DetallePedidoDTO {
    private Long pedidoID;
    private Long detalleID;
    private Integer cantidad;
    private Double precioIndividual;
    private Double subtotal;
    private Long productoID;
    private String productoName;
    private Long medioPagoID;
    private String medioPagoName;

    // Getters y setters
    public Long getPedidoID() { return pedidoID; }
    public void setPedidoID(Long pedidoID) { this.pedidoID = pedidoID; }

    public Long getDetalleID() { return detalleID; }
    public void setDetalleID(Long detalleID) { this.detalleID = detalleID; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Double getPrecioIndividual() { return precioIndividual; }
    public void setPrecioIndividual(Double precioIndividual) { this.precioIndividual = precioIndividual; }

    public Double getSubtotal() { return subtotal; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }

    public Long getProductoID() { return productoID; }
    public void setProductoID(Long productoID) { this.productoID = productoID; }

    public String getProductoName() { return productoName; }
    public void setProductoName(String productoName) { this.productoName = productoName; }

    public Long getMedioPagoID() { return medioPagoID; }
    public void setMedioPagoID(Long medioPagoID) { this.medioPagoID = medioPagoID; }

    public String getMedioPagoName() { return medioPagoName; }
    public void setMedioPagoName(String medioPagoName) { this.medioPagoName = medioPagoName; }
}
