package com.PedidoFlex.wsPedidoFlex.DTO;

public class CarritoDetalleDTO {
    private Long carrito_detalle_id;
    private Long carritoID;
    private Long productoID;
    private String productoName;
    private Integer cantidad;
    private Double precio_individual; // Precio al momento de añadir al carrito
    private Double subtotal; // Cálculo: cantidad * precio_individual
    private Long estadoId;
    private String urlImage;
    private String productoObservaciones;
    private Long categoriaId;
    private String categoriaNombre;

    public CarritoDetalleDTO(){}
    public CarritoDetalleDTO(Long carrito_detalle_id, Long carritoID, Long productoID, String productoName, Integer cantidad, Double precio_individual, Double subtotal, Long estadoId,
                             String urlImage,
    String productoObservaciones,
     Long categoriaId,
     String categoriaNombre) {
        this.carrito_detalle_id = carrito_detalle_id;
        this.carritoID = carritoID;
        this.productoID = productoID;
        this.productoName = productoName;
        this.cantidad = cantidad;
        this.precio_individual = precio_individual;
        this.subtotal = subtotal;
        this.estadoId = estadoId;
        this.urlImage = urlImage;
        this.productoObservaciones = productoObservaciones;
        this.categoriaId = categoriaId;
        this.categoriaNombre = categoriaNombre;
    }

    public Long getCarrito_detalle_id() {
        return carrito_detalle_id;
    }

    public void setCarrito_detalle_id(Long carrito_detalle_id) {
        this.carrito_detalle_id = carrito_detalle_id;
    }

    public Long getCarritoID() {
        return carritoID;
    }

    public void setCarritoID(Long carritoID) {
        this.carritoID = carritoID;
    }

    public Long getProductoID() {
        return productoID;
    }

    public void setProductoID(Long productoID) {
        this.productoID = productoID;
    }

    public String getProductoName() {
        return productoName;
    }

    public void setProductoName(String productoName) {
        this.productoName = productoName;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getPrecio_individual() {
        return precio_individual;
    }

    public void setPrecio_individual(Double precio_individual) {
        this.precio_individual = precio_individual;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Long getEstadoId() {
        return estadoId;
    }

    public void setEstadoId(Long estadoId) {
        this.estadoId = estadoId;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public String getProductoObservaciones() {
        return productoObservaciones;
    }

    public void setProductoObservaciones(String productoObservaciones) {
        this.productoObservaciones = productoObservaciones;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }

    public String getCategoriaNombre() {
        return categoriaNombre;
    }

    public void setCategoriaNombre(String categoriaNombre) {
        this.categoriaNombre = categoriaNombre;
    }
}
