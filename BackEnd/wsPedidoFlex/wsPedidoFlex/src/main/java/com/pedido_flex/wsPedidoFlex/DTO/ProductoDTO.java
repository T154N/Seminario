package com.pedido_flex.wsPedidoFlex.DTO;

import lombok.Data;

@Data
public class ProductoDTO {
    private Long producto_id;
    private String producto_nombre;
    private String producto_descripcion;
    private Double producto_precio;
    private String producto_observaciones;
    private Long categoriaId;
    private String producto_urlImagen;

    public ProductoDTO(String descripcion, Long id, String nombre, String observaciones, Double precio, Long categoriaId, String urlImagen) {
        this.producto_descripcion = descripcion;
        this.producto_id = id;
        this.producto_nombre = nombre;
        this.producto_observaciones = observaciones;
        this.producto_precio = precio;
        this.categoriaId = categoriaId;
        this.producto_urlImagen = urlImagen;
    }

    public ProductoDTO() {
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }

    public String getProducto_descripcion() {
        return producto_descripcion;
    }

    public void setProducto_descripcion(String producto_descripcion) {
        this.producto_descripcion = producto_descripcion;
    }

    public Long getProducto_id() {
        return producto_id;
    }

    public void setProducto_id(Long producto_id) {
        this.producto_id = producto_id;
    }

    public String getProducto_nombre() {
        return producto_nombre;
    }

    public void setProducto_nombre(String producto_nombre) {
        this.producto_nombre = producto_nombre;
    }

    public String getProducto_observaciones() {
        return producto_observaciones;
    }

    public void setProducto_observaciones(String producto_observaciones) {
        this.producto_observaciones = producto_observaciones;
    }

    public Double getProducto_precio() {
        return producto_precio;
    }

    public void setProducto_precio(Double producto_precio) {
        this.producto_precio = producto_precio;
    }

    public String getProducto_urlImagen() {
        return producto_urlImagen;
    }

    public void setProducto_urlImagen(String producto_urlImagen) {
        this.producto_urlImagen = producto_urlImagen;
    }
}


