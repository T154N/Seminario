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
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "producto_id")
    private long producto_id;

    @Column(name = "producto_nombre")
    private String producto_nombre;

    @Column(name = "producto_descripcion")
    private String producto_descripcion;

    @Column(name = "producto_estado_id")
    private Integer producto_estado_id;

    @Column(name = "producto_precio")
    private Double producto_precio;

    @Column(name = "producto_fecha_alta")
    private LocalDateTime producto_fecha_alta;

    @Column(name = "producto_fecha_modificacion")
    private LocalDateTime producto_fecha_modificacion;

    @Column(name = "producto_fecha_baja")
    private LocalDateTime producto_fecha_baja;

    @Column(name = "producto_usuario_alta")
    private String producto_usuario_alta;

    @Column(name = "producto_usuario_modificacion")
    private String producto_usuario_modificacion;

    @Column(name = "producto_usuario_baja")
    private String producto_usuario_baja;

    @Column(name = "producto_observaciones")
    private String producto_observaciones;


    @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumn(name = "producto_categoria_id", referencedColumnName = "categoria_id", nullable = false)
    private Categoria categoria;


    public Producto get() {
        Producto producto = new Producto();
        producto.setProducto_id(this.producto_id);
        producto.setProducto_nombre(this.producto_nombre);
        producto.setProducto_descripcion(this.producto_descripcion);
        producto.setProducto_estado_id(this.producto_estado_id);
        producto.setProducto_precio(this.producto_precio);
        producto.setProducto_fecha_alta(this.producto_fecha_alta);
        producto.setProducto_fecha_modificacion(this.producto_fecha_modificacion);
        producto.setProducto_fecha_baja(this.producto_fecha_baja);
        producto.setProducto_usuario_alta(this.producto_usuario_alta);
        producto.setProducto_usuario_modificacion(this.producto_usuario_modificacion);
        producto.setProducto_usuario_baja(this.producto_usuario_baja);
        producto.setProducto_observaciones(this.producto_observaciones);
        producto.setCategoria(this.categoria);
        return producto;

    }


    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getProducto_descripcion() {
        return producto_descripcion;
    }

    public void setProducto_descripcion(String producto_descripcion) {
        this.producto_descripcion = producto_descripcion;
    }

    public Integer getProducto_estado_id() {
        return producto_estado_id;
    }

    public void setProducto_estado_id(Integer producto_estado_id) {
        this.producto_estado_id = producto_estado_id;
    }

    public LocalDateTime getProducto_fecha_alta() {
        return producto_fecha_alta;
    }

    public void setProducto_fecha_alta(LocalDateTime producto_fecha_alta) {
        this.producto_fecha_alta = producto_fecha_alta;
    }

    public LocalDateTime getProducto_fecha_baja() {
        return producto_fecha_baja;
    }

    public void setProducto_fecha_baja(LocalDateTime producto_fecha_baja) {
        this.producto_fecha_baja = producto_fecha_baja;
    }

    public LocalDateTime getProducto_fecha_modificacion() {
        return producto_fecha_modificacion;
    }

    public void setProducto_fecha_modificacion(LocalDateTime producto_fecha_modificacion) {
        this.producto_fecha_modificacion = producto_fecha_modificacion;
    }

    public long getProducto_id() {
        return producto_id;
    }

    public void setProducto_id(long producto_id) {
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

    public String getProducto_usuario_alta() {
        return producto_usuario_alta;
    }

    public void setProducto_usuario_alta(String producto_usuario_alta) {
        this.producto_usuario_alta = producto_usuario_alta;
    }

    public String getProducto_usuario_baja() {
        return producto_usuario_baja;
    }

    public void setProducto_usuario_baja(String producto_usuario_baja) {
        this.producto_usuario_baja = producto_usuario_baja;
    }

    public String getProducto_usuario_modificacion() {
        return producto_usuario_modificacion;
    }

    public void setProducto_usuario_modificacion(String producto_usuario_modificacion) {
        this.producto_usuario_modificacion = producto_usuario_modificacion;
    }



}
