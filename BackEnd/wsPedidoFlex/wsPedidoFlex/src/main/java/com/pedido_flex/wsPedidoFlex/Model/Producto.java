package com.pedido_flex.wsPedidoFlex.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String producto_fecha_alta;

    @Column(name = "producto_fecha_modificacion")
    private String producto_fecha_modificacion;

    @Column(name = "producto_fecha_baja")
    private String producto_fecha_baja;

    @Column(name = "producto_usuario_alta")
    private String producto_usuario_alta;

    @Column(name = "producto_usuario_modificacion")
    private String producto_usuario_modificacion;

    @Column(name = "producto_usuario_baja")
    private String producto_usuario_baja;

    @Column(name = "producto_observaciones")
    private String producto_observaciones;


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
        return producto;
    }
}
