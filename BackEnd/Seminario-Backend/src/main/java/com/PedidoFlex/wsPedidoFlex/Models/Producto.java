package com.PedidoFlex.wsPedidoFlex.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name ="producto_fecha_alta",insertable = false, updatable = false)
    private LocalDateTime producto_fecha_alta;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "producto_fecha_modificacion")
    private LocalDateTime producto_fecha_modificacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
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

    @Column(name="producto_url_imagen")
    private String producto_url_imagen;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumn(name = "producto_categoria_id", referencedColumnName = "categoria_id", nullable = false)
    private Categoria categoria;



}
