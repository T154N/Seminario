package com.PedidoFlex.wsPedidoFlex.Models;


import com.PedidoFlex.wsPedidoFlex.Models.Carrito.Carrito;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cliente_id")
    private long cliente_id;

    @Column(name = "cliente_documento",nullable = false)
    private String cliente_documento;

    @Column(name = "cliente_tipo_documento")
    private String cliente_tipo_documento;

    @Column(name = "cliente_cuit")
    private String cliente_cuit;

    @Column(name = "cliente_apellido")
    private String cliente_apellido;

    @Column(name = "cliente_nombre")
    private String cliente_nombre;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cliente_usuario_id")
    @JsonBackReference
    private Usuario cliente_Usuario;

    @Column(name = "cliente_email", nullable = false, unique = true)
    private String cliente_email;

    @Column (name = "cliente_telefono")
    private String cliente_telefono;

    @Column (name = "cliente_estado_id")
    private Integer cliente_estado_id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "cliente_fecha_alta", insertable = false, updatable = false)
    private LocalDateTime cliente_fecha_alta;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "cliente_fecha_modificacion")
    private LocalDateTime cliente_fecha_modificacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "cliente_fecha_baja")
    private LocalDateTime cliente_fecha_baja;

    @Column(name = "cliente_usuario_alta")
    private String cliente_usuario_alta;

    @Column(name = "cliente_usuario_modificacion")
    private String cliente_usuario_modificacion;

    @Column(name = "cliente_usuario_baja")
    private String cliente_usuario_baja;

    @Column(name = "cliente_observaciones")
    private String cliente_observaciones;

    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @JoinColumn(name = "domicilio_cliente_id")
    @OneToMany( cascade = { CascadeType.PERSIST, CascadeType.MERGE},fetch = FetchType.LAZY,orphanRemoval = true)
    @JsonManagedReference
    private List<Domicilio> domicilios = new ArrayList<>();


    @OneToMany(mappedBy = "cliente", cascade = { CascadeType.PERSIST, CascadeType.MERGE},fetch = FetchType.LAZY,orphanRemoval = true)
    @JsonManagedReference
    private Set<Pedido> pedidos;

    @JsonManagedReference
    @OneToMany(mappedBy = "cliente")
    private Set<Carrito> carritos;

    //@Column(name = "cliente_razon_social", nullable = false)
    //private String cliente_razon_social;

    @Override
    public String toString() {
        return "Cliente{" +
                "cliente_id=" + cliente_id +
                ", cliente_documento='" + cliente_documento + '\'' +
                ", cliente_tipo_documento='" + cliente_tipo_documento + '\'' +
                ", cliente_apellido='" + cliente_apellido + '\'' +
                ", cliente_nombre='" + cliente_nombre + '\'' +
                ", cliente_email='" + cliente_email + '\'' +
                ", cliente_telefono='" + cliente_telefono + '\'' +
                ", cliente_estado_id=" + cliente_estado_id +
                '}';
    }

}
