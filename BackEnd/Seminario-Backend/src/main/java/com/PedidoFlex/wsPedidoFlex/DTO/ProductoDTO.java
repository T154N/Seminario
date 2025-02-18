package com.PedidoFlex.wsPedidoFlex.DTO;

public class ProductoDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private Double precio;
    private String observaciones;
    private String categoriaNombre;
    private Long categoriaId;
    private String urlImagen;
    private Integer productoEstado;


    public ProductoDTO(String descripcion, Long id, String nombre, String observaciones,Double precio, String categoriaNombre, String urlImagen, Integer productoEstado,Long categoriaId) {
        this.descripcion = descripcion;
        this.id = id;
        this.nombre = nombre;
        this.observaciones = observaciones;
        this.precio = precio;
        this.categoriaNombre = categoriaNombre;
        this.urlImagen = urlImagen;
        this.productoEstado = productoEstado;
        this.categoriaId= categoriaId;
    }

    public ProductoDTO() {
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }

    public Integer getProductoEstado() {
        return productoEstado;
    }

    public void setProductoEstado(Integer productoEstado) {
        this.productoEstado = productoEstado;
    }

    public String getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }

    public String getCategoriaNombre() {
        return categoriaNombre;
    }

    public void setCategoriaNombre(String categoriaNombre) {
        this.categoriaNombre = categoriaNombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}


